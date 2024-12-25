package ru.profind.mscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.profind.mscore.domain.Prematch;
import ru.profind.mscore.domain.Profile;
import ru.profind.mscore.domain.ProfileStatus;

import java.util.List;
import java.util.Optional;

public interface PrematchRepository extends JpaRepository<Prematch, Long>
{
    List<Prematch> findAllByTargetUsernameAndSwaipUsername(String targetUsername, String swaipUsername);

    List<Prematch> findAllByTargetUsername(String targetUsername);

    List<Prematch> findAllBySwaipUsername(String swaipUsername);
}
