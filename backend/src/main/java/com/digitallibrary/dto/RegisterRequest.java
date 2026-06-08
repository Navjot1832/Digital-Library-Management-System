package com.digitallibrary.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank @Size(min = 3) String name,
    @Email String email,
    @NotBlank String department,
    @NotBlank @Size(min = 8) String password) {}
