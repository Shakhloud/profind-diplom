package ru.profind.mscore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse
{
    String username;
    String status;
    String name;
    String about;
    String goal;
    String program_language;
    String no_valid;
    ContactResponse contact;
}
