package com.swp391.scms.membership.service;

import com.swp391.scms.common.exception.BadRequestException;
<<<<<<< Updated upstream
import com.swp391.scms.common.exception.ConflictException;
import com.swp391.scms.common.exception.ForbiddenException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.facilities.entity.MembershipPackage;
import com.swp391.scms.facilities.repository.MembershipPackageRepository;
import com.swp391.scms.membership.dto.SubscriptionCreateRequest;
import com.swp391.scms.membership.dto.SubscriptionDto;
import com.swp391.scms.membership.entity.MembershipSubscription;
import com.swp391.scms.membership.mapper.MembershipSubscriptionMapper;
=======
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.facilities.entity.MembershipPackage;
import com.swp391.scms.facilities.repository.MembershipPackageRepository;
import com.swp391.scms.membership.dto.SubscriptionRequests;
import com.swp391.scms.membership.dto.SubscriptionResponses.SubscriptionDto;
import com.swp391.scms.membership.entity.MembershipSubscription;
>>>>>>> Stashed changes
import com.swp391.scms.membership.repository.MembershipSubscriptionRepository;
import com.swp391.scms.security.AuthenticatedPrincipal;
import com.swp391.scms.users.MemberRepository;
import com.swp391.scms.users.entity.Member;
<<<<<<< Updated upstream
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Clock;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

@Service
public class MembershipSubscriptionService {

    private static final String PENDING_PAYMENT = "pending_payment";
    private static final String ACTIVE = "active";
    private static final String EXPIRED = "expired";
    private static final int QR_BYTES = 32;
    private static final int QR_GENERATION_ATTEMPTS = 5;

    private final MembershipSubscriptionRepository subscriptions;
    private final MembershipPackageRepository packages;
    private final MemberRepository members;
    private final MembershipSubscriptionMapper mapper;
    private final Clock clock;
    private final SecureRandom secureRandom = new SecureRandom();

    public MembershipSubscriptionService(MembershipSubscriptionRepository subscriptions,
                                         MembershipPackageRepository packages,
                                         MemberRepository members,
                                         MembershipSubscriptionMapper mapper,
                                         Clock clock) {
        this.subscriptions = subscriptions;
        this.packages = packages;
        this.members = members;
        this.mapper = mapper;
        this.clock = clock;
    }

    @Transactional
    public SubscriptionDto create(AuthenticatedPrincipal principal, SubscriptionCreateRequest request) {
        Member member = findMember(principal.id());
        MembershipPackage membershipPackage = findActivePackage(request.packageId());
        LocalDate startDate = LocalDate.now(clock);

        MembershipSubscription subscription = new MembershipSubscription();
        subscription.setMember(member);
        subscription.setMembershipPackage(membershipPackage);
        subscription.setStartDate(startDate);
        subscription.setEndDate(startDate.plusDays(membershipPackage.getDurationDays()));
        subscription.setStatus(PENDING_PAYMENT);
        subscription.setCreatedBy(member.getUser());

        return mapper.toDto(subscriptions.save(subscription));
    }

    @Transactional
    public SubscriptionDto renew(AuthenticatedPrincipal principal, Long subscriptionId) {
        Member member = findMember(principal.id());
        MembershipSubscription previous = findSubscription(subscriptionId);
        ensureOwner(previous, member.getUserId());

        if (!ACTIVE.equals(previous.getStatus()) && !EXPIRED.equals(previous.getStatus())) {
            throw new BadRequestException(
                    "MEMBERSHIP_RENEWAL_INVALID_STATUS",
                    "membership.subscription.invalid_renewal_status",
                    new Object[]{previous.getStatus()},
                    "Subscription cannot be renewed in its current status");
        }

        MembershipPackage membershipPackage = findActivePackage(previous.getMembershipPackage().getId());
        LocalDate today = LocalDate.now(clock);
        LocalDate startDate = !previous.getEndDate().isBefore(today)
                ? previous.getEndDate().plusDays(1)
                : today;

        MembershipSubscription renewal = new MembershipSubscription();
        renewal.setMember(member);
        renewal.setMembershipPackage(membershipPackage);
        renewal.setPreviousSubscription(previous);
        renewal.setStartDate(startDate);
        renewal.setEndDate(startDate.plusDays(membershipPackage.getDurationDays()));
        renewal.setStatus(PENDING_PAYMENT);
        renewal.setCreatedBy(member.getUser());

        return mapper.toDto(subscriptions.save(renewal));
    }

