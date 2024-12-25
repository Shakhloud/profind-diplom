package ru.profind.mscore.dto.requset;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrematchRequest
{
    String targetUsername;
    String swaipUsername;
    boolean wasLike;
}
