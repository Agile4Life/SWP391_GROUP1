package com.swp391.scms.facilities.service;

import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.facilities.dto.CatalogRequests.RoomRequest;
import com.swp391.scms.facilities.dto.CatalogResponses.RoomDto;
import com.swp391.scms.facilities.entity.Room;
import com.swp391.scms.facilities.repository.RoomRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Business logic for the room catalog (SCRUM-59). */
@Service
public class RoomService {

    private final RoomRepository rooms;

    public RoomService(RoomRepository rooms) {
        this.rooms = rooms;
    }

    @Transactional(readOnly = true)
    public List<RoomDto> list() {
        return rooms.findAllByOrderByNameAsc().stream().map(RoomDto::of).toList();
    }

    @Transactional
    public RoomDto create(RoomRequest request) {
        Room room = new Room();
        apply(room, request);
        return RoomDto.of(rooms.save(room));
    }

    @Transactional
    public RoomDto update(Long id, RoomRequest request) {
        Room room = rooms.findById(id).orElseThrow(() -> new ResourceNotFoundException("resource.room", id));
        apply(room, request);
        return RoomDto.of(room);
    }

    private void apply(Room room, RoomRequest request) {
        room.setName(request.name().trim());
        room.setLocation(request.location());
        room.setCapacity(request.capacity());
        if (request.status() != null) {
            room.setStatus(request.status());
        }
    }
}
