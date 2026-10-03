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
import com.swp391.scms.facilities.entity.Discipline;
import com.swp391.scms.facilities.repository.DisciplineRepository;
import com.swp391.scms.facilities.service.DisciplineService;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class DisciplineServiceTest {

    @Mock DisciplineRepository disciplines;
    @InjectMocks DisciplineService service;

    @Test
    void createRejectsDuplicateName() {
        when(disciplines.existsByNameIgnoreCase("Yoga")).thenReturn(true);

        assertThrows(ConflictException.class, () -> service.create(new DisciplineRequest(" Yoga ", null)));
        verify(disciplines, never()).save(any());
    }

    @Test
    void createTrimsAndSaves() {
        when(disciplines.existsByNameIgnoreCase("Yoga")).thenReturn(false);
        when(disciplines.save(any(Discipline.class))).thenAnswer(i -> i.getArgument(0));

        assertEquals("Yoga", service.create(new DisciplineRequest(" Yoga ", "d")).name());
    }

    @Test
    void updateMissingThrowsNotFound() {
        when(disciplines.findById(9L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> service.update(9L, new DisciplineRequest("A", null)));
    }

    @Test
    void updateRejectsNameUsedByAnotherDiscipline() {
        when(disciplines.findById(1L)).thenReturn(Optional.of(new Discipline()));
        when(disciplines.existsByNameIgnoreCaseAndIdNot("Yoga", 1L)).thenReturn(true);

        assertThrows(ConflictException.class, () -> service.update(1L, new DisciplineRequest("Yoga", null)));
    }
}
