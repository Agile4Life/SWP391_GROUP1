package com.swp391.scms.users;

import com.swp391.scms.common.ErrorResponse;
import com.swp391.scms.users.dto.UserCreateDto;
import com.swp391.scms.users.dto.UserDto;
import com.swp391.scms.users.dto.UserUpdateDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Object> getAllUsers() {
        return ResponseEntity.ok(Map.of(
            "message", "Lấy danh sách thành công",
            "data", userService.getAllUsers()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(Map.of(
                "message", "Lấy chi tiết thành công",
                "data", userService.getUserById(id)
            ));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ErrorResponse(404, "NOT_FOUND", e.getMessage(), null));
        }
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@Valid @RequestBody UserCreateDto dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Tạo người dùng thành công",
                "data", userService.createUser(dto)
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(400, "INVALID_INPUT", e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateDto dto) {
        try {
            return ResponseEntity.ok(Map.of(
                "message", "Cập nhật thành công",
                "data", userService.updateUser(id, dto)
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(400, "INVALID_INPUT", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ErrorResponse(404, "NOT_FOUND", e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "Xóa người dùng thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ErrorResponse(404, "NOT_FOUND", e.getMessage(), null));
        }
    }

    @PatchMapping("/{id}/lock")
    public ResponseEntity<Object> lockUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(Map.of(
                "message", "Khóa tài khoản thành công",
                "data", userService.setStatus(id, "locked")
            ));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ErrorResponse(404, "NOT_FOUND", e.getMessage(), null));
        }
    }

    @PatchMapping("/{id}/unlock")
    public ResponseEntity<Object> unlockUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(Map.of(
                "message", "Mở khóa tài khoản thành công",
                "data", userService.setStatus(id, "active")
            ));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ErrorResponse(404, "NOT_FOUND", e.getMessage(), null));
        }
    }
}
