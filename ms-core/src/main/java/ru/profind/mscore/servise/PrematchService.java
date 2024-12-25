package ru.profind.mscore.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.mscore.domain.Prematch;
import ru.profind.mscore.repository.PrematchRepository;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@Transactional
public class PrematchService
{
    @Autowired private PrematchRepository repository;
    @Autowired private MatchService matchService;

    public boolean exist(String targetUsername, String swaipUsername) {
        AtomicBoolean result = new AtomicBoolean(false);
        List<Prematch> list = repository.findAllByTargetUsernameAndSwaipUsername(targetUsername, swaipUsername);

        if (list.size() != 0)
        {
            result.set(true);
        }

        return result.get();
    }

    public void save(String targetUsername, String swaipUsername, boolean wasLike)
    {
        List<Prematch> list = repository.findAllByTargetUsernameAndSwaipUsername(swaipUsername, targetUsername);

        if (list.isEmpty())
        {
            repository.saveAndFlush(Prematch
                    .builder()
                    .targetUsername(targetUsername)
                    .swaipUsername(swaipUsername)
                    .wasLike(wasLike)
                    .isComplete(!wasLike)
                    .build());
        }
        else
        {
            if (list.size() > 1)
                throw new IllegalStateException();

            Prematch prematch = list.get(0);

            if (prematch.isComplete())
                throw new IllegalStateException();

            if (!prematch.isWasLike())
                throw new IllegalStateException();

            if (wasLike)
            {
                matchService.save(prematch.getTargetUsername(), prematch.getSwaipUsername(), false, false);
            }

            prematch.setComplete(true);
            repository.saveAndFlush(prematch);
        }
    }

    public List<Prematch> findAllWhereSwaipUsername(String swaipUsername) {
        return repository.findAllBySwaipUsername(swaipUsername);
    }

    public List<Prematch> findAll() {
        return repository.findAll();
    }
}
