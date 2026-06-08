package com.digitallibrary.dto;

import jakarta.validation.constraints.NotBlank;

public record BookRequest(
    @NotBlank String title,
    @NotBlank String author,
    @NotBlank String category,
    String status,
    @NotBlank String description) {}
