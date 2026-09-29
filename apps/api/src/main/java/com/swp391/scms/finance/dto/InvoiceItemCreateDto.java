package com.swp391.scms.finance.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * Data Transfer Object for creating an Invoice line item.
 */
@Schema(description = "Yêu cầu tạo chi tiết dòng hóa đơn")
public class InvoiceItemCreateDto {

    @NotBlank(message = "Mô tả sản phẩm/dịch vụ không được để trống")
    @Schema(description = "Mô tả dịch vụ", example = "Gói tập Gold 6 tháng")
    private String description;

    @NotNull(message = "Số lượng không được để trống")
    @Min(value = 1, message = "Số lượng tối thiểu là 1")
    @Schema(description = "Số lượng", example = "1")
    private Integer quantity = 1;

    @NotNull(message = "Đơn giá không được để trống")
    @DecimalMin(value = "0.0", message = "Đơn giá không được âm")
    @Schema(description = "Đơn giá (VNĐ)", example = "3000000.00")
    private BigDecimal unitPrice;

    public InvoiceItemCreateDto() {}

    public InvoiceItemCreateDto(String description, Integer quantity, BigDecimal unitPrice) {
        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
}
