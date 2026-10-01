package com.swp391.scms.users;

import com.swp391.scms.users.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByCode(String code);
    Optional<Role> findByCodeIgnoreCase(String code);
}
