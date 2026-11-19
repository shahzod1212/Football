package com.footballNews.football.clubService.service.Impl;

import com.footballNews.football.clubService.domain.Club;
import com.footballNews.football.clubService.dtos.ClubDto;
import com.footballNews.football.clubService.dtos.ClubRequest;
import com.footballNews.football.clubService.mapper.ClubMapper;
import com.footballNews.football.clubService.repository.ClubRepository;
import com.footballNews.football.clubService.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {
    private final ClubMapper clubMapper;
    private final ClubRepository clubRepository;
    @Override
    public ClubDto create(ClubRequest clubRequest) {
        Club club = clubMapper.toEntity(clubRequest);
        Club saved = clubRepository.save(club);
        return clubMapper.toDto(saved);
    }

    @Override
    public ClubDto getById(Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found with id: " + id));

        return clubMapper.toDto(club);
    }

    @Override
    public Page<ClubDto> getAll(Pageable pageable) {
        return clubRepository.findAll(pageable)
                .map(clubMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found with id: " + id));

        clubRepository.delete(club);
    }

    @Override
    public Page<ClubDto> getByCountry(String country, Pageable pageable) {
        return clubRepository.findByCountry(country, pageable)
                .map(clubMapper::toDto);
    }

    @Override
    public Page<ClubDto> getByCity(String city, Pageable pageable) {
        return clubRepository.findByCity(city, pageable)
                .map(clubMapper::toDto);
    }

    @Override
    public Page<ClubDto> searchByKeyword(String keyword, Pageable pageable) {
        return clubRepository.findByNameContainingIgnoreCase(keyword, pageable)
                .map(clubMapper::toDto);
    }

    @Override
    public boolean existsById(Long id) {
        return clubRepository.existsById(id);
    }

    @Override
    public long countClubs() {
        return clubRepository.count();
    }

    @Override
    public Page<ClubDto> leagueTable(String country, Pageable pageable) {

        return clubRepository
                .findByCountryOrderByLeagueScoreDesc(country, pageable)
                .map(clubMapper::toDto);
    }
}
