package com.swp391.scms.audit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp391.scms.security.AuthenticatedPrincipal;
import java.util.Map;
import org.aspectj.lang.JoinPoint;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

@ExtendWith(MockitoExtension.class)
class AuditAspectTest {

    @Mock AuditLogRepository repository;
    @Mock JoinPoint joinPoint;

    @AfterEach
    void clearContext() {
        SecurityContextHolder.clearContext();
    }

    private Audited audited(String action, String entity) {
        Audited audited = mock(Audited.class);
        when(audited.action()).thenReturn(action);
        when(audited.entity()).thenReturn(entity);
        return audited;
    }

    @Test
    void recordsActorEntityIdFromFirstArgAndResultJson() {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(new AuthenticatedPrincipal(7L, "boss", "CENTER_MANAGER"), null));
        when(joinPoint.getArgs()).thenReturn(new Object[]{42L, "ignored"});
        AuditAspect aspect = new AuditAspect(repository, new ObjectMapper());

        aspect.record(joinPoint, audited("USER_UPDATE", "users"), Map.of("id", 42, "status", "locked"));

        ArgumentCaptor<AuditLog> captor = ArgumentCaptor.forClass(AuditLog.class);
        verify(repository).save(captor.capture());
        AuditLog log = captor.getValue();
        assertEquals(7L, log.getUserId());
        assertEquals(42L, log.getEntityId());
        assertEquals("USER_UPDATE", log.getAction());
        assertEquals("users", log.getEntityType());
        assertEquals(true, log.getNewValue().contains("locked"));
    }

    @Test
    void takesEntityIdFromResultWhenFirstArgIsNotAnId() {
        when(joinPoint.getArgs()).thenReturn(new Object[]{"dto"});
        AuditAspect aspect = new AuditAspect(repository, new ObjectMapper());

        aspect.record(joinPoint, audited("USER_CREATE", "users"), Map.of("id", 5));

        ArgumentCaptor<AuditLog> captor = ArgumentCaptor.forClass(AuditLog.class);
        verify(repository).save(captor.capture());
        assertEquals(5L, captor.getValue().getEntityId());
        assertNull(captor.getValue().getUserId());
    }

    @Test
    void repositoryFailureNeverBreaksTheBusinessCall() {
        when(joinPoint.getArgs()).thenReturn(new Object[]{1L});
        when(repository.save(any())).thenThrow(new IllegalStateException("db down"));
        AuditAspect aspect = new AuditAspect(repository, new ObjectMapper());

        aspect.record(joinPoint, audited("USER_DELETE", "users"), null);
    }
}