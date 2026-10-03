package com.swp391.scms.facilities.service;

import com.swp391.scms.common.exception.ConflictException;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.facilities.dto.CatalogRequests.*;
import com.swp391.scms.facilities.dto.CatalogResponses.*;
import com.swp391.scms.facilities.entity.Discipline;
import com.swp391.scms.facilities.entity.MembershipPackage;
import com.swp391.scms.facilities.entity.Room;
import com.swp391.scms.facilities.repository.DisciplineRepository;
import com.swp391.scms.facilities.repository.MembershipPackageRepository;
import com.swp391.scms.facilities.repository.RoomRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Business logic for the master catalogs: disciplines (SCRUM-58), rooms (SCRUM-59), packages (SCRUM-60). */
@Service
public class CatalogService {

    private final DisciplineRepository disciplines;
    private final RoomRepository rooms;
    private final MembershipPackageRepository packages;

    public CatalogService(DisciplineRepository disciplines, RoomRepository rooms, MembershipPackageRepository packages) {
        this.disciplines = disciplines;
        this.rooms = rooms;
        this.packages = packages;
    }

    // ---- Disciplines ----

    @Transactional(readOnly = true)
    public List<DisciplineDto> listDisciplines() {
        return disciplines.findAllByOrderByNameAsc().stream().map(DisciplineDto::of).toList();
    }

    @Transactional
    public DisciplineDto createDiscipline(DisciplineRequest request) {
        if (disciplines.existsByNameIgnoreCase(request.name().trim())) {
            throw duplicateDiscipline(request.name());
        }
        Discipline discipline = new Discipline();
        applyDiscipline(discipline, request);
        return DisciplineDto.of(disciplines.save(discipline));
    }

    @Transactional
    public DisciplineDto updateDiscipline(Long id, DisciplineRequest request) {
        Discipline discipline = disciplines.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("resource.discipline", id));
        if (disciplines.existsByNameIgnoreCaseAndIdNot(request.name().trim(), id)) {
            throw duplicateDiscipline(request.name());
        }
        applyDiscipline(discipline, request);
        return DisciplineDto.of(discipline);
    }

    private void applyDiscipline(Discipline discipline, DisciplineRequest request) {
        discipline.setName(request.name().trim());
        discipline.setDescription(request.description());
    }

    private ConflictException duplicateDiscipline(String name) {
        return new ConflictException("DISCIPLINE_EXISTS", "catalog.discipline.name_exists", new Object[]{name.trim()},
                "Discipline name already exists: " + name.trim());
    }

    // ---- Rooms ----

    @Transactional(readOnly = true)
    public List<RoomDto> listRooms() {
        return rooms.findAllByOrderByNameAsc().stream().map(RoomDto::of).toList();
    }

    @Transactional
    public RoomDto createRoom(RoomRequest request) {
        Room room = new Room();
        applyRoom(room, request);
        return RoomDto.of(rooms.save(room));
    }

    @Transactional
    public RoomDto updateRoom(Long id, RoomRequest request) {
        Room room = rooms.findById(id).orElseThrow(() -> new ResourceNotFoundException("resource.room", id));
        applyRoom(room, request);
        return RoomDto.of(room);
    }

    private void applyRoom(Room room, RoomRequest request) {
        room.setName(request.name().trim());
        room.setLocation(request.location());
        room.setCapacity(request.capacity());
        if (request.status() != null) {
            room.setStatus(request.status());
        }
    }

    // ---- Membership packages ----

    @Transactional(readOnly = true)
    public List<PackageDto> listPackages() {
        return packages.findAllByOrderByPriceAsc().stream().map(PackageDto::of).toList();
    }

    @Transactional
    public PackageDto createPackage(PackageRequest request) {
        MembershipPackage pkg = new MembershipPackage();
        applyPackage(pkg, request);
        return PackageDto.of(packages.save(pkg));
    }

    @Transactional
    public PackageDto updatePackage(Long id, PackageRequest request) {
        MembershipPackage pkg = findPackage(id);
        applyPackage(pkg, request);
        return PackageDto.of(pkg);
    }

    @Transactional
    public PackageDto updatePackageStatus(Long id, String status) {
        MembershipPackage pkg = findPackage(id);
        pkg.setStatus(status);
        return PackageDto.of(pkg);
    }

    private MembershipPackage findPackage(Long id) {
        return packages.findById(id).orElseThrow(() -> new ResourceNotFoundException("resource.package", id));
    }

    private void applyPackage(MembershipPackage pkg, PackageRequest request) {
        pkg.setName(request.name().trim());
        pkg.setDescription(request.description());
        pkg.setPrice(request.price());
        pkg.setDurationDays(request.durationDays());
        pkg.setClassCreditLimit(request.classCreditLimit());
        if (request.status() != null) {
            pkg.setStatus(request.status());
        }
    }
}
