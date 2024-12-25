package ru.profind.mscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.profind.mscore.domain.Profile;
import ru.profind.mscore.domain.ProfileGoal;
import ru.profind.mscore.domain.ProfileStatus;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long>
{
    Optional<Profile> findProfileByUsername(String username);

    List<Profile> findAllByProfileStatus(ProfileStatus profileStatus);

    List<Profile> findAllByProfileStatusAndProfileGoal(ProfileStatus profileStatus, ProfileGoal profileGoal);

    @Query("select p from Profile p where p.username in :usernames")
    List<Profile> findAllWhereUsernameIn(@Param("usernames") List<String> usernames);
}
