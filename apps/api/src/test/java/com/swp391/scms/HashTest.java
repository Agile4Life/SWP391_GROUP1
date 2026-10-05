package com.swp391.scms;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashTest {
    @Test
    public void printHash() {
        System.out.println("MYHASH=" + new BCryptPasswordEncoder().encode("Admin@123456"));
    }
}
