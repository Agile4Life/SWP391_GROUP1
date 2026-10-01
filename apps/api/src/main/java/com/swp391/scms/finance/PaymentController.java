package com.swp391.scms.finance;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.finance.dto.PaymentCreateDto;
import com.swp391.scms.finance.dto.PaymentDto;
import com.swp391.scms.finance.dto.PaymentStatusUpdateRequest;
import com.swp391.scms.finance.service.PaymentService;
import com.swp391.scms.common.i18n.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Payments & Invoices", description = "Quản lý giao dịch thu tiền, xuất hóa đơn điện tử và công nợ")
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final MessageService messageService;

    public PaymentController(PaymentService paymentService) {
        this(paymentService, null);
    }

    public PaymentController(PaymentService paymentService, MessageService messageService) {
        this.paymentService = paymentService;
        this.messageService = messageService;
    }

    private String msg(String key, String fallback, Object... args) {
        if (messageService != null) {
            return messageService.getMessageOrDefault(key, fallback, args);
        }
        return fallback;
    }

    @Operation(summary = "Tạo mới giao dịch thanh toán", description = "Tạo phiếu thu tiền học phí, gói tập qua POS, Tiền mặt, Chuyển khoản")
    @PostMapping
    public ResponseEntity<ApiResponse<PaymentDto>> createPayment(@Valid @RequestBody PaymentCreateDto dto) {
        PaymentDto created = paymentService.createPayment(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(msg("finance.payment.created", "Tạo giao dịch thanh toán thành công"), created));
    }

    @Operation(summary = "Xem chi tiết giao dịch thanh toán", description = "Tra cứu giao dịch theo Payment ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PaymentDto>> getPaymentById(@PathVariable Long id) {
        PaymentDto payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(ApiResponse.ok(msg("finance.payment.detail", "Lấy chi tiết giao dịch thành công"), payment));
    }

    @Operation(summary = "Lịch sử thanh toán của hội viên", description = "Lấy tất cả giao dịch thanh toán của một hội viên")
    @GetMapping("/member/{memberId}")
    public ResponseEntity<ApiResponse<List<PaymentDto>>> getPaymentsByMemberId(@PathVariable Long memberId) {
        List<PaymentDto> payments = paymentService.getPaymentsByMemberId(memberId);
        return ResponseEntity.ok(ApiResponse.ok(msg("finance.payment.list", "Lấy danh sách giao dịch thành công"), payments));
    }

    @Operation(summary = "Cập nhật trạng thái thanh toán", description = "Chuyển trạng thái giao dịch sang success, pending, failed, refunded")
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<PaymentDto>> updatePaymentStatus(
            @PathVariable Long id,
            @Valid @RequestBody PaymentStatusUpdateRequest request) {
        PaymentDto updated = paymentService.updatePaymentStatus(id, request.status());
        return ResponseEntity.ok(ApiResponse.ok(msg("finance.payment.status_updated", "Cập nhật trạng thái thanh toán thành công"), updated));
    }
}
