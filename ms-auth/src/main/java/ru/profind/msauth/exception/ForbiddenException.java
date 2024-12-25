package ru.profind.msauth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.FORBIDDEN, reason="no valid")
public class ForbiddenException extends RuntimeException
{
}
