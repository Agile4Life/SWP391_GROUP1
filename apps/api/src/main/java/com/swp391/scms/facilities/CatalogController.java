package com.swp391.scms.facilities;

import com.swp391.scms.common.ApiResponse;
import com.swp391.scms.common.i18n.MessageService;
import com.swp391.scms.facilities.dto.CatalogRequests.*;
import com.swp391.scms.facilities.dto.CatalogResponses.*;
import com.swp391.scms.facilities.service.CatalogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Catalogs", description = "Master data: disciplines, rooms and membership packages. Read: any authenticated user; write: CENTER_MANAGER")
@RestController
@RequestMapping("/api/v1")
public class CatalogController {

    private final CatalogService catalogService;
    private final MessageService messageService;

    public CatalogController(CatalogService catalogService) {
        this(catalogService, null);
    }

    public CatalogController(CatalogService catalogService, MessageService messageService) {
        this.catalogService = catalogService;
        this.messageService = messageService;
    }

    private String msg(String key, String fallback) {
        return messageService != null ? messageService.getMessageOrDefault(key, fallback) : fallback;
    }

    // ---- Disciplines ----

    @Operation(summary = "List disciplines")
    @GetMapping("/disciplines")
    public ApiResponse<List<DisciplineDto>> listDisciplines() {
        return ApiResponse.ok(msg("catalog.list", "Catalog retrieved successfully"), catalogService.listDisciplines());
    }

    @Operation(summary = "Create discipline")
    @PostMapping("/disciplines")
    public ResponseEntity<ApiResponse<DisciplineDto>> createDiscipline(@Valid @RequestBody DisciplineRequest request) {
        return created(catalogService.createDiscipline(request));
    }

    @Operation(summary = "Update discipline")
    @PutMapping("/disciplines/{id}")
    public ApiResponse<DisciplineDto> updateDiscipline(@PathVariable Long id, @Valid @RequestBody DisciplineRequest request) {
        return updated(catalogService.updateDiscipline(id, request));
    }

    // ---- Rooms ----

    @Operation(summary = "List rooms")
    @GetMapping("/rooms")
    public ApiResponse<List<RoomDto>> listRooms() {
        return ApiResponse.ok(msg("catalog.list", "Catalog retrieved successfully"), catalogService.listRooms());
    }

    @Operation(summary = "Create room")
    @PostMapping("/rooms")
    public ResponseEntity<ApiResponse<RoomDto>> createRoom(@Valid @RequestBody RoomRequest request) {
        return created(catalogService.createRoom(request));
    }

    @Operation(summary = "Update room (including available/maintenance/closed status)")
    @PutMapping("/rooms/{id}")
    public ApiResponse<RoomDto> updateRoom(@PathVariable Long id, @Valid @RequestBody RoomRequest request) {
        return updated(catalogService.updateRoom(id, request));
    }

    // ---- Membership packages ----

    @Operation(summary = "List membership packages")
    @GetMapping("/packages")
    public ApiResponse<List<PackageDto>> listPackages() {
        return ApiResponse.ok(msg("catalog.list", "Catalog retrieved successfully"), catalogService.listPackages());
    }

    @Operation(summary = "Create membership package")
    @PostMapping("/packages")
    public ResponseEntity<ApiResponse<PackageDto>> createPackage(@Valid @RequestBody PackageRequest request) {
        return created(catalogService.createPackage(request));
    }

    @Operation(summary = "Update membership package")
    @PutMapping("/packages/{id}")
    public ApiResponse<PackageDto> updatePackage(@PathVariable Long id, @Valid @RequestBody PackageRequest request) {
        return updated(catalogService.updatePackage(id, request));
    }

    @Operation(summary = "Activate/deactivate membership package")
    @PatchMapping("/packages/{id}/status")
    public ApiResponse<PackageDto> updatePackageStatus(@PathVariable Long id, @Valid @RequestBody PackageStatusRequest request) {
        return updated(catalogService.updatePackageStatus(id, request.status()));
    }

    private <T> ResponseEntity<ApiResponse<T>> created(T data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(msg("catalog.created", "Catalog item created successfully"), data));
    }

    private <T> ApiResponse<T> updated(T data) {
        return ApiResponse.ok(msg("catalog.updated", "Catalog item updated successfully"), data);
    }
}
