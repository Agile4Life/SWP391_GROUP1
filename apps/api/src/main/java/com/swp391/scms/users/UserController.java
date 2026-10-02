package com.swp391.scms.users;

import com.swp391.scms.users.dto.UserCreateDto;
import com.swp391.scms.users.dto.UserUpdateDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "Users & RBAC", description = "Quản trị người dùng, trạng thái khóa/mở khóa và phân quyền vai trò")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Lấy danh sách người dùng", description = "Trả về danh sách tất cả người dùng chưa bị xóa mềm")
    @GetMapping
    public ResponseEntity<Object> getAllUsers() {
        return ResponseEntity.ok(Map.of("message", "Lấy danh sách thành công", "data", userService.getAllUsers()));
    }

    @Operation(summary = "Xem chi tiết người dùng", description = "Lấy thông tin người dùng theo User ID")
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "Lấy chi tiết thành công", "data", userService.getUserById(id)));
    }

    @Operation(summary = "Tạo mới người dùng", description = "Tạo tài khoản người dùng mới kèm vai trò")
    @PostMapping
    public ResponseEntity<Object> createUser(@Valid @RequestBody UserCreateDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Tạo người dùng thành công", "data", userService.createUser(dto)));
    }

    @Operation(summary = "Cập nhật người dùng", description = "Cập nhật thông tin tài khoản người dùng theo ID")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateDto dto) {
        return ResponseEntity.ok(Map.of("message", "Cập nhật thành công", "data", userService.updateUser(id, dto)));
    }

    @Operation(summary = "Xóa mềm người dùng", description = "Đánh dấu xóa mềm người dùng (deleted_at)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "Xóa người dùng thành công"));
    }

    @Operation(summary = "Khóa tài khoản", description = "Chuyển trạng thái người dùng sang 'locked'")
    @PatchMapping("/{id}/lock")
    public ResponseEntity<Object> lockUser(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "Khóa tài khoản thành công", "data", userService.setStatus(id, "locked")));
    }

    @Operation(summary = "Mở khóa tài khoản", description = "Chuyển trạng thái người dùng sang 'active'")
    @PatchMapping("/{id}/unlock")
    public ResponseEntity<Object> unlockUser(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "Mở khóa tài khoản thành công", "data", userService.setStatus(id, "active")));
    }
}