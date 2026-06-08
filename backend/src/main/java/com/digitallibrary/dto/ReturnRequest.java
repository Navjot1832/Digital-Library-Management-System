package com.digitallibrary.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record ReturnRequest(@NotNull LocalDate returnDate) {}
