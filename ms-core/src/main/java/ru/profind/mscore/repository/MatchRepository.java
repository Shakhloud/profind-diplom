package ru.profind.mscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.profind.mscore.domain.Match;
import ru.profind.mscore.domain.Prematch;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long>
{
    List<Match> findAllByFirstUsernameAndSecondUsername(String firstUsername, String secondUsername);

    List<Match> findAllByFirstUsername(String firstUsername);

    List<Match> findAllBySecondUsername(String secondUsername);
}
