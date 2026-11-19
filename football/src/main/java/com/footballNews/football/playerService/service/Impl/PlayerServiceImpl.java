package com.footballNews.football.playerService.service.Impl;

import com.footballNews.football.clubService.domain.Club;
import com.footballNews.football.clubService.repository.ClubRepository;
import com.footballNews.football.playerService.domain.Player;
import com.footballNews.football.playerService.dtos.PlayerDto;
import com.footballNews.football.playerService.dtos.PlayerRequest;
import com.footballNews.football.playerService.mapper.PlayerMapper;
import com.footballNews.football.playerService.repository.PlayerRepository;
import com.footballNews.football.playerService.service.PlayerService;
import com.footballNews.football.statisticService.domain.Statistic;
import com.footballNews.football.statisticService.repository.StatisticRepository;
import com.footballNews.football.transferService.dtos.TransferDto;
import com.footballNews.football.transferService.dtos.TransferRequest;
import com.footballNews.football.transferService.service.TransferService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {

    private final PlayerMapper playerMapper;
    private final PlayerRepository playerRepository;
    private final ClubRepository clubRepository;
    private final TransferService transferService;
    private final StatisticRepository statisticRepository;

    @Override
    public PlayerDto createPlayer(PlayerRequest playerRequest) {

        Player player = playerMapper.toEntity(playerRequest);
        Club club  = clubRepository.findById(playerRequest.getClubId())
                .orElseThrow(()->new RuntimeException("Club not found"));
        player.setClub(club);
        Player saved = playerRepository.save(player);
        Statistic statistic = new Statistic();
        statistic.setPlayer(saved);
        statisticRepository.save(statistic);
        return playerMapper.toDto(saved);
    }

    @Override
    public void deletePlayer(Long id) {
        if (!playerRepository.existsById(id)) {
            throw new RuntimeException("Player not found with id: " + id);
        }
        playerRepository.deleteById(id);
    }

    @Override
    public List<PlayerDto> getAllPlayers() {
        return playerRepository.findAll()
                .stream()
                .map(playerMapper::toDto)
                .toList();
    }

    @Override
    public Page<PlayerDto> getPlayersByClub(Long clubId, Pageable pageable) {
        return playerRepository.findByClubId(clubId, pageable)
                .map(playerMapper::toDto);
    }

    @Override
    public Page<PlayerDto> getPlayersByNationality(String nationality, Pageable pageable) {
        return playerRepository.findByNationalityIgnoreCase(nationality, pageable)
                .map(playerMapper::toDto);
    }

    @Override
    public Page<PlayerDto> getPlayersByPosition(String position, Pageable pageable) {
        return playerRepository.findByPositionIgnoreCase(position, pageable)
                .map(playerMapper::toDto);
    }

    @Override
    public Page<PlayerDto> getPlayersByClubAndPosition(Long clubId, String position, Pageable pageable) {
        return playerRepository.findByClubIdAndPositionIgnoreCase(clubId, position, pageable)
                .map(playerMapper::toDto);
    }

    @Override
    public Page<PlayerDto> getPlayersByClubAndNationality(Long clubId, String nationality, Pageable pageable) {
        return playerRepository.findByClubIdAndNationalityIgnoreCase(clubId, nationality, pageable)
                .map(playerMapper::toDto);
    }

    @Override
    @Transactional
    public PlayerDto transferTo(TransferRequest transferRequest) {
        Player player = playerRepository.findByName(transferRequest.getName());
        if(player==null){
            throw new RuntimeException("Player not found");
        }
        if(!transferRequest.getFromId().equals(player.getClub().getId())){
            throw new RuntimeException("Player already has transferred");
        }
        TransferDto dto =transferService.create(transferRequest);
        if(dto==null){
            throw new RuntimeException("Could not transferred");
        }
        Club club = clubRepository.findById(transferRequest.getToId())
                .orElseThrow(()->new RuntimeException("Club not found"));
        player.setClub(club);
        Player saved = playerRepository.save(player);
        return playerMapper.toDto(saved);
    }
}