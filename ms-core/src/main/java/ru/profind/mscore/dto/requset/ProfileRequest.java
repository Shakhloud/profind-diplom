package ru.profind.mscore.dto.requset;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.profind.mscore.dto.response.ContactResponse;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest
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
