package com.swp391.scms.us05f04.dto;

import java.time.LocalDate;

public class F04HealthProfileDto {

    private Long memberId;
    private String fullName;
    private String gender;
    private LocalDate dateOfBirth;
    private String healthNotes;
    private String fitnessGoal;
    private String fitnessLevel;

    public F04HealthProfileDto() {
    }

    public F04HealthProfileDto(
            Long memberId,
            String fullName,
            String gender,
            LocalDate dateOfBirth,
            String healthNotes,
            String fitnessGoal,
            String fitnessLevel
    ) {
        this.memberId = memberId;
        this.fullName = fullName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.healthNotes = healthNotes;
        this.fitnessGoal = fitnessGoal;
        this.fitnessLevel = fitnessLevel;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getHealthNotes() {
        return healthNotes;
    }

    public void setHealthNotes(String healthNotes) {
        this.healthNotes = healthNotes;
    }

    public String getFitnessGoal() {
        return fitnessGoal;
    }

    public void setFitnessGoal(String fitnessGoal) {
        this.fitnessGoal = fitnessGoal;
    }

    public String getFitnessLevel() {
        return fitnessLevel;
    }

    public void setFitnessLevel(String fitnessLevel) {
        this.fitnessLevel = fitnessLevel;
    }
}