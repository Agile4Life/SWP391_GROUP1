package com.demoswp.scrum38andscrum39.repository;

import com.demoswp.scrum38andscrum39.entity.Member;
import com.demoswp.scrum38andscrum39.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByUser(User user);
}