package com.swp391.scms.us06.f02.service;

import com.swp391.scms.common.exception.ConflictException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.us06.f02.dto.DisciplineRequest;
import com.swp391.scms.us06.f02.dto.DisciplineResponse;
import com.swp391.scms.us06.f02.entity.Discipline;
import com.swp391.scms.us06.f02.repository.DisciplineRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DisciplineService {
    private final DisciplineRepository repository;
    private final JdbcTemplate jdbcTemplate;

    public DisciplineService(DisciplineRepository repository, JdbcTemplate jdbcTemplate) {
        this.repository = repository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public DisciplineResponse create(DisciplineRequest request) {
        String name = normalizeName(request.name());
        if (repository.existsByName(name)) {
            throw new ConflictException("DISCIPLINE_NAME_EXISTS", "Tên bộ môn đã tồn tại: " + name);
        }
        Discipline entity = new Discipline();
        entity.setName(name);
        entity.setDescription(request.description());
        try {
            return toResponse(repository.saveAndFlush(entity));
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("DISCIPLINE_NAME_EXISTS", "Tên bộ môn đã tồn tại: " + name);
        }
    }

    @Transactional(readOnly = true)
    public List<DisciplineResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public DisciplineResponse getById(Long id) {
        return toResponse(findEntity(id));
    }

    @Transactional
    public DisciplineResponse update(Long id, DisciplineRequest request) {
        Discipline entity = findEntity(id);
        String name = normalizeName(request.name());
        if (repository.existsByNameAndIdNot(name, id)) {
            throw new ConflictException("DISCIPLINE_NAME_EXISTS", "Tên bộ môn đã tồn tại: " + name);
        }
        entity.setName(name);
        entity.setDescription(request.description());
        try {
            return toResponse(repository.saveAndFlush(entity));
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("DISCIPLINE_NAME_EXISTS", "Tên bộ môn đã tồn tại: " + name);
        }
    }

    @Transactional
    public void delete(Long id) {
        Discipline entity = findEntity(id);
        Long count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM classes WHERE discipline_id = ?", Long.class, id);
        if (count != null && count > 0) {
            throw new ConflictException("DISCIPLINE_IN_USE",
                    "Không thể xóa bộ môn vì đang được " + count + " lớp học tham chiếu. Hãy chuyển trạng thái/thực hiện phương án ngừng sử dụng thay vì xóa.");
        }
        try {
            repository.delete(entity);
            repository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("DISCIPLINE_IN_USE",
                    "Không thể xóa bộ môn vì đang được lớp học hoặc dữ liệu khác tham chiếu. Hãy ngừng sử dụng thay vì xóa.");
        }
    }

    private Discipline findEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("bộ môn", id));
    }

    private String normalizeName(String value) {
        return value == null ? null : value.trim();
    }

    private DisciplineResponse toResponse(Discipline e) {
        return new DisciplineResponse(e.getId(), e.getName(), e.getDescription(), e.getCreatedAt());
    }
}
