package com.swp391.scms.finance.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for creating a new Payment transaction.
 */
@Schema(description = "Yêu cầu tạo mới giao dịch thanh toán")
public class PaymentCreateDto {

    @NotNull(message = "ID hội viên không được để trống")
    @Schema(description = "ID hội viên thực hiện thanh toán", example = "2")
    private Long memberId;

    @Schema(description = "ID gói hội viên đăng ký (nếu thanh toán cho gói)", example = "1")
    private Long subscriptionId;

    @Schema(description = "ID lượt đăng ký lớp học (nếu thanh toán cho lớp)", example = "5")
    private Long classEnrollmentId;

    @NotNull(message = "Số tiền thanh toán không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Số tiền phải lớn hơn 0")
    @Schema(description = "Số tiền thanh toán (VNĐ)", example = "1500000.00")
    private BigDecimal amount;

    @NotBlank(message = "Phương thức thanh toán không được để trống")
    @Pattern(regexp = "cash|pos|bank_transfer|online_wallet", message = "Phương thức thanh toán phải là một trong: cash, pos, bank_transfer, online_wallet")
    @Schema(description = "Phương thức thanh toán", example = "pos")
    private String method;

    @Pattern(regexp = "success|pending|failed|refunded", message = "Trạng thái phải là một trong: success, pending, failed, refunded")
    @Schema(description = "Trạng thái thanh toán ban đầu", example = "success")
    private String status = "pending";

    @Schema(description = "Thời điểm thanh toán hoàn tất")
    private LocalDateTime paidAt;

    @Schema(description = "ID nhân viên thu ngân tiếp nhận thanh toán", example = "1")
    private Long receivedById;

    @Schema(description = "Ghi chú giao dịch", example = "Thanh toán gói Silver 3 tháng tại quầy")
    private String note;

    public PaymentCreateDto() {}

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public Long getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(Long subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    public Long getClassEnrollmentId() {
        return classEnrollmentId;
    }

    public void setClassEnrollmentId(Long classEnrollmentId) {
        this.classEnrollmentId = classEnrollmentId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(LocalDateTime paidAt) {
        this.paidAt = paidAt;
    }

    public Long getReceivedById() {
        return receivedById;
    }

    public void setReceivedById(Long receivedById) {
        this.receivedById = receivedById;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
