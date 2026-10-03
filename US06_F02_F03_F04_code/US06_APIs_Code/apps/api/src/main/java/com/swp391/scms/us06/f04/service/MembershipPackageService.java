package com.swp391.scms.us06.f04.service;

import com.swp391.scms.common.exception.BadRequestException;
import com.swp391.scms.common.exception.ConflictException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.us06.f04.dto.MembershipPackageRequest;
import com.swp391.scms.us06.f04.dto.MembershipPackageResponse;
import com.swp391.scms.us06.f04.entity.MembershipPackage;
import com.swp391.scms.us06.f04.repository.MembershipPackageRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class MembershipPackageService {
    private static final Set<String> ALLOWED_STATUS = Set.of("active", "inactive");
    private final MembershipPackageRepository repository;
    private final JdbcTemplate jdbcTemplate;

    public MembershipPackageService(MembershipPackageRepository repository, JdbcTemplate jdbcTemplate) {
        this.repository = repository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public MembershipPackageResponse create(MembershipPackageRequest request) {
        validateStatus(request.status());
        MembershipPackage e = new MembershipPackage();
        apply(e, request);
        return toResponse(repository.saveAndFlush(e));
    }

    @Transactional(readOnly = true)
    public List<MembershipPackageResponse> getAll() { return repository.findAll().stream().map(this::toResponse).toList(); }

    @Transactional(readOnly = true)
    public List<MembershipPackageResponse> getAvailableForPurchase() {
        return repository.findAll().stream().filter(p -> "active".equals(p.getStatus())).map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public MembershipPackageResponse getById(Long id) { return toResponse(findEntity(id)); }

    @Transactional
    public MembershipPackageResponse update(Long id, MembershipPackageRequest request) {
        validateStatus(request.status());
        MembershipPackage e = findEntity(id);
        apply(e, request);
        return toResponse(repository.saveAndFlush(e));
    }

    @Transactional
    public MembershipPackageResponse deactivate(Long id) {
        MembershipPackage e = findEntity(id);
        e.setStatus("inactive");
        return toResponse(repository.saveAndFlush(e));
    }

    @Transactional
    public void delete(Long id) {
        // F04: DELETE is intentionally a soft action. The package remains for old subscriptions.
        deactivate(id);
    }

    @Transactional(readOnly = true)
    public boolean hasSubscriptions(Long id) {
        if (!repository.existsById(id)) throw new ResourceNotFoundException("gói dịch vụ", id);
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM membership_subscriptions WHERE package_id = ?", Long.class, id);
        return count != null && count > 0;
    }

    private void validateStatus(String status) {
        if (status == null || !ALLOWED_STATUS.contains(status.trim().toLowerCase())) {
            throw new BadRequestException("PACKAGE_INVALID_STATUS", "Status gói chỉ nhận: active, inactive.");
        }
    }
    private void apply(MembershipPackage e, MembershipPackageRequest r) {
        e.setName(r.name().trim());
        e.setDescription(r.description());
        e.setPrice(r.price());
        e.setDurationDays(r.durationDays());
        e.setClassCreditLimit(r.classCreditLimit());
        e.setStatus(r.status().trim().toLowerCase());
        e.setCreatedBy(r.createdBy());
    }
    private MembershipPackage findEntity(Long id) { return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("gói dịch vụ", id)); }
    private MembershipPackageResponse toResponse(MembershipPackage e) { return new MembershipPackageResponse(e.getId(), e.getName(), e.getDescription(), e.getPrice(), e.getDurationDays(), e.getClassCreditLimit(), e.getStatus(), e.getCreatedBy(), e.getCreatedAt(), e.getUpdatedAt()); }
}
