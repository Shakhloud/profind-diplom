package ru.profind.mscore.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.UNAUTHORIZED, reason="role is not valid")
public class NoAuthException extends RuntimeException
{
}
