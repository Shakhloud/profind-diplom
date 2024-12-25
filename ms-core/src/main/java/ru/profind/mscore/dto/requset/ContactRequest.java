package ru.profind.mscore.dto.requset;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequest
{
    String vk;
    String telegram;
    String phone;
    String email;
}
