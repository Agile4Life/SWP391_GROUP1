package com.swp391.scms.us05f04.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface F04Repository extends Repository<Object, Long> {

    /*
     * ============================================================
     * 1. KIỂM TRA COACH CÓ QUYỀN XEM MEMBER HAY KHÔNG
     *
     * Chỉ cho phép nếu:
     * - Coach đang dạy class đó
     * - Member đang booked class đó
     * - Class đang active
     */
    @Query(value = """
            SELECT COUNT(*)
            FROM dbo.classes c
            INNER JOIN dbo.class_enrollments ce
                ON ce.class_id = c.id
            INNER JOIN dbo.coaches co
                ON co.user_id = c.coach_id
            INNER JOIN dbo.members m
                ON m.user_id = ce.member_id
            WHERE c.coach_id = :coachId
              AND ce.member_id = :memberId
              AND ce.status = 'booked'
              AND c.status = 'active'
            """, nativeQuery = true)
    long countCoachMemberAccess(
            @Param("coachId") Long coachId,
            @Param("memberId") Long memberId
    );


    /*
     * ============================================================
     * 2. LẤY HỒ SƠ SỨC KHỎE CỦA MEMBER
     *
     * Database KHÔNG có health_profiles.
     *
     * Thông tin sức khỏe hiện tại nằm trong dbo.members:
     * - health_notes
     * - fitness_goal
     * - fitness_level
     *
     * Thông tin cá nhân nằm trong dbo.users:
     * - full_name
     * - gender
     * - dob
     */
    @Query(value = """
            SELECT
                m.user_id AS memberId,
                u.full_name AS fullName,
                u.gender AS gender,
                u.dob AS dateOfBirth,
                m.health_notes AS healthNotes,
                m.fitness_goal AS fitnessGoal,
                m.fitness_level AS fitnessLevel
            FROM dbo.members m
            INNER JOIN dbo.users u
                ON u.id = m.user_id
            WHERE m.user_id = :memberId
            """, nativeQuery = true)
    Optional<F04HealthProfileProjection> findHealthProfile(
            @Param("memberId") Long memberId
    );


    /*
     * Projection dùng để nhận kết quả từ native query.
     */
    interface F04HealthProfileProjection {

        Long getMemberId();

        String getFullName();

        String getGender();

        java.sql.Date getDateOfBirth();

        String getHealthNotes();

        String getFitnessGoal();

        String getFitnessLevel();
    }
}