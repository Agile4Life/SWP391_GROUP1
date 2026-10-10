package com.swp391.scms.attendance.repository;
<<<<<<< Updated upstream
import com.swp391.scms.attendance.entity.CenterCheckin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
public interface CenterCheckinRepository extends JpaRepository<CenterCheckin, Long> {
    List<CenterCheckin> findByCheckInTimeGreaterThanEqualAndCheckInTimeLessThanOrderByCheckInTimeDesc(LocalDateTime start, LocalDateTime end);
    Optional<CenterCheckin> findFirstByMemberUserIdAndCheckOutTimeIsNullOrderByCheckInTimeDesc(Long memberId);
=======

import com.swp391.scms.attendance.entity.CenterCheckin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CenterCheckinRepository extends JpaRepository<CenterCheckin, Long> {

    boolean existsByMemberUserIdAndCheckOutTimeIsNull(Long memberId);

    List<CenterCheckin> findByCheckInTimeGreaterThanEqualAndCheckInTimeLessThanOrderByCheckInTimeDesc(
            LocalDateTime start, LocalDateTime end);
>>>>>>> Stashed changes
}
