package com.swp391.scms.us06.f03.controller;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.us06.f03.dto.RoomRequest;
import com.swp391.scms.us06.f03.dto.RoomResponse;
import com.swp391.scms.us06.f03.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@Tag(name = "US06-F03 Room API", description = "CRUD phòng tập và quản lý trạng thái")
public class RoomController {
    private final RoomService service;
    public RoomController(RoomService service) { this.service = service; }

    @PostMapping
    @Operation(summary = "Tạo phòng")
    public ResponseEntity<ApiResponse<RoomResponse>> create(@Valid @RequestBody RoomRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created("Tạo phòng thành công", service.create(request)));
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getAll() { return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách phòng thành công", service.getAll())); }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomResponse>> getById(@PathVariable Long id) { return ResponseEntity.ok(ApiResponse.ok("Lấy phòng thành công", service.getById(id))); }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomResponse>> update(@PathVariable Long id, @Valid @RequestBody RoomRequest request) { return ResponseEntity.ok(ApiResponse.ok("Cập nhật phòng thành công", service.update(id, request))); }
    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa phòng", description = "Không cho xóa nếu đang được classes tham chiếu")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok(ApiResponse.ok("Xóa phòng thành công", null)); }
    @GetMapping("/{id}/availability")
    @Operation(summary = "Kiểm tra phòng có thể xếp lớp mới")
    public ResponseEntity<ApiResponse<Boolean>> canSchedule(@PathVariable Long id) { return ResponseEntity.ok(ApiResponse.ok("Kiểm tra trạng thái phòng thành công", service.canScheduleNewClass(id))); }
}
