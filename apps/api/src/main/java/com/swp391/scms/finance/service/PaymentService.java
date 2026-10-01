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

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service managing Payments transactions.
 */
@Service
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final PaymentMapper paymentMapper;

    public PaymentService(PaymentRepository paymentRepository,
                          MemberRepository memberRepository,
                          UserRepository userRepository,
                          PaymentMapper paymentMapper) {
        this.paymentRepository = paymentRepository;
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
        this.paymentMapper = paymentMapper;
    }

    public PaymentDto createPayment(PaymentCreateDto dto) {
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Hội viên", dto.getMemberId()));

        User receiver = null;
        if (dto.getReceivedById() != null) {
            receiver = userRepository.findById(dto.getReceivedById())
                    .orElseThrow(() -> new ResourceNotFoundException("Nhân viên thu ngân", dto.getReceivedById()));
        }

        Payment payment = paymentMapper.toEntity(dto);
        payment.setMember(member);
        payment.setReceivedBy(receiver);

        if ("success".equalsIgnoreCase(payment.getStatus()) && payment.getPaidAt() == null) {
            payment.setPaidAt(LocalDateTime.now());
        }

        Payment saved = paymentRepository.save(payment);
        return paymentMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public PaymentDto getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Giao dịch thanh toán", id));
        return paymentMapper.toDto(payment);
    }

    @Transactional(readOnly = true)
    public List<PaymentDto> getPaymentsByMemberId(Long memberId) {
        List<Payment> payments = paymentRepository.findByMemberUserId(memberId);
        return paymentMapper.toDtoList(payments);
    }

    public PaymentDto updatePaymentStatus(Long id, String status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Giao dịch thanh toán", id));

        if (!List.of("success", "pending", "failed", "refunded").contains(status.toLowerCase())) {
            throw new BadRequestException("Trạng thái thanh toán không hợp lệ: " + status);
        }

        payment.setStatus(status.toLowerCase());
        if ("success".equalsIgnoreCase(status) && payment.getPaidAt() == null) {
            payment.setPaidAt(LocalDateTime.now());
        }

        return paymentMapper.toDto(payment);
    }
}
