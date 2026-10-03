package com.swp391.scms.us05f04.service;

import com.swp391.scms.us05f04.dto.F04HealthProfileDto;
import com.swp391.scms.us05f04.exception.F04AccessDeniedException;
import com.swp391.scms.us05f04.repository.F04Repository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;

@Service
public class F04Service {

    private final F04Repository f04Repository;

    public F04Service(F04Repository f04Repository) {
        this.f04Repository = f04Repository;
    }

    public F04HealthProfileDto getMemberHealthProfile(
            Long memberId,
            Long coachId
    ) {

        // =========================================================
        // 1. Validate ID
        // =========================================================

        if (memberId == null || memberId <= 0) {
            throw new IllegalArgumentException(
                    "Member ID không hợp lệ"
            );
        }

        if (coachId == null || coachId <= 0) {
            throw new IllegalArgumentException(
                    "Coach ID không hợp lệ"
            );
        }


        // =========================================================
        // 2. KIỂM TRA QUYỀN TRUY CẬP
        // =========================================================

        long count = f04Repository.countCoachMemberAccess(
                coachId,
                memberId
        );

        if (count == 0) {
            throw new F04AccessDeniedException(
                    "Coach không có quyền xem hồ sơ của Member này"
            );
        }


        // =========================================================
        // 3. Lấy thông tin Member
        // =========================================================

        F04Repository.F04HealthProfileProjection profile =
                f04Repository.findHealthProfile(memberId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Không tìm thấy Member"
                                )
                        );


        // =========================================================
        // 4. SERVER-SIDE VALIDATION
        // =========================================================

        validateFitnessLevel(
                profile.getFitnessLevel()
        );


        // =========================================================
        // 5. Convert database result -> DTO
        // =========================================================

        F04HealthProfileDto dto =
                new F04HealthProfileDto();

        dto.setMemberId(
                profile.getMemberId()
        );

        dto.setFullName(
                profile.getFullName()
        );

        dto.setGender(
                profile.getGender()
        );

        Date sqlDate =
                profile.getDateOfBirth();

        if (sqlDate != null) {
            dto.setDateOfBirth(
                    sqlDate.toLocalDate()
            );
        }

        dto.setHealthNotes(
                profile.getHealthNotes()
        );

        dto.setFitnessGoal(
                profile.getFitnessGoal()
        );

        dto.setFitnessLevel(
                profile.getFitnessLevel()
        );

        return dto;
    }


    // =============================================================
    // SERVER-SIDE FITNESS LEVEL VALIDATION
    // =============================================================

    private void validateFitnessLevel(
            String fitnessLevel
    ) {

        if (fitnessLevel == null
                || fitnessLevel.isBlank()) {

            throw new IllegalArgumentException(
                    "fitness_level không được để trống"
            );
        }

        if (!fitnessLevel.equals("beginner")
                && !fitnessLevel.equals("intermediate")
                && !fitnessLevel.equals("advanced")) {

            throw new IllegalArgumentException(
                    "fitness_level không hợp lệ: "
                            + fitnessLevel
            );
        }
    }
}