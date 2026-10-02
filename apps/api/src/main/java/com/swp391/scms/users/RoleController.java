package com.swp391.scms.users;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "Users & RBAC", description = "Quản lý vai trò và phân quyền ma trận RBAC")
@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @Operation(summary = "Lấy danh sách vai trò", description = "Danh sách tất cả vai trò (Role) trong hệ thống")
    @GetMapping
    public ResponseEntity<Object> getAllRoles() {
        return ResponseEntity.ok(Map.of("message", "Lấy danh sách roles thành công", "data", roleService.getAllRoles()));
    }

    @Operation(summary = "Lấy danh sách quyền hạn", description = "Danh sách tất cả quyền (Permission) trong hệ thống")
    @GetMapping("/permissions")
    public ResponseEntity<Object> getAllPermissions() {
        return ResponseEntity.ok(Map.of("message", "Lấy danh sách permissions thành công", "data", roleService.getAllPermissions()));
    }

    @Operation(summary = "Lấy danh sách quyền theo Role ID", description = "Xem chi tiết ma trận phân quyền của một vai trò cụ thể")
    @GetMapping("/{id}/permissions")
    public ResponseEntity<Object> getPermissionsByRoleId(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of(
                "message", "Lấy danh sách permissions của role thành công",
                "data", roleService.getPermissionsByRoleId(id)));
    }
}