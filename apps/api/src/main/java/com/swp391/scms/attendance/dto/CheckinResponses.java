package com.swp391.scms.attendance.dto;
<<<<<<< Updated upstream
import java.time.LocalDateTime;
public final class CheckinResponses {
    private CheckinResponses() {}
    public record CheckinDto(Long id, Long memberId, String memberName, LocalDateTime checkInTime,
                             LocalDateTime checkOutTime, String method, String gate, String status) {}
=======

import java.time.LocalDateTime;

public final class CheckinResponses {

    private CheckinResponses() {}

    public record CheckinDto(
            Long id,
            Long memberId,
            String memberName,
            LocalDateTime checkInTime,
            LocalDateTime checkOutTime,
            String method,
            String gate,
            String status
    ) {}
>>>>>>> Stashed changes
}
