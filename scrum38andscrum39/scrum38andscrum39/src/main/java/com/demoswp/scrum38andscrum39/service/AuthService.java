package com.demoswp.scrum38andscrum39.service;

import com.demoswp.scrum38andscrum39.dto.RegisterRequest;
import com.demoswp.scrum38andscrum39.dto.RegisterResponse;
import com.demoswp.scrum38andscrum39.entity.Member;
import com.demoswp.scrum38andscrum39.entity.User;
import com.demoswp.scrum38andscrum39.exception.DuplicateResourceException;
import com.demoswp.scrum38andscrum39.repository.MemberRepository;
import com.demoswp.scrum38andscrum39.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            MemberRepository memberRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        validateRegisterRequest(request);

        String email = request.getEmail().trim().toLowerCase();
        String phone = request.getPhone().trim();
        String password = request.getPassword();


        //F03: Kiểm tra email đã tồn tại chưa.
        if (userRepository.existsByEmail(email)) {

            User existingUser = userRepository
                    .findByEmail(email)
                    .orElse(null);

            //Account đã tồn tại nhưng chưa ACTIVE.
            if (existingUser != null
                    && "INACTIVE".equalsIgnoreCase(existingUser.getStatus())) {

                throw new DuplicateResourceException(
                        "Email already exists and account is not active"
                );
            }

            throw new DuplicateResourceException(
                    "Email already exists"
            );
        }

        //Kiểm tra phone đã tồn tại chưa.
        if (userRepository.existsByPhone(phone)) {

            User existingUser = userRepository
                    .findByPhone(phone)
                    .orElse(null);

            if (existingUser != null
                    && "INACTIVE".equalsIgnoreCase(existingUser.getStatus())) {

                throw new DuplicateResourceException(
                        "Phone already exists and account is not active"
                );
            }

            throw new DuplicateResourceException(
                    "Phone already exists"
            );
        }

        //TẠO USER
        User user = new User();

        user.setEmail(email);
        user.setPhone(phone);

        //Không lưu password dạng plaintext.
        String hashedPassword = passwordEncoder.encode(password);

        user.setPassword(hashedPassword);

        //Tài khoản tự đăng ký luôn có role MEMBER.
        user.setRole("MEMBER");

        //Chưa verify OTP => INACTIVE.
        user.setStatus("INACTIVE");

        User savedUser = userRepository.save(user);

        //TẠO MEMBER
        Member member = new Member();

        member.setUser(savedUser);

        memberRepository.save(member);

        //OTP - US03
        return new RegisterResponse(
                "Registration successful. Please verify OTP.",
                savedUser.getUserId(),
                savedUser.getEmail(),
                savedUser.getPhone(),
                savedUser.getStatus(),
                savedUser.getRole()
        );
    }

    private void validateRegisterRequest(RegisterRequest request) {

        if (request == null) {
            throw new IllegalArgumentException(
                    "Request body cannot be null"
            );
        }

        if (request.getEmail() == null
                || request.getEmail().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Email is required"
            );
        }

        if (request.getPhone() == null
                || request.getPhone().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Phone is required"
            );
        }

        if (request.getPassword() == null
                || request.getPassword().isEmpty()) {

            throw new IllegalArgumentException(
                    "Password is required"
            );
        }

        if (!request.getEmail().matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {

            throw new IllegalArgumentException(
                    "Invalid email format"
            );
        }

        if (!request.getPhone().matches(
                "^[0-9]{10,11}$")) {

            throw new IllegalArgumentException(
                    "Invalid phone format"
            );
        }

        if (request.getPassword().length() < 6) {

            throw new IllegalArgumentException(
                    "Password must contain at least 6 characters"
            );
        }
    }
}