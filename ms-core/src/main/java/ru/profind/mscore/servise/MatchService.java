package ru.profind.mscore.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.mscore.domain.Match;
import ru.profind.mscore.domain.Prematch;
import ru.profind.mscore.repository.MatchRepository;
import ru.profind.mscore.repository.PrematchRepository;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@Transactional
public class MatchService
{
    @Autowired private MatchRepository repository;

    public boolean exist(String firstUsername, String secondUsername) {
        AtomicBoolean result = new AtomicBoolean(false);
        List<Match> list1 = repository.findAllByFirstUsernameAndSecondUsername(firstUsername, secondUsername);

        if (list1.size() != 0)
        {
            result.set(true);
        }

        List<Match> list2 = repository.findAllByFirstUsernameAndSecondUsername(secondUsername, firstUsername);

        if (list2.size() != 0)
        {
            result.set(true);
        }

        return result.get();
    }

    public void save(String firstUsername, String secondUsername, boolean paymentFirst, boolean paymentSecond)
    {
        repository.saveAndFlush(Match
                .builder()
                .firstUsername(firstUsername)
                .secondUsername(secondUsername)
                .paymentFirst(paymentFirst)
                .paymentSecond(paymentSecond)
                .build());
    }

    public void edit(String firstUsername, String secondUsername, boolean paymentFirst, boolean paymentSecond)
    {
        List<Match> list1 = repository.findAllByFirstUsernameAndSecondUsername(firstUsername, secondUsername);

        if (!list1.isEmpty()) {

            if (list1.size() > 1)
                throw new IllegalStateException();

            Match match = list1.get(0);
            match.setPaymentFirst(paymentFirst);
            match.setPaymentSecond(paymentSecond);
            repository.saveAndFlush(match);
            return;
        }

        List<Match> list2 = repository.findAllByFirstUsernameAndSecondUsername(secondUsername, firstUsername);

        if (!list2.isEmpty()) {

            if (list2.size() > 1)
                throw new IllegalStateException();

            Match match = list2.get(0);
            match.setPaymentFirst(paymentFirst);
            match.setPaymentSecond(paymentSecond);
            repository.saveAndFlush(match);
        }
    }

    public List<Match> findByFirstUsername(String firstUsername) {
        return repository.findAllByFirstUsername(firstUsername);
    }
    public List<Match> findBySecondUsername(String secondUsername) {
        return repository.findAllBySecondUsername(secondUsername);
    }
}
