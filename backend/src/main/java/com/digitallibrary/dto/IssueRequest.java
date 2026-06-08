package com.digitallibrary.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record IssueRequest(
    @NotNull Long bookId,
    @NotNull Long userId,
    @NotNull LocalDate issueDate,
    @NotNull LocalDate dueDate) {}
