package ru.profind.mscore.dto.requset;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchRequest
{
    String firstUsername;
    String secondUsername;
    boolean paymentFirst;
    boolean paymentSecond;
}