    @Transactional(readOnly = true)
    public List<SubscriptionDto> getMy(AuthenticatedPrincipal principal) {
        findMember(principal.id());
        return subscriptions.findByMemberUserIdOrderByIdDesc(principal.id()).stream()
                .map(mapper::toDto)
                .toList();
    }

    /**
     * Called only by the successful-payment flow. There is intentionally no HTTP endpoint for this operation.
     */
    @Transactional
    public SubscriptionDto activateAfterSuccessfulPayment(Long subscriptionId, Long payingMemberId) {
        MembershipSubscription subscription = findSubscription(subscriptionId);
        ensureOwner(subscription, payingMemberId);

        if (!PENDING_PAYMENT.equals(subscription.getStatus())) {
            throw new BadRequestException(
                    "MEMBERSHIP_ACTIVATION_NOT_PENDING",
                    "membership.subscription.activation_not_pending",
                    new Object[]{subscription.getStatus()},
                    "Only pending subscriptions can be activated after payment");
        }

        MembershipPackage membershipPackage = findActivePackage(subscription.getMembershipPackage().getId());
        LocalDate activationDate = LocalDate.now(clock);
        LocalDate startDate = calculateActivationStart(subscription, activationDate);
        LocalDate endDate = startDate.plusDays(membershipPackage.getDurationDays());

        if (subscriptions.existsByMemberUserIdAndStatusAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                payingMemberId, ACTIVE, endDate, startDate)) {
            throw new ConflictException(
                    "MEMBERSHIP_ACTIVE_OVERLAP",
                    "membership.subscription.active_overlap",
                    null,
                    "Member already has an active subscription covering this period");
        }

        subscription.setMembershipPackage(membershipPackage);
        subscription.setStartDate(startDate);
        subscription.setEndDate(endDate);
        subscription.setQrCode(generateUniqueQrCode());
        subscription.setStatus(ACTIVE);

