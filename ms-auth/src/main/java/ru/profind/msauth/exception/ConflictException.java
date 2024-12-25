package ru.profind.msauth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.CONFLICT, reason="user with this login exit")
public class ConflictException extends RuntimeException
{
}
