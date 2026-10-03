package com.swp391.scms.facilities;

import com.swp391.scms.facilities.dto.CatalogRequests.DisciplineRequest;
import com.swp391.scms.facilities.dto.CatalogRequests.PackageRequest;
import com.swp391.scms.facilities.dto.CatalogRequests.RoomRequest;
import com.swp391.scms.facilities.service.DisciplineService;
import com.swp391.scms.facilities.service.PackageService;
import com.swp391.scms.facilities.service.RoomService;
import java.math.BigDecimal;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/** Seeds sample disciplines, rooms and packages into empty catalogs (idempotent). */
@Component
public class CatalogSeeder implements ApplicationRunner {

    private final DisciplineService disciplines;
    private final RoomService rooms;
    private final PackageService packages;

    public CatalogSeeder(DisciplineService disciplines, RoomService rooms, PackageService packages) {
        this.disciplines = disciplines;
        this.rooms = rooms;
        this.packages = packages;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (disciplines.list().isEmpty()) {
            disciplines.create(new DisciplineRequest("Reformer Pilates", "Core strength and spine recovery on Reformer machines"));
            disciplines.create(new DisciplineRequest("Olympic Strength", "Explosive strength with Olympic barbells"));
            disciplines.create(new DisciplineRequest("Mindful Yoga", "Breathwork, deep stretching and meditation"));
            disciplines.create(new DisciplineRequest("Boxing & Kickfit", "Combat tactics, reflexes and high-intensity fat burn"));
            disciplines.create(new DisciplineRequest("Thermal Aquatics", "Hydrodynamic swimming and warm-water recovery"));
        }
        if (rooms.list().isEmpty()) {
            rooms.create(new RoomRequest("Studio 01", "Level 2 - North Wing", 12, "available"));
            rooms.create(new RoomRequest("Arena 02 (Strength)", "Level 1 - Main Floor", 25, "available"));
            rooms.create(new RoomRequest("Zen Garden Studio", "Penthouse", 18, "available"));
            rooms.create(new RoomRequest("Ring Arena 01", "Level 1 - East Wing", 14, "maintenance"));
            rooms.create(new RoomRequest("Oasis Lap Pool", "Sub-level Oasis", 20, "available"));
        }
        if (packages.list().isEmpty()) {
            packages.create(new PackageRequest("The Essential", "8 classes per month", new BigDecimal("2800000"), 30, 8, "active"));
            packages.create(new PackageRequest("The Sanctuary VIP", "Unlimited classes", new BigDecimal("7500000"), 90, null, "active"));
            packages.create(new PackageRequest("The Sovereign Annual", "Unlimited classes + 24 PT sessions", new BigDecimal("26000000"), 365, null, "active"));
        }
    }
}
