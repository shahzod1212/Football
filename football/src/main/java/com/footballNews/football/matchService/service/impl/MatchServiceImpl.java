package com.footballNews.football.matchService.service.impl;

import com.footballNews.football.clubService.domain.Club;
import com.footballNews.football.clubService.repository.ClubRepository;
import com.footballNews.football.matchService.domain.Match;
import com.footballNews.football.matchService.dtos.MatchDto;
import com.footballNews.football.matchService.dtos.MatchRequest;
import com.footballNews.football.matchService.mapper.MatchMapper;
import com.footballNews.football.matchService.repository.MatchRepository;
import com.footballNews.football.matchService.service.MatchService;
import com.footballNews.football.playerService.domain.Player;
import com.footballNews.football.playerService.repository.PlayerRepository;
import com.footballNews.football.statisticService.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;




import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {

    private final MatchMapper matchMapper;
    private final MatchRepository matchRepository;
    private final ClubRepository clubRepository;
    private final PlayerRepository playerRepository;
    private final StatisticService statisticService;

    @Override
    public MatchDto create(MatchRequest request) {

        Match match = matchMapper.toEntity(request);

        Club homeClub = clubRepository.findById(request.getHomeClubId())
                .orElseThrow(() -> new RuntimeException("Home club not found"));

        Club awayClub = clubRepository.findById(request.getAwayClubId())
                .orElseThrow(() -> new RuntimeException("Away club not found"));

        Integer homeScore = homeClub.getLeagueScore() == null ? 0 : homeClub.getLeagueScore();
        Integer awayScore = awayClub.getLeagueScore() == null ? 0 : awayClub.getLeagueScore();

        int homeGoals = request.getHomeScore();
        int awayGoals = request.getAwayScore();

        // initialize null-safe values
        homeClub.setGoalScored(homeClub.getGoalScored() == null ? 0 : homeClub.getGoalScored());
        awayClub.setGoalScored(awayClub.getGoalScored() == null ? 0 : awayClub.getGoalScored());

        homeClub.setGoalAgainst(homeClub.getGoalAgainst() == null ? 0 : homeClub.getGoalAgainst());
        awayClub.setGoalAgainst(awayClub.getGoalAgainst() == null ? 0 : awayClub.getGoalAgainst());

        homeClub.setCleanSheets(homeClub.getCleanSheets() == null ? 0 : homeClub.getCleanSheets());
        awayClub.setCleanSheets(awayClub.getCleanSheets() == null ? 0 : awayClub.getCleanSheets());

        if (homeClub.getMatchesResults() == null) {
            homeClub.setMatchesResults(new java.util.ArrayList<>());
        }

        if (awayClub.getMatchesResults() == null) {
            awayClub.setMatchesResults(new java.util.ArrayList<>());
        }

        // update goals scored
        homeClub.setGoalScored(homeClub.getGoalScored() + homeGoals);
        awayClub.setGoalScored(awayClub.getGoalScored() + awayGoals);

        // update goals against
        homeClub.setGoalAgainst(homeClub.getGoalAgainst() + awayGoals);
        awayClub.setGoalAgainst(awayClub.getGoalAgainst() + homeGoals);

        // clean sheets
        if (awayGoals == 0) {
            homeClub.setCleanSheets(homeClub.getCleanSheets() + 1);
        }

        if (homeGoals == 0) {
            awayClub.setCleanSheets(awayClub.getCleanSheets() + 1);
        }

        // match result
        if (homeGoals > awayGoals) {
            homeClub.setLeagueScore(homeScore + 3);

            homeClub.getMatchesResults().add("W");
            awayClub.getMatchesResults().add("L");

        } else if (awayGoals > homeGoals) {
            awayClub.setLeagueScore(awayScore + 3);

            awayClub.getMatchesResults().add("W");
            homeClub.getMatchesResults().add("L");

        } else {
            homeClub.setLeagueScore(homeScore + 1);
            awayClub.setLeagueScore(awayScore + 1);

            homeClub.getMatchesResults().add("D");
            awayClub.getMatchesResults().add("D");
        }

        // calculate win rate percentage
        long homeWins = homeClub.getMatchesResults()
                .stream()
                .filter("W"::equals)
                .count();

        long awayWins = awayClub.getMatchesResults()
                .stream()
                .filter("W"::equals)
                .count();

        int homeWinRate = (int) ((homeWins * 100.0) / homeClub.getMatchesResults().size());
        int awayWinRate = (int) ((awayWins * 100.0) / awayClub.getMatchesResults().size());


        homeClub.setWinRate(homeWinRate);
        awayClub.setWinRate(awayWinRate);

        clubRepository.save(homeClub);
        clubRepository.save(awayClub);



        match.setHomeClub(homeClub);
        match.setAwayClub(awayClub);
        match.setMatchDate(request.getMatchDate());
        match.setHomeScore(homeGoals);
        match.setAwayScore(awayGoals);

        List<Player> goalScorers = request.getGoalScorerIds() == null
                ? List.of()
                : request.getGoalScorerIds().stream()
                .map(id -> playerRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Player not found")))
                .toList();

        List<Player> yellowCardPlayers = request.getYellowCardPlayerIds() == null
                ? List.of()
                : request.getYellowCardPlayerIds().stream()
                .map(id -> playerRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Player not found")))
                .toList();

        List<Player> redCardPlayers = request.getRedCardPlayerIds() == null
                ? List.of()
                : request.getRedCardPlayerIds().stream()
                .map(id -> playerRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Player not found")))
                .toList();

        match.setGoalScorers(goalScorers);
        match.setYellowCardPlayers(yellowCardPlayers);
        match.setRedCardPlayers(redCardPlayers);

        if (request.getGoalScorerIds() != null) {
            request.getGoalScorerIds().forEach(id -> statisticService.updateGoals(id, 1));
        }

        if (request.getYellowCardPlayerIds() != null) {
            request.getYellowCardPlayerIds().forEach(id -> statisticService.updateYellowCards(id, 1));
        }

        if (request.getRedCardPlayerIds() != null) {
            request.getRedCardPlayerIds().forEach(id -> statisticService.updateRedCards(id, 1));
        }

        Match savedMatch = matchRepository.save(match);
        return matchMapper.toDto(savedMatch);
    }

    @Override
    public void delete(Long id) {

        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        matchRepository.delete(match);
    }

    @Override
    public Page<MatchDto> getAll(Pageable pageable) {
        return matchRepository.findAll(pageable).map(matchMapper::toDto);
    }

    @Override
    public Page<MatchDto> getByHomeClub(Long homeClubId, Pageable pageable) {
        return matchRepository.findByHomeClubId(homeClubId, pageable).map(matchMapper::toDto);
    }

    @Override
    public Page<MatchDto> getByAwayClub(Long awayClubId, Pageable pageable) {
        return matchRepository.findByAwayClubId(awayClubId, pageable).map(matchMapper::toDto);
    }

    @Override
    public Page<MatchDto> getByDate(LocalDate matchDate, Pageable pageable) {
        return matchRepository.findByMatchDate(matchDate, pageable).map(matchMapper::toDto);
    }

    @Override
    public List<MatchDto> getByClub(Long id) {
        return matchRepository.findByHomeClubIdOrAwayClubId(id, id)
                .stream()
                .map(matchMapper::toDto)
                .toList();
    }
}