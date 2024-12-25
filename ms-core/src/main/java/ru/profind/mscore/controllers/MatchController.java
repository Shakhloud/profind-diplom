package ru.profind.mscore.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.profind.mscore.dto.requset.MatchRequest;
import ru.profind.mscore.dto.requset.PrematchCompleteRequest;
import ru.profind.mscore.dto.requset.PrematchRequest;
import ru.profind.mscore.exception.ConflictException;
import ru.profind.mscore.servise.MatchService;
import ru.profind.mscore.servise.PrematchService;

@RestController
@RequestMapping("/")
public class MatchController
{
    @Autowired private MatchService matchService;

    @PostMapping("/match")
    @ResponseStatus(HttpStatus.OK)
    public void saveMatch(@RequestBody MatchRequest matchRequest)
    {
        if (matchService.exist(matchRequest.getFirstUsername(), matchRequest.getSecondUsername()))
        {
            throw new ConflictException();
        }

        matchService.save(matchRequest.getFirstUsername(), matchRequest.getSecondUsername(), matchRequest.isPaymentFirst(), matchRequest.isPaymentSecond());
    }

    @PutMapping("/match")
    @ResponseStatus(HttpStatus.OK)
    public void edit(@RequestBody MatchRequest matchRequest)
    {
        if (!matchService.exist(matchRequest.getFirstUsername(), matchRequest.getSecondUsername()))
        {
            throw new ConflictException();
        }

        matchService.edit(matchRequest.getFirstUsername(), matchRequest.getSecondUsername(), matchRequest.isPaymentFirst(), matchRequest.isPaymentSecond());
    }
}
