package com.swp391.scms.us06.f03.service;

import com.swp391.scms.common.exception.BadRequestException;
import com.swp391.scms.common.exception.ConflictException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.us06.f03.dto.RoomRequest;
import com.swp391.scms.us06.f03.dto.RoomResponse;
import com.swp391.scms.us06.f03.entity.Room;
import com.swp391.scms.us06.f03.repository.RoomRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class RoomService {
    private static final Set<String> ALLOWED_STATUS = Set.of("available", "maintenance", "closed");
    private final RoomRepository repository;
    private final JdbcTemplate jdbcTemplate;

    public RoomService(RoomRepository repository, JdbcTemplate jdbcTemplate) {
        this.repository = repository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public RoomResponse create(RoomRequest request) {
        validateStatus(request.status());
        Room e = new Room();
        apply(e, request);
        return toResponse(repository.saveAndFlush(e));
    }

    @Transactional(readOnly = true)
    public List<RoomResponse> getAll() { return repository.findAll().stream().map(this::toResponse).toList(); }

    @Transactional(readOnly = true)
    public RoomResponse getById(Long id) { return toResponse(findEntity(id)); }

    @Transactional
    public RoomResponse update(Long id, RoomRequest request) {
        validateStatus(request.status());
        Room e = findEntity(id);
        apply(e, request);
        return toResponse(repository.saveAndFlush(e));
    }

    @Transactional
    public void delete(Long id) {
        Room e = findEntity(id);
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM classes WHERE room_id = ?", Long.class, id);
        if (count != null && count > 0) {
            throw new ConflictException("ROOM_IN_USE", "Không thể xóa phòng vì đang được " + count + " lớp học tham chiếu.");
        }
        try {
            repository.delete(e);
            repository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("ROOM_IN_USE", "Không thể xóa phòng vì đang được dữ liệu khác tham chiếu.");
        }
    }

    @Transactional(readOnly = true)
    public boolean canScheduleNewClass(Long id) {
        Room e = findEntity(id);
        return "available".equals(e.getStatus());
    }

    @Transactional(readOnly = true)
    public void validateCanScheduleNewClass(Long id) {
        Room e = findEntity(id);
        if (!"available".equals(e.getStatus())) {
            throw new ConflictException("ROOM_NOT_AVAILABLE", "Không thể xếp lớp mới vào phòng có status='" + e.getStatus() + "'. Chỉ phòng available mới được xếp lớp.");
        }
    }

    private void validateStatus(String status) {
        if (status == null || !ALLOWED_STATUS.contains(status.trim().toLowerCase())) {
            throw new BadRequestException("ROOM_INVALID_STATUS", "Status phòng chỉ nhận: available, maintenance, closed.");
        }
    }

    private void apply(Room e, RoomRequest r) {
        e.setName(r.name().trim());
        e.setLocation(r.location() == null ? null : r.location().trim());
        e.setCapacity(r.capacity());
        e.setStatus(r.status().trim().toLowerCase());
    }
    private Room findEntity(Long id) { return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("phòng", id)); }
    private RoomResponse toResponse(Room e) { return new RoomResponse(e.getId(), e.getName(), e.getLocation(), e.getCapacity(), e.getStatus()); }
}
