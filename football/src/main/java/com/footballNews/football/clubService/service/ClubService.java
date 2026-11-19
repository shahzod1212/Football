package com.footballNews.football.clubService.service;

import com.footballNews.football.clubService.dtos.ClubDto;
import com.footballNews.football.clubService.dtos.ClubRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ClubService {

    // Create
    ClubDto create(ClubRequest clubRequest);

    // Read
    ClubDto getById(Long id);

    Page<ClubDto> getAll(Pageable pageable);

    // Delete
    void delete(Long id);

    // Filters
    Page<ClubDto> getByCountry(String country, Pageable pageable);

    Page<ClubDto> getByCity(String city, Pageable pageable);
    Page<ClubDto> searchByKeyword(String keyword, Pageable pageable);


    // Validation
    boolean existsById(Long id);


    // Statistics
    long countClubs();
    Page<ClubDto> leagueTable(String country, Pageable pageable);

}