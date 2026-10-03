package com.swp391.scms.us06.f02.controller;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.us06.f02.dto.DisciplineRequest;
import com.swp391.scms.us06.f02.dto.DisciplineResponse;
import com.swp391.scms.us06.f02.service.DisciplineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/disciplines")
@Tag(name = "US06-F02 Discipline API", description = "CRUD bộ môn cho quản lý trung tâm")
public class DisciplineController {
    private final DisciplineService service;
    public DisciplineController(DisciplineService service) { this.service = service; }

    @PostMapping
    @Operation(summary = "Tạo bộ môn")
    public ResponseEntity<ApiResponse<DisciplineResponse>> create(@Valid @RequestBody DisciplineRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created("Tạo bộ môn thành công", service.create(request)));
    }

    @GetMapping
    @Operation(summary = "Lấy danh sách bộ môn")
    public ResponseEntity<ApiResponse<List<DisciplineResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách bộ môn thành công", service.getAll()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy chi tiết bộ môn")
    public ResponseEntity<ApiResponse<DisciplineResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Lấy bộ môn thành công", service.getById(id)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Cập nhật bộ môn")
    public ResponseEntity<ApiResponse<DisciplineResponse>> update(@PathVariable Long id, @Valid @RequestBody DisciplineRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật bộ môn thành công", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa bộ môn", description = "Không cho xóa nếu đang được classes tham chiếu")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa bộ môn thành công", null));
    }
}
