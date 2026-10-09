package com.swp391.scms.support;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp391.scms.common.GlobalExceptionHandler;
import com.swp391.scms.common.i18n.MessageService;
import com.swp391.scms.support.controller.SupportRequestController;
import com.swp391.scms.support.dto.SupportRequestResponse;
import com.swp391.scms.support.dto.UpdateTicketStatusRequest;
import com.swp391.scms.support.service.SupportRequestService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class SupportRequestControllerTest {

    private MockMvc mockMvc;

    @Mock
    private SupportRequestService supportRequestService;

    @Mock
    private MessageService messageService;

    @InjectMocks
    private SupportRequestController supportRequestController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(supportRequestController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void testUpdateTicketStatus_Success() throws Exception {
        UpdateTicketStatusRequest request = new UpdateTicketStatusRequest();
        request.setStatus("in_progress");

        when(messageService.getMessage("ticket.status.updated.success")).thenReturn("Ticket status updated successfully");
        when(supportRequestService.updateTicketStatus(eq(1L), any(UpdateTicketStatusRequest.class)))
                .thenReturn(null);

        mockMvc.perform(put("/api/v1/support-requests/1/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Ticket status updated successfully"));
    }

    @Test
    void testUpdateTicketStatus_Forbidden_Returns403() throws Exception {
        UpdateTicketStatusRequest request = new UpdateTicketStatusRequest();
        request.setStatus("in_progress");

        when(supportRequestService.updateTicketStatus(eq(1L), any(UpdateTicketStatusRequest.class)))
                .thenThrow(new AccessDeniedException("Access is denied"));
        
        mockMvc.perform(put("/api/v1/support-requests/1/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.status").value(403))
                .andExpect(jsonPath("$.code").value("FORBIDDEN"));
    }
}