        try {
            return mapper.toDto(subscriptions.saveAndFlush(subscription));
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "MEMBERSHIP_ACTIVE_OVERLAP",
                    "membership.subscription.active_overlap",
                    null,
                    "Member already has an active subscription covering this period");
        }
    }

    private LocalDate calculateActivationStart(MembershipSubscription subscription, LocalDate activationDate) {
        MembershipSubscription previous = subscription.getPreviousSubscription();
        if (previous == null || previous.getEndDate().isBefore(activationDate)) {
            return activationDate;
        }
        return previous.getEndDate().plusDays(1);
    }

    private String generateUniqueQrCode() {
        for (int attempt = 0; attempt < QR_GENERATION_ATTEMPTS; attempt++) {
            byte[] bytes = new byte[QR_BYTES];
            secureRandom.nextBytes(bytes);
            String candidate = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
            if (subscriptions.findByQrCode(candidate).isEmpty()) {
                return candidate;
            }
        }
        throw new ConflictException(
                "MEMBERSHIP_QR_GENERATION_FAILED",
                "membership.subscription.qr_generation_failed",
                null,
                "Unable to generate a unique QR code");
    }

    private MembershipPackage findActivePackage(Long packageId) {
        MembershipPackage membershipPackage = packages.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("resource.package", packageId));
        if (!"active".equalsIgnoreCase(membershipPackage.getStatus())) {
            throw new BadRequestException(
                    "MEMBERSHIP_PACKAGE_INACTIVE",
                    "membership.package.inactive",
                    new Object[]{packageId},
                    "Membership package is inactive");
        }
        return membershipPackage;
    }

    private MembershipSubscription findSubscription(Long subscriptionId) {
        return subscriptions.findById(subscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException("resource.subscription", subscriptionId));
    }

    private Member findMember(Long userId) {
        return members.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("resource.member", userId));
    }

    private void ensureOwner(MembershipSubscription subscription, Long memberId) {
        if (subscription.getMember() == null || !memberId.equals(subscription.getMember().getUserId())) {
            throw new ForbiddenException(
                    "MEMBERSHIP_SUBSCRIPTION_NOT_OWNER",
                    "membership.subscription.not_owner",
                    null,
                    "Subscription does not belong to the authenticated member");
        }
=======
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class MembershipSubscriptionService {
    private final MembershipSubscriptionRepository subscriptions;
    private final MembershipPackageRepository packages;
    private final MemberRepository members;
    private final Clock clock;

    public MembershipSubscriptionService(MembershipSubscriptionRepository subscriptions,
            MembershipPackageRepository packages, MemberRepository members, Clock clock) {
        this.subscriptions = subscriptions; this.packages = packages; this.members = members; this.clock = clock;
    }

    @Transactional
    public SubscriptionDto create(AuthenticatedPrincipal principal, SubscriptionRequests.Create request) {
        Member member = findMember(principal.id());
        MembershipPackage pack = findActivePackage(request.packageId());
        LocalDate today = LocalDate.now(clock);
        MembershipSubscription sub = new MembershipSubscription();
        sub.setMember(member); sub.setMembershipPackage(pack);
        sub.setStartDate(today); sub.setEndDate(today.plusDays(pack.getDurationDays()));
        sub.setStatus("pending_payment");
        return toDto(subscriptions.saveAndFlush(sub));
    }

    @Transactional
    public SubscriptionDto renew(AuthenticatedPrincipal principal, Long previousId) {
        MembershipSubscription previous = subscriptions.findById(previousId)
                .orElseThrow(() -> new ResourceNotFoundException("membership subscription", previousId));
        if (previous.getMember() == null || !previous.getMember().getUserId().equals(principal.id())) {
            throw new BadRequestException("MEMBERSHIP_SUBSCRIPTION_NOT_OWNED", "error.membership.subscription_not_found", null, "Subscription not found");
        }
        MembershipPackage pack = findActivePackage(previous.getMembershipPackage().getId());
        LocalDate today = LocalDate.now(clock);
        MembershipSubscription sub = new MembershipSubscription();
        sub.setMember(previous.getMember()); sub.setMembershipPackage(pack); sub.setPreviousSubscription(previous);
        sub.setStartDate(today); sub.setEndDate(today.plusDays(pack.getDurationDays())); sub.setStatus("pending_payment");
        return toDto(subscriptions.saveAndFlush(sub));
    }

    @Transactional(readOnly = true)
    public List<SubscriptionDto> mine(AuthenticatedPrincipal principal) {
        findMember(principal.id());
        return subscriptions.findByMemberUserIdOrderByCreatedAtDesc(principal.id()).stream().map(this::toDto).toList();
    }

    /** Called by the trusted payment-confirmation workflow only; never expose as a member endpoint. */
    @Transactional
    public SubscriptionDto activateAfterPayment(Long subscriptionId) {
        MembershipSubscription sub = subscriptions.findById(subscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException("membership subscription", subscriptionId));
        if (!"pending_payment".equals(sub.getStatus())) {
            throw new BadRequestException("MEMBERSHIP_SUBSCRIPTION_NOT_PENDING", "error.membership.subscription_not_active", null, "Subscription is not pending payment");
        }
        LocalDate start = LocalDate.now(clock);
        sub.setStartDate(start);
        sub.setEndDate(start.plusDays(sub.getMembershipPackage().getDurationDays()));
        sub.setQrCode(UUID.randomUUID().toString());
        sub.setStatus("active");
        return toDto(subscriptions.saveAndFlush(sub));
    }

    private Member findMember(Long id) {
        return members.findById(id).orElseThrow(() -> new ResourceNotFoundException("resource.member", id));
    }
    private MembershipPackage findActivePackage(Long id) {
        MembershipPackage pack = packages.findById(id).orElseThrow(() -> new ResourceNotFoundException("membership package", id));
        if (!"active".equalsIgnoreCase(pack.getStatus()) || pack.getDurationDays() <= 0) {
            throw new BadRequestException("MEMBERSHIP_PACKAGE_INACTIVE", "error.membership.package_inactive", null, "Membership package is inactive");
        }
        return pack;
    }
    private SubscriptionDto toDto(MembershipSubscription s) {
        return new SubscriptionDto(s.getId(), s.getMember().getUserId(), s.getMembershipPackage().getId(),
                s.getMembershipPackage().getName(), s.getPreviousSubscription() == null ? null : s.getPreviousSubscription().getId(),
                s.getStartDate(), s.getEndDate(), s.getStatus(), s.getQrCode(), s.getCreatedAt());
>>>>>>> Stashed changes
    }
}
