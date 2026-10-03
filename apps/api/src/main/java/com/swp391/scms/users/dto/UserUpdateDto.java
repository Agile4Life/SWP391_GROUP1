package com.swp391.scms.users.dto;

import jakarta.validation.constraints.Size;

public class UserUpdateDto {
    @Size(max = 150, message = "{validation.users.full_name.size}")
    private String fullName;

    @Size(max = 20, message = "{validation.users.phone.size}")
    private String phone;

    private Long roleId;

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }
}
