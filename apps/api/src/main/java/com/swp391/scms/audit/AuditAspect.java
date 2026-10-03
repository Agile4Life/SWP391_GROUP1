package com.swp391.scms.audit;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp391.scms.security.AuthenticatedPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * Writes an audit_logs row after every successful {@link Audited} service call.
 * Audit failures are logged but never break the business operation.
 */
@Aspect
@Component
public class AuditAspect {

    private static final Logger log = LoggerFactory.getLogger(AuditAspect.class);

    private final AuditLogRepository repository;
    private final ObjectMapper objectMapper;

    public AuditAspect(AuditLogRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    @AfterReturning(pointcut = "@annotation(audited)", returning = "result")
    public void record(JoinPoint joinPoint, Audited audited, Object result) {
        try {
            JsonNode newValue = result == null ? null : objectMapper.valueToTree(result);
            AuditLog entry = new AuditLog();
            entry.setUserId(currentUserId());
            entry.setAction(audited.action());
            entry.setEntityType(audited.entity());
            entry.setEntityId(resolveEntityId(joinPoint.getArgs(), newValue));
            entry.setNewValue(newValue == null ? null : newValue.toString());
            entry.setIpAddress(currentIp());
            repository.save(entry);
        } catch (RuntimeException e) {
            log.warn("Could not write audit log for action {}", audited.action(), e);
        }
    }

    private Long resolveEntityId(Object[] args, JsonNode newValue) {
        if (args.length > 0 && args[0] instanceof Long id) {
            return id;
        }
        return newValue != null && newValue.hasNonNull("id") ? newValue.get("id").asLong() : null;
    }

    private Long currentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.getPrincipal() instanceof AuthenticatedPrincipal principal ? principal.id() : null;
    }

    private String currentIp() {
        return RequestContextHolder.getRequestAttributes() instanceof ServletRequestAttributes attrs
                ? ((HttpServletRequest) attrs.getRequest()).getRemoteAddr()
                : null;
    }
}