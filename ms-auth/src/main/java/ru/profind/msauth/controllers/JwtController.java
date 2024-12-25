package ru.profind.msauth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.profind.msauth.dto.requset.AuthRequest;
import ru.profind.msauth.dto.requset.TokenCheckRequest;
import ru.profind.msauth.dto.requset.TokenRefreshRequest;
import ru.profind.msauth.dto.response.AuthResponse;
import ru.profind.msauth.exception.ConflictException;
import ru.profind.msauth.exception.ForbiddenException;
import ru.profind.msauth.servise.JwtService;
import ru.profind.msauth.servise.UserService;

@RestController
@RequestMapping("/")
public class JwtController
{
    @Autowired private JwtService jwtService;

    @PostMapping("/refresh")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse refresh(@RequestBody TokenRefreshRequest request)
    {
        AuthResponse authResponse = jwtService.refresh(request);
        if (authResponse == null) throw new ForbiddenException();
        return authResponse;
    }

    @PostMapping("/check")
    @ResponseStatus(HttpStatus.OK)
    public void check(@RequestBody TokenCheckRequest request)
    {
        if (!jwtService.check(request)) throw new ForbiddenException();
    }
}
