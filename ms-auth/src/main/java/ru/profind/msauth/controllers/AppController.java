package ru.profind.msauth.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class AppController
{
    @GetMapping("/alive")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String alive()
    {
       return "yes, bro";
    }
}
