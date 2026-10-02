package com.swp391.scms.finance;

import com.swp391.scms.common.exception.BadRequestException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.finance.dto.PaymentCreateDto;
import com.swp391.scms.finance.dto.PaymentDto;
import com.swp391.scms.finance.entity.Payment;
import com.swp391.scms.finance.mapper.PaymentMapper;
import com.swp391.scms.finance.repository.PaymentRepository;
import com.swp391.scms.finance.service.PaymentService;
import com.swp391.scms.users.MemberRepository;
import com.swp391.scms.users.UserRepository;
import com.swp391.scms.users.entity.Member;
import com.swp391.scms.users.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PaymentMapper paymentMapper;

    private Clock clock;
    private PaymentService paymentService;

    @BeforeEach
    void setUp() {
        clock = Clock.fixed(Instant.parse("2026-10-01T10:00:00Z"), ZoneOffset.UTC);
        paymentService = new PaymentService(paymentRepository, memberRepository, userRepository, paymentMapper, clock);
    }

    @Test
    @DisplayName("Should create payment successfully when member and cashier are valid")
    void shouldCreatePaymentSuccessfully() {
        PaymentCreateDto dto = new PaymentCreateDto();
        dto.setMemberId(2L);
        dto.setReceivedById(1L);
        dto.setAmount(new BigDecimal("1500000.00"));
        dto.setMethod("POS");
        dto.setStatus("SUCCESS");

        Member member = new Member();
        User receiver = new User();
        Payment payment = new Payment();
        PaymentDto expectedDto = new PaymentDto();
        expectedDto.setId(10L);

        when(memberRepository.findById(2L)).thenReturn(Optional.of(member));
        when(userRepository.findByIdAndDeletedAtIsNull(1L)).thenReturn(Optional.of(receiver));
        when(paymentMapper.toEntity(dto)).thenReturn(payment);
        when(paymentRepository.save(payment)).thenReturn(payment);
        when(paymentMapper.toDto(payment)).thenReturn(expectedDto);

        PaymentDto result = paymentService.createPayment(dto);

        assertNotNull(result);
        assertEquals(10L, result.getId());
        assertEquals("pos", payment.getMethod());
        assertEquals("success", payment.getStatus());
        assertEquals(LocalDateTime.now(clock), payment.getPaidAt());
        verify(paymentRepository).save(payment);
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when member does not exist")
    void shouldThrowWhenCreatingPaymentWithNonExistentMember() {
        PaymentCreateDto dto = new PaymentCreateDto();
        dto.setMemberId(999L);

        when(memberRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> paymentService.createPayment(dto));
        verify(paymentRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when cashier receiver is soft-deleted")
    void shouldThrowWhenCreatingPaymentWithSoftDeletedCashier() {
        PaymentCreateDto dto = new PaymentCreateDto();
        dto.setMemberId(2L);
        dto.setReceivedById(1L);

        when(memberRepository.findById(2L)).thenReturn(Optional.of(new Member()));
        when(userRepository.findByIdAndDeletedAtIsNull(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> paymentService.createPayment(dto));
        verify(paymentRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should return PaymentDto by ID when payment exists")
    void shouldGetPaymentById() {
        Payment payment = new Payment();
        payment.setId(5L);
        PaymentDto expectedDto = new PaymentDto();
        expectedDto.setId(5L);

        when(paymentRepository.findById(5L)).thenReturn(Optional.of(payment));
        when(paymentMapper.toDto(payment)).thenReturn(expectedDto);

        PaymentDto result = paymentService.getPaymentById(5L);
        assertEquals(5L, result.getId());
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when payment ID not found")
    void shouldThrowWhenPaymentNotFound() {
        when(paymentRepository.findById(999L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> paymentService.getPaymentById(999L));
    }

    @Test
    @DisplayName("Should return list of payments for existing member")
    void shouldGetPaymentsByMemberId() {
        when(memberRepository.existsById(2L)).thenReturn(true);
        Payment payment = new Payment();
        when(paymentRepository.findByMemberUserId(2L)).thenReturn(List.of(payment));
        when(paymentMapper.toDtoList(List.of(payment))).thenReturn(List.of(new PaymentDto()));

        List<PaymentDto> results = paymentService.getPaymentsByMemberId(2L);
        assertEquals(1, results.size());
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when querying payments for non-existent member")
    void shouldThrowWhenMemberNotFoundForPaymentsHistory() {
        when(memberRepository.existsById(999L)).thenReturn(false);
        assertThrows(ResourceNotFoundException.class, () -> paymentService.getPaymentsByMemberId(999L));
    }

    @Test
    @DisplayName("Should update payment status from pending to success and set paidAt")
    void shouldUpdatePaymentStatusFromPendingToSuccess() {
        Payment payment = new Payment();
        payment.setId(1L);
        payment.setStatus("pending");

        when(paymentRepository.findById(1L)).thenReturn(Optional.of(payment));
        when(paymentMapper.toDto(payment)).thenReturn(new PaymentDto());

        paymentService.updatePaymentStatus(1L, "success");

        assertEquals("success", payment.getStatus());
        assertEquals(LocalDateTime.now(clock), payment.getPaidAt());
    }

    @Test
    @DisplayName("Should update payment status from success to refunded")
    void shouldUpdatePaymentStatusFromSuccessToRefunded() {
        Payment payment = new Payment();
        payment.setId(1L);
        payment.setStatus("success");
        payment.setPaidAt(LocalDateTime.now(clock).minusHours(1));

        when(paymentRepository.findById(1L)).thenReturn(Optional.of(payment));
        when(paymentMapper.toDto(payment)).thenReturn(new PaymentDto());

        paymentService.updatePaymentStatus(1L, "refunded");

        assertEquals("refunded", payment.getStatus());
    }

    @Test
    @DisplayName("Should throw BadRequestException for invalid status transitions (e.g., refunded -> success)")
    void shouldRejectDisallowedStatusTransitions() {
        Payment payment = new Payment();
        payment.setId(1L);
        payment.setStatus("refunded");

        when(paymentRepository.findById(1L)).thenReturn(Optional.of(payment));

        assertThrows(BadRequestException.class, () -> paymentService.updatePaymentStatus(1L, "success"));
    }

    @Test
    @DisplayName("Should throw BadRequestException when status string is unknown")
    void shouldRejectInvalidStatusString() {
        Payment payment = new Payment();
        payment.setId(1L);

        when(paymentRepository.findById(1L)).thenReturn(Optional.of(payment));

        assertThrows(BadRequestException.class, () -> paymentService.updatePaymentStatus(1L, "invalid_status"));
    }
}
