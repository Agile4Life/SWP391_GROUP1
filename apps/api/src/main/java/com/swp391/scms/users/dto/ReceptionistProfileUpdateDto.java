package com.swp391.scms.users.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ReceptionistProfileUpdateDto(
    @NotNull(message = "{validation.users.id.not_null}")
    Long userId,
    
    @Size(max = 50, message = "{validation.users.receptionist.shift.max}")
    String shift
) {}