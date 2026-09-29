package com.swp391.scms.users;

import com.swp391.scms.common.api.ApiError;
import com.swp391.scms.users.dto.ProfileDto;
import com.swp391.scms.users.entity.Member;
import com.swp391.scms.users.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final MemberRepository memberRepository;

    public ProfileService(UserRepository userRepository, MemberRepository memberRepository) {
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional(readOnly = false)
    public ProfileDto getProfile(Long userId) {
        User user = userRepository.findById(userId).orElseGet(() -> {
            // Tự động tạo user giả để test nếu chưa có trong Database
            User newUser = new User();
            newUser.setId(userId);
            newUser.setFullName("Member Test Auto");
            newUser.setEmail("member1@example.com");
            newUser.setCreatedAt(java.time.LocalDateTime.now());
            return userRepository.save(newUser);
        });
                
        Member member = memberRepository.findById(userId).orElse(null);
        
        return new ProfileDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getDob(),
                user.getGender(),
                user.getAvatarUrl(),
                user.getAddress(),
                member != null ? member.getMembershipCode() : null,
                member != null ? member.getHealthNotes() : null,
                member != null ? member.getFitnessGoal() : null,
                member != null ? member.getFitnessLevel() : null,
                member != null ? member.getEmergencyContactName() : null,
                member != null ? member.getEmergencyContactPhone() : null
        );
    }

    @Transactional
    public ProfileDto updateProfile(Long userId, ProfileDto request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        user.setFullName(request.fullName());
        user.setDob(request.dob());
        user.setGender(request.gender());
        user.setAvatarUrl(request.avatarUrl());
        user.setAddress(request.address());
        // Email and phone might need OTP validation, but for profile update we just set them if allowed.
        userRepository.save(user);

        Member member = memberRepository.findById(userId).orElse(null);
        if (member != null) {
            member.setHealthNotes(request.healthNotes());
            member.setFitnessGoal(request.fitnessGoal());
            if (request.fitnessLevel() != null) {
                member.setFitnessLevel(request.fitnessLevel());
            }
            member.setEmergencyContactName(request.emergencyContactName());
            member.setEmergencyContactPhone(request.emergencyContactPhone());
            memberRepository.save(member);
        }

        return getProfile(userId);
    }
}
