package com.swp391.scms.finance.service;

import com.swp391.scms.common.exception.BadRequestException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.finance.dto.PaymentCreateDto;
import com.swp391.scms.finance.dto.PaymentDto;
import com.swp391.scms.finance.entity.Payment;
import com.swp391.scms.finance.mapper.PaymentMapper;
import com.swp391.scms.finance.repository.PaymentRepository;
import com.swp391.scms.users.UserRepository;
import com.swp391.scms.users.MemberRepository;
import com.swp391.scms.users.entity.Member;
import com.swp391.scms.users.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.List;
import java.util.Set;

/**
 * Service managing Payments transactions.
 */
@Service
@Transactional
public class PaymentService {

    private static final Set<String> VALID_STATUSES = Set.of("success", "pending", "failed", "refunded");

    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final PaymentMapper paymentMapper;
    private final Clock clock;

    public PaymentService(PaymentRepository paymentRepository,
                          MemberRepository memberRepository,
                          UserRepository userRepository,
                          PaymentMapper paymentMapper, Clock clock) {
        this.paymentRepository = paymentRepository;
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
        this.paymentMapper = paymentMapper;
        this.clock = clock;
    }

    public PaymentDto createPayment(PaymentCreateDto dto) {
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("resource.member", dto.getMemberId()));

        User receiver = null;
        if (dto.getReceivedById() != null) {
            receiver = userRepository.findByIdAndDeletedAtIsNull(dto.getReceivedById())
                    .orElseThrow(() -> new ResourceNotFoundException("resource.cashier", dto.getReceivedById()));
        }

        Payment payment = paymentMapper.toEntity(dto);
        payment.setMember(member);
        payment.setReceivedBy(receiver);

        if (dto.getMethod() != null) {
            payment.setMethod(dto.getMethod().toLowerCase(Locale.ROOT));
        }
        String initialStatus = dto.getStatus() != null ? dto.getStatus().toLowerCase(Locale.ROOT) : "pending";
        payment.setStatus(initialStatus);
        markPaidIfSuccess(payment, initialStatus);

        Payment saved = paymentRepository.save(payment);
        return paymentMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public PaymentDto getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("resource.payment", id));
        return paymentMapper.toDto(payment);
    }

    @Transactional(readOnly = true)
    public List<PaymentDto> getPaymentsByMemberId(Long memberId) {
        if (!memberRepository.existsById(memberId)) {
            throw new ResourceNotFoundException("resource.member", memberId);
        }
        List<Payment> payments = paymentRepository.findByMemberUserId(memberId);
        return paymentMapper.toDtoList(payments);
    }

    public PaymentDto updatePaymentStatus(Long id, String status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("resource.payment", id));

        if (status == null || !VALID_STATUSES.contains(status.toLowerCase(Locale.ROOT))) {
            throw new BadRequestException("INVALID_PAYMENT_STATUS", "finance.payment.invalid_status", new Object[]{status},
                    "Trạng thái thanh toán không hợp lệ: " + status);
        }
        String normalizedStatus = status.toLowerCase(Locale.ROOT);
        String currentStatus = payment.getStatus() != null ? payment.getStatus().toLowerCase(Locale.ROOT) : "pending";

        if (!currentStatus.equals(normalizedStatus)) {
            boolean allowed = switch (currentStatus) {
                case "pending" -> "success".equals(normalizedStatus) || "failed".equals(normalizedStatus);
                case "failed" -> "pending".equals(normalizedStatus);
                case "success" -> "refunded".equals(normalizedStatus);
                default -> false;
            };
            if (!allowed) {
                throw new BadRequestException("INVALID_STATUS_TRANSITION", "finance.payment.invalid_transition",
                        new Object[]{currentStatus, normalizedStatus},
                        "Không thể chuyển trạng thái thanh toán từ '" + currentStatus + "' sang '" + normalizedStatus + "'");
            }
            payment.setStatus(normalizedStatus);
            markPaidIfSuccess(payment, normalizedStatus);
        }

        return paymentMapper.toDto(payment);
    }

    private void markPaidIfSuccess(Payment payment, String status) {
        if ("success".equals(status) && payment.getPaidAt() == null) {
            payment.setPaidAt(LocalDateTime.now(clock));
        }
    }
}
