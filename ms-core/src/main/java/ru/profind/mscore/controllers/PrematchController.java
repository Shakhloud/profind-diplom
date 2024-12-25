package ru.profind.mscore.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.profind.mscore.dto.requset.PrematchCompleteRequest;
import ru.profind.mscore.dto.requset.PrematchRequest;
import ru.profind.mscore.dto.requset.ProfileRequest;
import ru.profind.mscore.exception.*;
import ru.profind.mscore.servise.PrematchService;

@RestController
@RequestMapping("/")
public class PrematchController
{
    @Autowired private PrematchService prematchService;

    @PostMapping("/prematch")
    @ResponseStatus(HttpStatus.OK)
    public void savePrematch(@RequestBody PrematchRequest prematchRequest)
    {
        if (prematchService.exist(prematchRequest.getTargetUsername(), prematchRequest.getSwaipUsername()))
        {
            throw new ConflictException();
        }

        prematchService.save(prematchRequest.getTargetUsername(), prematchRequest.getSwaipUsername(), prematchRequest.isWasLike());
    }
}
