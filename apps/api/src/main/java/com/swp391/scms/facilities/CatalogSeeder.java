package com.swp391.scms.facilities;

import com.swp391.scms.facilities.dto.CatalogRequests.*;
import com.swp391.scms.facilities.repository.DisciplineRepository;
import com.swp391.scms.facilities.repository.MembershipPackageRepository;
import com.swp391.scms.facilities.repository.RoomRepository;
import com.swp391.scms.facilities.service.CatalogService;
import java.math.BigDecimal;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/** Seeds sample disciplines, rooms and packages into empty catalog tables (idempotent). */
@Component
public class CatalogSeeder implements ApplicationRunner {

    private final CatalogService catalog;
    private final DisciplineRepository disciplines;
    private final RoomRepository rooms;
    private final MembershipPackageRepository packages;

    public CatalogSeeder(CatalogService catalog, DisciplineRepository disciplines, RoomRepository rooms,
                         MembershipPackageRepository packages) {
        this.catalog = catalog;
        this.disciplines = disciplines;
        this.rooms = rooms;
        this.packages = packages;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (disciplines.count() == 0) {
            catalog.createDiscipline(new DisciplineRequest("Reformer Pilates", "Core strength and spine recovery on Reformer machines"));
            catalog.createDiscipline(new DisciplineRequest("Olympic Strength", "Explosive strength with Olympic barbells"));
            catalog.createDiscipline(new DisciplineRequest("Mindful Yoga", "Breathwork, deep stretching and meditation"));
            catalog.createDiscipline(new DisciplineRequest("Boxing & Kickfit", "Combat tactics, reflexes and high-intensity fat burn"));
            catalog.createDiscipline(new DisciplineRequest("Thermal Aquatics", "Hydrodynamic swimming and warm-water recovery"));
        }
        if (rooms.count() == 0) {
            catalog.createRoom(new RoomRequest("Studio 01", "Level 2 - North Wing", 12, "available"));
            catalog.createRoom(new RoomRequest("Arena 02 (Strength)", "Level 1 - Main Floor", 25, "available"));
            catalog.createRoom(new RoomRequest("Zen Garden Studio", "Penthouse", 18, "available"));
            catalog.createRoom(new RoomRequest("Ring Arena 01", "Level 1 - East Wing", 14, "maintenance"));
            catalog.createRoom(new RoomRequest("Oasis Lap Pool", "Sub-level Oasis", 20, "available"));
        }
        if (packages.count() == 0) {
            catalog.createPackage(new PackageRequest("The Essential", "8 classes per month", new BigDecimal("2800000"), 30, 8, "active"));
            catalog.createPackage(new PackageRequest("The Sanctuary VIP", "Unlimited classes", new BigDecimal("7500000"), 90, null, "active"));
            catalog.createPackage(new PackageRequest("The Sovereign Annual", "Unlimited classes + 24 PT sessions", new BigDecimal("26000000"), 365, null, "active"));
        }
    }
}
