package com.footballNews.football.clubService.controller;

import com.footballNews.football.clubService.dtos.ClubDto;
import com.footballNews.football.clubService.dtos.ClubRequest;
import com.footballNews.football.clubService.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @PostMapping
    public ResponseEntity<ClubDto> create(@RequestBody ClubRequest clubRequest) {
        ClubDto club = clubService.create(clubRequest);
        return ResponseEntity.ok(club);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClubDto> getById(@PathVariable Long id) {
        ClubDto club = clubService.getById(id);
        return ResponseEntity.ok(club);
    }

    @GetMapping
    public ResponseEntity<Page<ClubDto>> getAll(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ClubDto> clubs = clubService.getAll(pageable);
        return ResponseEntity.ok(clubs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        clubService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/country")
    public ResponseEntity<Page<ClubDto>> getByCountry(
            @RequestParam String country,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ClubDto> clubs = clubService.getByCountry(country, pageable);
        return ResponseEntity.ok(clubs);
    }

    @GetMapping("/city")
    public ResponseEntity<Page<ClubDto>> getByCity(
            @RequestParam String city,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ClubDto> clubs = clubService.getByCity(city, pageable);
        return ResponseEntity.ok(clubs);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ClubDto>> getBySearch(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ClubDto> clubs = clubService.searchByKeyword(keyword, pageable);
        return ResponseEntity.ok(clubs);
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> existsById(@PathVariable Long id) {
        return ResponseEntity.ok(clubService.existsById(id));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countClubs() {
        return ResponseEntity.ok(clubService.countClubs());
    }

    @GetMapping("/league-table")
    public ResponseEntity<Page<ClubDto>> leagueTable(
            @RequestParam String country,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ClubDto> clubs = clubService.leagueTable(country, pageable);
        return ResponseEntity.ok(clubs);
    }
}
