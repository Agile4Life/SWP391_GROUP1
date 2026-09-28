package com.swp391.scms.users;

import com.swp391.scms.common.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<Object> getAllRoles() {
        return ResponseEntity.ok(Map.of(
            "message", "Lấy danh sách roles thành công",
            "data", roleService.getAllRoles()
        ));
    }

    @GetMapping("/permissions")
    public ResponseEntity<Object> getAllPermissions() {
        return ResponseEntity.ok(Map.of(
            "message", "Lấy danh sách permissions thành công",
            "data", roleService.getAllPermissions()
        ));
    }

    @GetMapping("/{id}/permissions")
    public ResponseEntity<Object> getPermissionsByRoleId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(Map.of(
                "message", "Lấy danh sách permissions của role thành công",
                "data", roleService.getPermissionsByRoleId(id)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ErrorResponse(404, "NOT_FOUND", e.getMessage(), null));
        }
    }
}
