package com.swp391.scms.support.service;

import com.swp391.scms.support.dto.SupportRequestResponse;
import com.swp391.scms.support.dto.UpdateTicketStatusRequest;
import org.springframework.stereotype.Service;

@Service
public class SupportRequestService {
    
    public SupportRequestResponse updateTicketStatus(Long id, UpdateTicketStatusRequest request) {
        // Dummy implementation for tests
        return null; 
    }
}

