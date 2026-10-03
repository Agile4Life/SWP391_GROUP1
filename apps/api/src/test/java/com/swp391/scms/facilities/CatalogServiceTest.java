package com.swp391.scms.facilities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.swp391.scms.common.exception.ConflictException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.facilities.dto.CatalogRequests.DisciplineRequest;
import com.swp391.scms.facilities.dto.CatalogRequests.PackageRequest;
import com.swp391.scms.facilities.dto.CatalogRequests.RoomRequest;
import com.swp391.scms.facilities.entity.Discipline;
import com.swp391.scms.facilities.entity.MembershipPackage;
import com.swp391.scms.facilities.entity.Room;
import com.swp391.scms.facilities.repository.DisciplineRepository;
import com.swp391.scms.facilities.repository.MembershipPackageRepository;
import com.swp391.scms.facilities.repository.RoomRepository;
import com.swp391.scms.facilities.service.CatalogService;
import java.math.BigDecimal;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CatalogServiceTest {

    @Mock DisciplineRepository disciplines;
    @Mock RoomRepository rooms;
    @Mock MembershipPackageRepository packages;
    @InjectMocks CatalogService service;

    @Test
    void createDisciplineRejectsDuplicateName() {
        when(disciplines.existsByNameIgnoreCase("Yoga")).thenReturn(true);

        assertThrows(ConflictException.class, () -> service.createDiscipline(new DisciplineRequest(" Yoga ", null)));
        verify(disciplines, never()).save(any());
    }

    @Test
    void createDisciplineTrimsAndSaves() {
        when(disciplines.existsByNameIgnoreCase("Yoga")).thenReturn(false);
        when(disciplines.save(any(Discipline.class))).thenAnswer(i -> i.getArgument(0));

        assertEquals("Yoga", service.createDiscipline(new DisciplineRequest(" Yoga ", "d")).name());
    }

    @Test
    void updateDisciplineMissingThrowsNotFound() {
        when(disciplines.findById(9L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> service.updateDiscipline(9L, new DisciplineRequest("A", null)));
    }

    @Test
    void updateRoomChangesStatus() {
        Room room = new Room();
        when(rooms.findById(1L)).thenReturn(Optional.of(room));

        assertEquals("maintenance", service.updateRoom(1L, new RoomRequest("Studio", "L1", 10, "maintenance")).status());
    }

    @Test
    void updatePackageStatusDeactivates() {
        MembershipPackage pkg = new MembershipPackage();
        pkg.setPrice(BigDecimal.TEN);
        when(packages.findById(1L)).thenReturn(Optional.of(pkg));

        assertEquals("inactive", service.updatePackageStatus(1L, "inactive").status());
    }

    @Test
    void createPackageDefaultsToActiveWhenStatusOmitted() {
        when(packages.save(any(MembershipPackage.class))).thenAnswer(i -> i.getArgument(0));

        var dto = service.createPackage(new PackageRequest("Basic", null, BigDecimal.TEN, 30, 8, null));

        assertEquals("active", dto.status());
    }
}
