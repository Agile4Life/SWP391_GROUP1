package com.swp391.scms.users;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp391.scms.common.GlobalExceptionHandler;
import com.swp391.scms.security.AuthenticatedPrincipal;
import com.swp391.scms.users.dto.ProfileDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ProfileControllerTest {

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @Mock
    private ProfileService profileService;

    @InjectMocks
    private ProfileController profileController;

    private final HandlerMethodArgumentResolver principalResolver = new HandlerMethodArgumentResolver() {
        @Override
        public boolean supportsParameter(MethodParameter parameter) {
            return parameter.getParameterType().isAssignableFrom(AuthenticatedPrincipal.class);
        }

        @Override
        public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                      NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
            return new AuthenticatedPrincipal(101L, "member1", "MEMBER");
        }
    };

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
        mockMvc = MockMvcBuilders.standaloneSetup(profileController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .setCustomArgumentResolvers(principalResolver)
                .build();
    }

    private ProfileDto sampleProfile() {
        return new ProfileDto(
                101L,
                "Nguyen Van A",
                "a@gmail.com",
                "0912345678",
                LocalDate.of(1990, 1, 1),
                "MALE",
                null,
                "Hanoi",
                "MB-001",
                "None",
                "Stay healthy",
                "INTERMEDIATE",
                "Nguyen Van B",
                "0987654321"
        );
    }

    @Test
    @DisplayName("GET /api/v1/profile returns current authenticated user profile")
    void getMyProfileSuccess() throws Exception {
        when(profileService.getProfile(101L)).thenReturn(sampleProfile());

        mockMvc.perform(get("/api/v1/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.fullName").value("Nguyen Van A"));
    }

    @Test
    @DisplayName("PUT /api/v1/profile updates profile and returns 200")
    void updateMyProfileSuccess() throws Exception {
        ProfileDto request = sampleProfile();
        when(profileService.updateProfile(eq(101L), any())).thenReturn(request);

        mockMvc.perform(put("/api/v1/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.fitnessGoal").value("Stay healthy"));
    }

    @Test
    @DisplayName("PUT /api/v1/profile/coach updates coach profile and returns 200")
    void updateCoachProfileSuccess() throws Exception {
        com.swp391.scms.users.dto.CoachProfileUpdateDto request = new com.swp391.scms.users.dto.CoachProfileUpdateDto(
                "Yoga",
                "10 years experience",
                "Certified Yoga Instructor"
        );

        mockMvc.perform(put("/api/v1/profile/coach")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("PUT /api/v1/profile/coach returns 403 when wrong role")
    void updateCoachProfileForbidden() throws Exception {
        com.swp391.scms.users.dto.CoachProfileUpdateDto request = new com.swp391.scms.users.dto.CoachProfileUpdateDto(
                "Yoga",
                "10 years experience",
                "Certified Yoga Instructor"
        );
        
        org.mockito.Mockito.doThrow(new com.swp391.scms.common.exception.ForbiddenException("Error", "users.forbidden.not_coach"))
                .when(profileService).updateCoachProfile(eq(101L), eq("MEMBER"), any());

        mockMvc.perform(put("/api/v1/profile/coach")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("PUT /api/v1/profile/receptionist updates receptionist profile and returns 200")
    void updateReceptionistProfileSuccess() throws Exception {
        com.swp391.scms.users.dto.ReceptionistProfileUpdateDto request = new com.swp391.scms.users.dto.ReceptionistProfileUpdateDto(
                "Morning"
        );

        mockMvc.perform(put("/api/v1/profile/receptionist")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("PUT /api/v1/profile/receptionist returns 403 when wrong role")
    void updateReceptionistProfileForbidden() throws Exception {
        com.swp391.scms.users.dto.ReceptionistProfileUpdateDto request = new com.swp391.scms.users.dto.ReceptionistProfileUpdateDto(
                "Morning"
        );
        
        org.mockito.Mockito.doThrow(new com.swp391.scms.common.exception.ForbiddenException("Error", "users.forbidden.invalid_role"))
                .when(profileService).updateReceptionistProfile(eq(101L), eq("MEMBER"), any());

        mockMvc.perform(put("/api/v1/profile/receptionist")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @DisplayName("PUT /api/v1/profile/coach returns 400 when validation fails")
    void updateCoachProfileValidationFails() throws Exception {
        com.swp391.scms.users.dto.CoachProfileUpdateDto request = new com.swp391.scms.users.dto.CoachProfileUpdateDto(
                "Y", // specialization too short maybe, let's just make it extremely long to fail max
                "10 years experience",
                "A".repeat(256) // Max certification is 255
        );

        mockMvc.perform(put("/api/v1/profile/coach")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }
}
