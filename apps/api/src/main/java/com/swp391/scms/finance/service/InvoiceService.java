package com.swp391.scms.finance.service;

import com.swp391.scms.common.exception.BadRequestException;
import com.swp391.scms.common.exception.ConflictException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.finance.dto.InvoiceCreateDto;
import com.swp391.scms.finance.dto.InvoiceDto;
import com.swp391.scms.finance.dto.InvoiceItemCreateDto;
import com.swp391.scms.finance.entity.Invoice;
import com.swp391.scms.finance.entity.InvoiceItem;
import com.swp391.scms.finance.entity.Payment;
import com.swp391.scms.finance.mapper.InvoiceMapper;
import com.swp391.scms.finance.repository.InvoiceRepository;
import com.swp391.scms.finance.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * Service managing Invoices, InvoiceItems, and PERSISTED computed column synchronizations.
 */
@Service
@Transactional
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;
    private final InvoiceMapper invoiceMapper;
    private final Clock clock;

    public InvoiceService(InvoiceRepository invoiceRepository,
                          PaymentRepository paymentRepository,
                          InvoiceMapper invoiceMapper, Clock clock) {
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
        this.invoiceMapper = invoiceMapper;
        this.clock = clock;
    }

    /**
     * Issues a new electronic invoice.
     * The configured database computes total_amount and item amount through generated columns.
     */
    public InvoiceDto createInvoice(InvoiceCreateDto dto) {
        Payment payment = paymentRepository.findById(dto.getPaymentId())
                .orElseThrow(() -> new ResourceNotFoundException("Giao dịch thanh toán", dto.getPaymentId()));

        if ("failed".equalsIgnoreCase(payment.getStatus()) || "refunded".equalsIgnoreCase(payment.getStatus())) {
            throw new BadRequestException("INVALID_PAYMENT_STATE",
                    "Không thể xuất hóa đơn cho giao dịch có trạng thái '" + payment.getStatus() + "'");
        }

        if (invoiceRepository.findByPaymentId(dto.getPaymentId()).isPresent()) {
            throw new ConflictException("Giao dịch thanh toán này đã có hóa đơn điện tử");
        }

        String invoiceNumber = dto.getInvoiceNumber();
        if (invoiceNumber == null || invoiceNumber.isBlank()) {
            invoiceNumber = generateInvoiceNumber();
        } else if (invoiceRepository.existsByInvoiceNumber(invoiceNumber)) {
            throw new ConflictException("Mã số hóa đơn " + invoiceNumber + " đã tồn tại");
        }

        Invoice invoice = invoiceMapper.toEntity(dto);
        invoice.setPayment(payment);
        payment.setInvoice(invoice);
        invoice.setInvoiceNumber(invoiceNumber);
        if (invoice.getIssuedAt() == null) {
            invoice.setIssuedAt(LocalDateTime.now(clock));
        }

        if (dto.getItems() != null) {
            for (InvoiceItemCreateDto itemDto : dto.getItems()) {
                InvoiceItem item = invoiceMapper.toItemEntity(itemDto);
                invoice.addItem(item);
            }
        }

        Invoice saved = invoiceRepository.save(invoice);
        return invoiceMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public InvoiceDto getInvoiceById(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hóa đơn", id));
        return invoiceMapper.toDto(invoice);
    }

    @Transactional(readOnly = true)
    public InvoiceDto getInvoiceByNumber(String invoiceNumber) {
        Invoice invoice = invoiceRepository.findByInvoiceNumber(invoiceNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Hóa đơn", invoiceNumber));
        return invoiceMapper.toDto(invoice);
    }

    @Transactional(readOnly = true)
    public InvoiceDto getInvoiceByPaymentId(Long paymentId) {
        Invoice invoice = invoiceRepository.findByPaymentId(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Hóa đơn cho giao dịch", paymentId));
        return invoiceMapper.toDto(invoice);
    }

    private String generateInvoiceNumber() {
        String dateStr = LocalDateTime.now(clock).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String suffix = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "INV-" + dateStr + "-" + suffix;
    }
}
