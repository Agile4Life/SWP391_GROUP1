package com.swp391.scms.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/v1/auth/**", "/api/v1/health", "/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**", "/v3/api-docs",
                    "/api/v1/profile", "/api/v1/profile/**", 
                    "/api/v1/members", "/api/v1/members/**", 
                    "/api/v1/users", "/api/v1/users/**", 
                    "/api/v1/roles", "/api/v1/roles/**",
                    "/api/v1/payments", "/api/v1/payments/**",
                    "/api/v1/invoices", "/api/v1/invoices/**"
                ).permitAll()
                .anyRequest().authenticated()
            );
            
        return http.build();
    }

    // Cung cấp công cụ mã hóa mật khẩu cho toàn hệ thống
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Cung cấp AuthenticationManager để AuthController gọi hàm Login
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}