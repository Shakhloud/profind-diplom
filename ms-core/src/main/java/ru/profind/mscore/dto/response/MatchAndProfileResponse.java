package ru.profind.mscore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchAndProfileResponse
{
   MatchResponse match;
   ProfileResponse profile;
}
