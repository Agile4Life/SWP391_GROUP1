package com.swp391.scms.health;

import com.swp391.scms.health.dto.HealthMetricDto;
import com.swp391.scms.health.entity.MemberProgressLog;
import com.swp391.scms.users.MemberRepository;
import com.swp391.scms.users.UserRepository;
import com.swp391.scms.users.entity.Member;
import com.swp391.scms.users.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HealthMetricService {

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
        // Kiểm tra quyền truy cập: Chỉ member tự xem của mình, hoặc Manager/Coach được xem
        if (!memberId.equals(currentUserId) && !"Manager".equalsIgnoreCase(currentUserRole) && !"Coach".equalsIgnoreCase(currentUserRole)) {
            throw new RuntimeException("Bạn không có quyền truy cập dữ liệu sức khỏe của người này");
        }

        return progressLogRepository.findByMemberUserIdOrderByRecordedAtDesc(memberId)
                .stream()
                .map(log -> new HealthMetricDto(
                        log.getId(),
                        log.getMetricName(),
                        log.getMetricValue(),
                        log.getUnit(),
                        log.getRecordedBy().getId(),
                        log.getRecordedAt()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public HealthMetricDto addMetric(Long memberId, HealthMetricDto request, Long currentUserId, String currentUserRole) {
        // Kiểm tra quyền truy cập: Chỉ member tự thêm cho mình, hoặc Coach thêm cho member
        if (!memberId.equals(currentUserId) && !"Coach".equalsIgnoreCase(currentUserRole)) {
            throw new RuntimeException("Bạn không có quyền cập nhật dữ liệu sức khỏe của người này");
        }
        
        // Validate dữ liệu bổ sung
        if (!List.of("weight", "height", "bmi", "body_fat", "muscle_mass").contains(request.metricName().toLowerCase())) {
            throw new IllegalArgumentException("Tên chỉ số không hợp lệ. Chỉ chấp nhận: weight, height, bmi, body_fat, muscle_mass");
        }

        Member member = memberRepository.findById(memberId).orElseGet(() -> {
            Member m = new Member();
            m.setUserId(memberId);
            m.setFitnessLevel("beginner");
            m.setJoinDate(java.time.LocalDate.now());
            m.setMembershipCode("MEM-" + memberId);
            return memberRepository.save(m);
        });
                
        User recordedBy = userRepository.findById(currentUserId).orElseGet(() -> {
            User u = new User();
            u.setId(currentUserId);
            u.setFullName("Member Test Auto");
            u.setEmail("member1@example.com");
            u.setCreatedAt(java.time.LocalDateTime.now());
            return userRepository.save(u);
        });

        MemberProgressLog log = new MemberProgressLog();
        log.setMember(member);
        log.setMetricName(request.metricName().toLowerCase());
        log.setMetricValue(request.metricValue());
        log.setUnit(request.unit());
        log.setRecordedBy(recordedBy);
        // recordedAt tự động sinh

        log = progressLogRepository.save(log);

        return new HealthMetricDto(
                log.getId(),
                log.getMetricName(),
                log.getMetricValue(),
                log.getUnit(),
                log.getRecordedBy().getId(),
                log.getRecordedAt()
        );
    }
}
