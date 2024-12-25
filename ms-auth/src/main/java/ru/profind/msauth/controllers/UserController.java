package ru.profind.msauth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.profind.msauth.dto.requset.AuthRequest;
import ru.profind.msauth.dto.response.AuthResponse;
import ru.profind.msauth.exception.ConflictException;
import ru.profind.msauth.exception.ForbiddenException;
import ru.profind.msauth.servise.UserService;

@RestController
@RequestMapping("/")
public class UserController
{
    @Autowired private UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public void register(@RequestBody AuthRequest request)
    {
        if (!userService.register(request)) throw new ConflictException();
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse login(@RequestBody AuthRequest request)
    {
        AuthResponse authResponse = userService.login(request);
        if (authResponse == null) throw new ForbiddenException();
        return authResponse;
    }
}
