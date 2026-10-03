package com.swp391.scms.us06.f02.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DisciplineRequest(
        @NotBlank(message = "Tên bộ môn không được để trống")
        @Size(max = 100, message = "Tên bộ môn tối đa 100 ký tự")
        String name,
        String description
) {}
