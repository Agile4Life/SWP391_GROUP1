package com.swp391.scms.health;

import com.swp391.scms.common.exception.BadRequestException;
import com.swp391.scms.common.exception.ForbiddenException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.health.dto.HealthMetricDto;
import com.swp391.scms.health.entity.MemberProgressLog;
import com.swp391.scms.users.MemberRepository;
import com.swp391.scms.users.UserRepository;
import com.swp391.scms.users.entity.Member;
import com.swp391.scms.users.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class HealthMetricService {

    private static final Set<String> ALLOWED_METRICS = Set.of("weight", "height", "bmi", "body_fat", "muscle_mass");
    private final MemberProgressLogRepository progressLogRepository;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;

    public HealthMetricService(MemberProgressLogRepository progressLogRepository,
                               MemberRepository memberRepository,
                               UserRepository userRepository) {
        this.progressLogRepository = progressLogRepository;
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<HealthMetricDto> getMetrics(Long memberId, Long currentUserId, String currentUserRole) {
        if (!memberId.equals(currentUserId) && !isManager(currentUserRole) && !isCoach(currentUserRole)) {
            throw new ForbiddenException("Bạn không có quyền truy cập dữ liệu sức khỏe của người này");
        }
        if (!memberRepository.existsById(memberId)) {
            throw new ResourceNotFoundException("hội viên", memberId);
        }
        return progressLogRepository.findByMemberUserIdOrderByRecordedAtDesc(memberId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public HealthMetricDto addMetric(Long memberId, HealthMetricDto request, Long currentUserId, String currentUserRole) {
        if (!memberId.equals(currentUserId) && !isCoach(currentUserRole)) {
            throw new ForbiddenException("Bạn không có quyền cập nhật dữ liệu sức khỏe của người này");
        }
        String metricName = request.metricName().toLowerCase(Locale.ROOT);
        if (!ALLOWED_METRICS.contains(metricName)) {
            throw new BadRequestException("INVALID_METRIC", "Tên chỉ số không hợp lệ. Chỉ chấp nhận: weight, height, bmi, body_fat, muscle_mass");
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("hội viên", memberId));
        User recordedBy = userRepository.findByIdAndDeletedAtIsNull(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("người ghi nhận", currentUserId));

        MemberProgressLog log = new MemberProgressLog();
        log.setMember(member);
        log.setMetricName(metricName);
        log.setMetricValue(request.metricValue());
        log.setUnit(request.unit());
        log.setRecordedBy(recordedBy);
        return toDto(progressLogRepository.save(log));
    }

    private HealthMetricDto toDto(MemberProgressLog log) {
        return new HealthMetricDto(log.getId(), log.getMetricName(), log.getMetricValue(), log.getUnit(),
                log.getRecordedBy().getId(), log.getRecordedAt());
    }

    private boolean isManager(String role) {
        return "CENTER_MANAGER".equalsIgnoreCase(role) || "Manager".equalsIgnoreCase(role);
    }

    private boolean isCoach(String role) {
        return "COACH".equalsIgnoreCase(role) || "Coach".equalsIgnoreCase(role);
    }
}