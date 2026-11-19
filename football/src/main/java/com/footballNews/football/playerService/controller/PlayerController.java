package com.footballNews.football.playerService.controller;

import com.footballNews.football.playerService.dtos.PlayerDto;
import com.footballNews.football.playerService.dtos.PlayerRequest;
import com.footballNews.football.playerService.service.PlayerService;
import com.footballNews.football.transferService.dtos.TransferRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    // ---------------- CREATE ----------------
    @PostMapping
    public ResponseEntity<PlayerDto> createPlayer(@RequestBody PlayerRequest request) {
        return ResponseEntity.ok(playerService.createPlayer(request));
    }

    // ---------------- DELETE ----------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }

    // ---------------- GET ALL ----------------
    @GetMapping
    public ResponseEntity<List<PlayerDto>> getAllPlayers() {
        return ResponseEntity.ok(playerService.getAllPlayers());
    }

    // ---------------- FILTER: NATIONALITY ----------------
    @GetMapping("/nationality")
    public ResponseEntity<Page<PlayerDto>> getByNationality(
            @RequestParam String nationality,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(
                playerService.getPlayersByNationality(nationality, pageable)
        );
    }

    // ---------------- FILTER: POSITION ----------------
    @GetMapping("/position")
    public ResponseEntity<Page<PlayerDto>> getByPosition(
            @RequestParam String position,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(
                playerService.getPlayersByPosition(position, pageable)
        );
    }

    // ---------------- FILTER: CLUB (PATH VARIABLE ✅) ----------------
    @GetMapping("/club/{clubId}")
    public ResponseEntity<Page<PlayerDto>> getByClub(
            @PathVariable Long clubId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(
                playerService.getPlayersByClub(clubId, pageable)
        );
    }

    // ---------------- FILTER: CLUB + POSITION ----------------
    @GetMapping("/club/{clubId}/position")
    public ResponseEntity<Page<PlayerDto>> getByClubAndPosition(
            @PathVariable Long clubId,
            @RequestParam String position,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(
                playerService.getPlayersByClubAndPosition(clubId, position, pageable)
        );
    }

    // ---------------- FILTER: CLUB + NATIONALITY ----------------
    @GetMapping("/club/{clubId}/nationality")
    public ResponseEntity<Page<PlayerDto>> getByClubAndNationality(
            @PathVariable Long clubId,
            @RequestParam String nationality,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(
                playerService.getPlayersByClubAndNationality(clubId, nationality, pageable)
        );
    }

    @PostMapping("/transfer")
    public ResponseEntity<PlayerDto> transfer(
            @RequestBody TransferRequest transferRequest
            ){
        PlayerDto dto = playerService.transferTo(transferRequest);
        return ResponseEntity.ok(dto);
    }
}