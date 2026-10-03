package com.swp391.scms.us06.f04.controller;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.us06.f04.dto.MembershipPackageRequest;
import com.swp391.scms.us06.f04.dto.MembershipPackageResponse;
import com.swp391.scms.us06.f04.service.MembershipPackageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/membership-packages")
@Tag(name = "US06-F04 Package API", description = "CRUD và trạng thái gói dịch vụ")
public class MembershipPackageController {
    private final MembershipPackageService service;
    public MembershipPackageController(MembershipPackageService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<ApiResponse<MembershipPackageResponse>> create(@Valid @RequestBody MembershipPackageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.created("Tạo gói dịch vụ thành công", service.create(request)));
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<MembershipPackageResponse>>> getAll() { return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách gói thành công", service.getAll())); }
    @GetMapping("/available")
    @Operation(summary = "Danh sách gói đang bán", description = "Chỉ trả các package có status=active để mua mới")
    public ResponseEntity<ApiResponse<List<MembershipPackageResponse>>> getAvailable() { return ResponseEntity.ok(ApiResponse.ok("Lấy gói đang bán thành công", service.getAvailableForPurchase())); }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MembershipPackageResponse>> getById(@PathVariable Long id) { return ResponseEntity.ok(ApiResponse.ok("Lấy gói thành công", service.getById(id))); }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MembershipPackageResponse>> update(@PathVariable Long id, @Valid @RequestBody MembershipPackageRequest request) { return ResponseEntity.ok(ApiResponse.ok("Cập nhật gói thành công", service.update(id, request))); }
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<MembershipPackageResponse>> deactivate(@PathVariable Long id) { return ResponseEntity.ok(ApiResponse.ok("Gói đã chuyển sang inactive", service.deactivate(id))); }
    @DeleteMapping("/{id}")
    @Operation(summary = "Ngừng bán gói", description = "Không hard delete; chuyển package sang inactive để giữ lịch sử subscription")
    public ResponseEntity<ApiResponse<MembershipPackageResponse>> delete(@PathVariable Long id) { return ResponseEntity.ok(ApiResponse.ok("Gói đã được chuyển sang inactive thay vì xóa", service.deactivate(id))); }
    @GetMapping("/{id}/subscription-usage")
    public ResponseEntity<ApiResponse<Boolean>> hasSubscriptions(@PathVariable Long id) { return ResponseEntity.ok(ApiResponse.ok("Kiểm tra lịch sử subscription thành công", service.hasSubscriptions(id))); }
}
