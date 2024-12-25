package ru.profind.mscore.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.mscore.domain.*;
import ru.profind.mscore.dto.response.ContactResponse;
import ru.profind.mscore.dto.response.MatchAndProfileResponse;
import ru.profind.mscore.dto.response.MatchResponse;
import ru.profind.mscore.dto.response.ProfileResponse;
import ru.profind.mscore.repository.ProfileRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
public class ProfileService
{
    @Autowired private ProfileRepository repository;
    @Autowired private PrematchService prematchService;
    @Autowired private MatchService matchService;

    public List<ProfileResponse> getFindProfiles(
            String targetUsername,
            ProfileGoal profileGoal,
            ProfileProgramLang lang
    )
    {
        List<String> usernamesWherePrematchComplete = prematchService.findAll().stream()
                .flatMap(prematch -> Stream.of(prematch.getTargetUsername(), prematch.getSwaipUsername()))
                .toList();

        List<Profile> profiles = repository
                .findAllByProfileStatusAndProfileGoal(ProfileStatus.VALID, profileGoal)
                .stream()
                .filter(profile -> {
                    if (lang != null) {
                        return profile.getProfileProgramLang() == lang;
                    } else return true;
                })
                .toList();

        List<ProfileResponse> response = profiles.stream()
                .filter(profile -> !profile.getUsername().equals(targetUsername))
                .filter(profile -> !usernamesWherePrematchComplete.contains(profile.getUsername()))
                .map(this::toProfileResponse)
                .collect(Collectors.toList());

        response.addAll(getPrematchProfiles(targetUsername));
        return response;
    }

    public List<ProfileResponse> getPrematchProfiles(String targetUsername)
    {
        List<String> fitUsernames = prematchService.findAllWhereSwaipUsername(targetUsername).stream()
                .filter(prematch -> !prematch.isComplete())
                .map(Prematch::getTargetUsername)
                .toList();

        return repository.findAllWhereUsernameIn(fitUsernames)
                .stream()
                .map(this::toProfileResponse)
                .collect(Collectors.toList());
    }

    public List<MatchAndProfileResponse> getMatchProfiles(String username) {
        List<MatchAndProfileResponse> result = new ArrayList<>();

        List<String> usernames = new ArrayList<>();

        matchService.findByFirstUsername(username).forEach(match -> {
            if (!usernames.contains(match.getSecondUsername())) {
                result.add(
                        new MatchAndProfileResponse(
                                toMatchResponse(match),
                                toProfileResponse(repository.findProfileByUsername(match.getSecondUsername()).orElseThrow()))
                );
                usernames.add(match.getSecondUsername());
            }
        });

        matchService.findBySecondUsername(username).forEach(match -> {
            if (!usernames.contains(match.getFirstUsername())) {
                result.add(
                        new MatchAndProfileResponse(
                                toMatchResponse(match),
                                toProfileResponse(repository.findProfileByUsername(match.getFirstUsername()).orElseThrow()))
                );
                usernames.add(match.getFirstUsername());
            }
        });

        return result;
    }

    public List<ProfileResponse> getProfiles() {
        return repository.findAll().stream().map(this::toProfileResponse).collect(Collectors.toList());
    }

    public List<ProfileResponse> getProfilesByStatus(ProfileStatus profileStatus) {
        return repository.findAllByProfileStatus(profileStatus).stream().map(this::toProfileResponse).collect(Collectors.toList());
    }

    public ProfileResponse getProfileResponse(String username) {
        Optional<Profile> profileByUsername = repository.findProfileByUsername(username);

        if (profileByUsername.isPresent()){
            Profile profile = profileByUsername.get();
            return toProfileResponse(profile);
        } else {
            return null;
        }
    }

    public void save(Profile profile)
    {
        repository.saveAndFlush(profile);
    }

    public Profile getProfile(String username) {
        Optional<Profile> profileByUsername = repository.findProfileByUsername(username);
        return profileByUsername.orElse(null);
    }

    private ProfileResponse toProfileResponse(Profile profile) {
        ContactResponse contactResponse = new ContactResponse(
                profile.getVk(),
                profile.getTelegram(),
                profile.getPhone(),
                profile.getEmail()
        );

        return new ProfileResponse(
                profile.getUsername(),
                profile.getProfileStatus().toString(),
                profile.getName(),
                profile.getAbout(),
                profile.getProfileGoal().toString(),
                profile.getProfileProgramLang().toString(),
                profile.getNoValidMsg(),
                contactResponse
        );
    }

    private MatchResponse toMatchResponse(Match match) {
        return new MatchResponse(
                match.getFirstUsername(),
                match.getSecondUsername(),
                match.isPaymentFirst(),
                match.isPaymentSecond()
        );
    }
}
