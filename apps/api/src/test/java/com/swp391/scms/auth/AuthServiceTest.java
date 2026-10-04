package com.swp391.scms.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.swp391.scms.common.exception.BadRequestException;
import com.swp391.scms.common.exception.ConflictException;
import com.swp391.scms.common.exception.TooManyRequestsException;
import com.swp391.scms.security.JwtService;
import com.swp391.scms.users.RoleRepository;
import com.swp391.scms.users.UserRepository;
import com.swp391.scms.users.entity.User;
import java.time.Clock;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock UserRepository userRepository;
    @Mock RoleRepository roleRepository;
    @Mock PasswordEncoder passwordEncoder;
    @Mock JwtService jwtService;
    @Mock OtpService otpService;
    @Mock OtpDeliveryPort otpDeliveryPort;
    private AuthService service;

    @BeforeEach
    void setUp() {
        service = new AuthService(userRepository, roleRepository, passwordEncoder, jwtService, otpService,
                otpDeliveryPort, Clock.systemUTC(), false);
    }

    private User pendingUser() {
        User user = new User();
        user.setEmail("a@b.com");
        user.setStatus("inactive");
        return user;
    }

    @Test
    void registerRejectsDuplicateEmail() {
        when(userRepository.findByUsernameIgnoreCase("newuser")).thenReturn(Optional.empty());
        when(userRepository.findByEmailIgnoreCase("a@b.com")).thenReturn(Optional.of(new User()));

        assertThrows(ConflictException.class,
                () -> service.register(new RegisterRequest("newuser", "secret1", "a@b.com", null)));
        verify(userRepository, org.mockito.Mockito.never()).saveAndFlush(any());
    }

    @Test
    void registerRejectsDuplicateUsername() {
        when(userRepository.findByUsernameIgnoreCase("taken")).thenReturn(Optional.of(new User()));

        assertThrows(ConflictException.class,
                () -> service.register(new RegisterRequest("taken", "secret1", "x@y.com", null)));
    }

    @Test
    void registerRejectsDuplicatePhone() {
        when(userRepository.findByUsernameIgnoreCase("newuser")).thenReturn(Optional.empty());
        when(userRepository.findByEmailIgnoreCase("a@b.com")).thenReturn(Optional.empty());
        when(userRepository.findByPhone("0912345678")).thenReturn(Optional.of(new User()));

        assertThrows(ConflictException.class,
                () -> service.register(new RegisterRequest("newuser", "secret1", "a@b.com", "0912345678", null)));
        verify(userRepository, org.mockito.Mockito.never()).saveAndFlush(any());
    }

    @Test
    void verifyOtpActivatesPendingAccount() {
        User user = pendingUser();
        when(otpService.verifyOtp("a@b.com", "123456"))
                .thenReturn(new OtpService.Status(OtpService.VerifyResult.SUCCESS, 0));
        when(userRepository.findByEmailIgnoreCaseAndDeletedAtIsNull("a@b.com")).thenReturn(Optional.of(user));

        service.verifyOtp(new VerifyOtpRequest("a@b.com", "123456"));

        assertEquals("active", user.getStatus());
        verify(userRepository).save(user);
    }

    @Test
    void verifyOtpMapsExpiredToBadRequest() {
        when(otpService.verifyOtp("a@b.com", "123456"))
                .thenReturn(new OtpService.Status(OtpService.VerifyResult.EXPIRED_OR_NOT_FOUND, 0));

        assertThrows(BadRequestException.class, () -> service.verifyOtp(new VerifyOtpRequest("a@b.com", "123456")));
    }

    @Test
    void verifyOtpMapsInvalidCodeToBadRequest() {
        when(otpService.verifyOtp("a@b.com", "000000"))
                .thenReturn(new OtpService.Status(OtpService.VerifyResult.INVALID_CODE, 2));

        assertThrows(BadRequestException.class, () -> service.verifyOtp(new VerifyOtpRequest("a@b.com", "000000")));
    }

    @Test
    void verifyOtpMapsLockoutToTooManyRequests() {
        when(otpService.verifyOtp("a@b.com", "000000"))
                .thenReturn(new OtpService.Status(OtpService.VerifyResult.MAX_ATTEMPTS_EXCEEDED, 0));

        assertThrows(TooManyRequestsException.class, () -> service.verifyOtp(new VerifyOtpRequest("a@b.com", "000000")));
    }

    @Test
    void generateOtpRejectsAccountThatIsNotPending() {
        User active = pendingUser();
        active.setStatus("active");
        when(userRepository.findByEmailIgnoreCaseAndDeletedAtIsNull("a@b.com")).thenReturn(Optional.of(active));

        assertThrows(BadRequestException.class, () -> service.generateOtp("a@b.com"));
    }
}