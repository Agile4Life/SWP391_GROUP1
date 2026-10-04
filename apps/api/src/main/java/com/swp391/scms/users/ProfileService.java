package com.swp391.scms.users;

import com.swp391.scms.common.exception.ConflictException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
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

    @Transactional(readOnly = true)
    public ProfileDto getProfile(Long userId) {
        User user = findActiveUser(userId);
        Member member = memberRepository.findById(userId).orElse(null);
        return toDto(user, member);
    }

    @Transactional
    public ProfileDto updateProfile(Long userId, ProfileDto request) {
        User user = findActiveUser(userId);
        user.setFullName(request.fullName());
        if (request.phone() != null) {
            String phone = request.phone().isBlank() ? null : request.phone().trim();
            if (phone != null) {
                userRepository.findByPhone(phone)
                        .filter(existing -> !existing.getId().equals(userId))
                        .ifPresent(existing -> { throw new ConflictException("PHONE_EXISTS", "users.phone_exists", null, null); });
            }
            user.setPhone(phone);
        }
        user.setDob(request.dob());
        user.setGender(request.gender());
        user.setAvatarUrl(request.avatarUrl());
        user.setAddress(request.address());

        Member member = memberRepository.findById(userId).orElse(null);
        if (member != null) {
            member.setHealthNotes(request.healthNotes());
            member.setFitnessGoal(request.fitnessGoal());
            if (request.fitnessLevel() != null) {
                member.setFitnessLevel(request.fitnessLevel());
            }
            member.setEmergencyContactName(request.emergencyContactName());
            member.setEmergencyContactPhone(request.emergencyContactPhone());
        }

        return toDto(user, member);
    }

    private User findActiveUser(Long userId) {
        return userRepository.findByIdAndDeletedAtIsNull(userId)
                .orElseThrow(() -> new ResourceNotFoundException("resource.user", userId));
    }

    private ProfileDto toDto(User user, Member member) {
        return new ProfileDto(
                user.getId(), user.getFullName(), user.getEmail(), user.getPhone(), user.getDob(),
                user.getGender(), user.getAvatarUrl(), user.getAddress(),
                member != null ? member.getMembershipCode() : null,
                member != null ? member.getHealthNotes() : null,
                member != null ? member.getFitnessGoal() : null,
                member != null ? member.getFitnessLevel() : null,
                member != null ? member.getEmergencyContactName() : null,
                member != null ? member.getEmergencyContactPhone() : null
        );
    }
}