package ru.profind.mscore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchResponse
{
    String firstUsername;
    String secondUsername;
    boolean paymentFirst;
    boolean paymentSecond;
}
