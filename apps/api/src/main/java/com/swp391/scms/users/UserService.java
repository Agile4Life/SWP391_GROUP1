package com.swp391.scms.users;

import com.swp391.scms.users.dto.UserCreateDto;
import com.swp391.scms.users.dto.UserDto;
import com.swp391.scms.users.dto.UserUpdateDto;
import com.swp391.scms.users.entity.Role;
import com.swp391.scms.users.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setRoleCode(user.getRole().getCode());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setDob(user.getDob());
        dto.setGender(user.getGender());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setAddress(user.getAddress());
        dto.setStatus(user.getStatus());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLoginAt(user.getLastLoginAt());
        return dto;
    }

    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .filter(u -> u.getDeletedAt() == null) // Bỏ qua những user đã bị soft delete
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .filter(u -> u.getDeletedAt() == null)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng hoặc đã bị xóa"));
        return mapToDto(user);
    }

    @Transactional
    public UserDto createUser(UserCreateDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }
        if (dto.getPhone() != null && userRepository.findByPhone(dto.getPhone()).isPresent()) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại");
        }

        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Role không tồn tại"));

        User user = new User();
        user.setRole(role);
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        user.setStatus("active");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return mapToDto(userRepository.save(user));
    }

    @Transactional
    public UserDto updateUser(Long id, UserUpdateDto dto) {
        User user = userRepository.findById(id)
                .filter(u -> u.getDeletedAt() == null)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng hoặc đã bị xóa"));

        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getPhone() != null) {
            userRepository.findByPhone(dto.getPhone()).ifPresent(existing -> {
                if (!existing.getId().equals(id)) throw new IllegalArgumentException("Số điện thoại đã tồn tại");
            });
            user.setPhone(dto.getPhone());
        }
        if (dto.getRoleId() != null) {
            Role role = roleRepository.findById(dto.getRoleId())
                    .orElseThrow(() -> new IllegalArgumentException("Role không tồn tại"));
            user.setRole(role);
        }

        return mapToDto(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .filter(u -> u.getDeletedAt() == null)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng hoặc đã bị xóa"));
        
        user.setDeletedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public UserDto setStatus(Long id, String status) {
        if (!"active".equals(status) && !"locked".equals(status)) {
            throw new IllegalArgumentException("Trạng thái không hợp lệ. Chỉ nhận 'active' hoặc 'locked'");
        }
        User user = userRepository.findById(id)
                .filter(u -> u.getDeletedAt() == null)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng hoặc đã bị xóa"));
        
        user.setStatus(status);
        return mapToDto(userRepository.save(user));
    }
}
