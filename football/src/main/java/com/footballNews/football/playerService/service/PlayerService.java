package com.footballNews.football.playerService.service;

import com.footballNews.football.playerService.dtos.PlayerDto;
import com.footballNews.football.playerService.dtos.PlayerRequest;
import com.footballNews.football.transferService.dtos.TransferRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PlayerService {

    PlayerDto createPlayer(PlayerRequest playerRequest);

    void deletePlayer(Long id);

    List<PlayerDto> getAllPlayers();

    Page<PlayerDto> getPlayersByClub(Long clubId, Pageable pageable);

    Page<PlayerDto> getPlayersByNationality(String nationality, Pageable pageable);

    Page<PlayerDto> getPlayersByPosition(String position, Pageable pageable);

    Page<PlayerDto> getPlayersByClubAndPosition(Long clubId, String position, Pageable pageable);

    Page<PlayerDto> getPlayersByClubAndNationality(Long clubId, String nationality, Pageable pageable);

    PlayerDto transferTo(TransferRequest transferRequest);
}