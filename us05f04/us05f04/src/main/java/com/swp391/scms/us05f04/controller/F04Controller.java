package com.swp391.scms.us05f04.controller;

import com.swp391.scms.us05f04.dto.F04HealthProfileDto;
import com.swp391.scms.us05f04.service.F04Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/us05/f04")
public class F04Controller {

    private final F04Service f04Service;

    public F04Controller(F04Service f04Service) {
        this.f04Service = f04Service;
    }

    @GetMapping("/members/{memberId}/health-profile")
    public ResponseEntity<F04HealthProfileDto> getMemberHealthProfile(
            @PathVariable Long memberId,
            @RequestParam Long coachId
    ) {

        F04HealthProfileDto profile =
                f04Service.getMemberHealthProfile(
                        memberId,
                        coachId
                );

        return ResponseEntity.ok(profile);
    }
}