package ru.profind.mscore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse
{
    String vk;
    String telegram;
    String phone;
    String email;
}
