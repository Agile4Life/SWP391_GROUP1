package com.swp391.scms.users.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record ProfileDto(
    Long userId,
    @NotBlank(message = "{validation.users.full_name.not_blank}")
    String fullName,
    @Email(message = "{validation.users.email.invalid}")
    String email,
    String phone,
    LocalDate dob,
    String gender,
    String avatarUrl,
    String address,
    String membershipCode,
    String healthNotes,
    String fitnessGoal,
    String fitnessLevel,
    String emergencyContactName,
    String emergencyContactPhone
) {}
