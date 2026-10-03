package com.swp391.scms.reception;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.swp391.scms.common.exception.BadRequestException;
import com.swp391.scms.users.entity.Member;
import com.swp391.scms.users.entity.User;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class MemberLookupServiceTest {

    @Mock MemberLookupRepository repository;
    @InjectMocks MemberLookupService service;

    @Test
    void rejectsTooShortKeyword() {
        assertThrows(BadRequestException.class, () -> service.search(" a "));
        assertThrows(BadRequestException.class, () -> service.search(null));
        verify(repository, never()).search(any(), any());
    }

    @Test
    void searchesWithLowercasedWildcardPatternAndMapsResult() {
        User user = new User();
        user.setFullName("Nguyen An");
        user.setEmail("an@x.com");
        user.setStatus("active");
        Member member = new Member();
        member.setUser(user);
        member.setMembershipCode("MEM-1");
        when(repository.search(eq("%nguyen%"), any(Pageable.class))).thenReturn(List.of(member));

        List<MemberLookupDto> result = service.search("  Nguyen ");

        assertEquals(1, result.size());
        assertEquals("MEM-1", result.get(0).membershipCode());
        assertEquals("Nguyen An", result.get(0).fullName());
    }
}