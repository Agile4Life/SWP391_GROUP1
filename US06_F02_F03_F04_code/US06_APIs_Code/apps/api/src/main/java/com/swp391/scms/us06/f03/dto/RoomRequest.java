package com.swp391.scms.us06.f03.dto;

import jakarta.validation.constraints.*;

public record RoomRequest(
        @NotBlank(message = "Tên phòng không được để trống")
        @Size(max = 100, message = "Tên phòng tối đa 100 ký tự")
        String name,
        @Size(max = 150, message = "Vị trí tối đa 150 ký tự")
        String location,
        @NotNull(message = "Sức chứa không được để trống")
        @Min(value = 1, message = "Sức chứa phải lớn hơn 0")
        Integer capacity,
        @NotBlank(message = "Status không được để trống")
        String status
) {}
