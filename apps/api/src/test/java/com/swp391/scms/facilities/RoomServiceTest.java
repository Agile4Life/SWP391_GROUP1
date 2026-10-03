package com.swp391.scms.facilities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.facilities.dto.CatalogRequests.RoomRequest;
import com.swp391.scms.facilities.entity.Room;
import com.swp391.scms.facilities.repository.RoomRepository;
import com.swp391.scms.facilities.service.RoomService;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class RoomServiceTest {

    @Mock RoomRepository rooms;
    @InjectMocks RoomService service;

    @Test
    void createDefaultsToAvailableWhenStatusOmitted() {
        when(rooms.save(any(Room.class))).thenAnswer(i -> i.getArgument(0));

        assertEquals("available", service.create(new RoomRequest("Studio", "L1", 10, null)).status());
    }

    @Test
    void updateChangesStatusAndCapacity() {
        when(rooms.findById(1L)).thenReturn(Optional.of(new Room()));

        var dto = service.update(1L, new RoomRequest("Studio", "L1", 15, "maintenance"));

        assertEquals("maintenance", dto.status());
        assertEquals(15, dto.capacity());
    }

    @Test
    void updateMissingThrowsNotFound() {
        when(rooms.findById(9L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> service.update(9L, new RoomRequest("A", null, 1, null)));
    }
}
