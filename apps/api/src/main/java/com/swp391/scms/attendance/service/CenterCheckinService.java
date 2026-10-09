package com.swp391.scms.attendance.service;

import com.swp391.scms.attendance.dto.CheckinRequests;
import com.swp391.scms.attendance.dto.CheckinResponses.CheckinDto;
import com.swp391.scms.attendance.entity.CenterCheckin;
import com.swp391.scms.attendance.repository.CenterCheckinRepository;
import com.swp391.scms.common.exception.BadRequestException;
import com.swp391.scms.common.exception.ForbiddenException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.membership.entity.MembershipSubscription;
import com.swp391.scms.membership.repository.MembershipSubscriptionRepository;
import com.swp391.scms.security.AuthenticatedPrincipal;
import com.swp391.scms.users.UserRepository;
import com.swp391.scms.users.entity.Member;
import com.swp391.scms.users.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CenterCheckinService {
    private final CenterCheckinRepository checkins;
    private final MembershipSubscriptionRepository subscriptions;
    private final UserRepository users;
    private final Clock clock;
    public CenterCheckinService(CenterCheckinRepository checkins, MembershipSubscriptionRepository subscriptions, UserRepository users, Clock clock) {
        this.checkins = checkins; this.subscriptions = subscriptions; this.users = users; this.clock = clock;
    }

    @Transactional
    public CheckinDto scan(AuthenticatedPrincipal principal, CheckinRequests.Scan request) {
        ensureStaff(principal);
        MembershipSubscription sub = subscriptions.findByQrCode(request.qrCode().trim()).orElseThrow(() ->
                new ForbiddenException("CHECKIN_DENIED", "error.attendance.checkin_denied", null, "QR code is invalid"));
        LocalDate today = LocalDate.now(clock);
        if (!"active".equalsIgnoreCase(sub.getStatus()) || sub.getStartDate().isAfter(today) || sub.getEndDate().isBefore(today)) {
            throw new ForbiddenException("CHECKIN_DENIED", "error.attendance.checkin_denied", null, "Membership is inactive or expired");
        }
        Member member = sub.getMember();
        CenterCheckin checkin = new CenterCheckin();
        checkin.setMember(member); checkin.setCheckInTime(LocalDateTime.now(clock)); checkin.setMethod("qr");
        checkin.setGate(request.gate());
        User recorder = users.findById(principal.id()).orElse(null);
        checkin.setRecordedBy(recorder);
        return toDto(checkins.saveAndFlush(checkin), "GRANTED");
    }

    @Transactional
    public CheckinDto checkout(AuthenticatedPrincipal principal, Long id) {
        CenterCheckin checkin = checkins.findById(id).orElseThrow(() -> new ResourceNotFoundException("center check-in", id));
        boolean staff = principal.role() != null && List.of("CENTER_MANAGER", "MANAGER", "STAFF", "RECEPTIONIST", "ADMIN").contains(principal.role().toUpperCase());
        if (!staff && !checkin.getMember().getUserId().equals(principal.id())) throw new ForbiddenException("CHECKIN_NOT_OWNER", "error.attendance.not_owner", null, "Not allowed to checkout this check-in");
        if (checkin.getCheckOutTime() != null) throw new BadRequestException("CHECKIN_ALREADY_CHECKED_OUT", "error.attendance.already_checked_out", null, "Already checked out");
        checkin.setCheckOutTime(LocalDateTime.now(clock));
        return toDto(checkins.saveAndFlush(checkin), "GRANTED");
    }

    @Transactional(readOnly = true)
    public List<CheckinDto> history(AuthenticatedPrincipal principal) {
        ensureStaff(principal);
        LocalDate today = LocalDate.now(clock);
        return checkins.findByCheckInTimeGreaterThanEqualAndCheckInTimeLessThanOrderByCheckInTimeDesc(today.atStartOfDay(), today.plusDays(1).atStartOfDay()).stream().map(c -> toDto(c, "GRANTED")).toList();
    }
    private void ensureStaff(AuthenticatedPrincipal principal) {
        if (principal == null || principal.role() == null || !List.of("CENTER_MANAGER", "MANAGER", "STAFF", "RECEPTIONIST", "ADMIN").contains(principal.role().toUpperCase())) {
            throw new ForbiddenException("CHECKIN_STAFF_REQUIRED", "error.forbidden", null, "Staff access is required for this operation");
        }
    }
    private CheckinDto toDto(CenterCheckin c, String status) {
        return new CheckinDto(c.getId(), c.getMember().getUserId(), c.getMember().getUser() == null ? null : c.getMember().getUser().getFullName(), c.getCheckInTime(), c.getCheckOutTime(), c.getMethod(), c.getGate(), status);
    }
}
