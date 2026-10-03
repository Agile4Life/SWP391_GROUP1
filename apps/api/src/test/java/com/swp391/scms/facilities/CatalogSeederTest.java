package com.swp391.scms.facilities;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.swp391.scms.facilities.dto.CatalogResponses.DisciplineDto;
import com.swp391.scms.facilities.dto.CatalogResponses.PackageDto;
import com.swp391.scms.facilities.dto.CatalogResponses.RoomDto;
import com.swp391.scms.facilities.service.DisciplineService;
import com.swp391.scms.facilities.service.PackageService;
import com.swp391.scms.facilities.service.RoomService;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CatalogSeederTest {

    @Mock DisciplineService disciplines;
    @Mock RoomService rooms;
    @Mock PackageService packages;
    @InjectMocks CatalogSeeder seeder;

    @Test
    void seedsEmptyCatalogs() {
        when(disciplines.list()).thenReturn(List.of());
        when(rooms.list()).thenReturn(List.of());
        when(packages.list()).thenReturn(List.of());

        seeder.run(null);

        verify(disciplines, times(5)).create(any());
        verify(rooms, times(5)).create(any());
        verify(packages, times(3)).create(any());
    }

    @Test
    void doesNotSeedExistingCatalogs() {
        when(disciplines.list()).thenReturn(List.of(new DisciplineDto(1L, "Yoga", null)));
        when(rooms.list()).thenReturn(List.of(new RoomDto(1L, "S", null, 1, "available")));
        when(packages.list()).thenReturn(List.of(new PackageDto(1L, "P", null, BigDecimal.ONE, 1, null, "active")));

        seeder.run(null);

        verify(disciplines, never()).create(any());
        verify(rooms, never()).create(any());
        verify(packages, never()).create(any());
    }
}
