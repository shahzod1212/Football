package com.footballNews.football.matchService.controller;

import com.footballNews.football.matchService.dtos.MatchDto;
import com.footballNews.football.matchService.dtos.MatchRequest;
import com.footballNews.football.matchService.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @PostMapping
    public ResponseEntity<MatchDto> create(@RequestBody MatchRequest request) {
        return ResponseEntity.ok(matchService.create(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        matchService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<MatchDto>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return ResponseEntity.ok(matchService.getAll(pageable));
    }

    @GetMapping("/home/{homeClubId}")
    public ResponseEntity<Page<MatchDto>> getByHomeClub(
            @PathVariable Long homeClubId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("matchDate").descending());
        return ResponseEntity.ok(matchService.getByHomeClub(homeClubId, pageable));
    }

    @GetMapping("/away/{awayClubId}")
    public ResponseEntity<Page<MatchDto>> getByAwayClub(
            @PathVariable Long awayClubId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("matchDate").descending());
        return ResponseEntity.ok(matchService.getByAwayClub(awayClubId, pageable));
    }

    @GetMapping("/date")
    public ResponseEntity<Page<MatchDto>> getByDate(
            @RequestParam LocalDate matchDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return ResponseEntity.ok(matchService.getByDate(matchDate, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<MatchDto>> getAllMatchesByClub(
            @PathVariable(name = "id") Long id
    ){
        List<MatchDto> list = matchService.getByClub(id);
        return ResponseEntity.ok(list);
    }
}