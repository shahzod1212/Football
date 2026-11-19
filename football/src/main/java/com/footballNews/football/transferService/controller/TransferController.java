package com.footballNews.football.transferService.controller;

import com.footballNews.football.transferService.dtos.TransferDto;
import com.footballNews.football.transferService.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
public class TransferController {

    private final TransferService transferService;

    @GetMapping
    public ResponseEntity<Page<TransferDto>> getAllTransfers(
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(transferService.getAll(pageable));
    }

    @GetMapping("/search/by-name")
    public ResponseEntity<Page<TransferDto>> getByName(
            @RequestParam String name,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(transferService.getAllByName(name, pageable));
    }

    @GetMapping("/search/by-date")
    public ResponseEntity<Page<TransferDto>> getByDate(
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE)
            LocalDate when,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(transferService.getAllByDate(when, pageable));
    }

    @GetMapping("/from-club/{fromId}")
    public ResponseEntity<Page<TransferDto>> getByFromClub(
            @PathVariable Long fromId,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(transferService.getAllByClubFromId(fromId, pageable));
    }

    @GetMapping("/to-club/{toId}")
    public ResponseEntity<Page<TransferDto>> getByToClub(
            @PathVariable Long toId,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "10") Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(transferService.getAllByClubToId(toId, pageable));
    }
}