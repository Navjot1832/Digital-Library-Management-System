package com.digitallibrary.dto;

import com.digitallibrary.model.LibraryTransaction;
import com.digitallibrary.model.TransactionStatus;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public record TransactionResponse(
    Long id,
    Long bookId,
    Long userId,
    String bookTitle,
    String borrower,
    String issueDate,
    String dueDate,
    String returnDate,
    int fine,
    String status) {
  public static TransactionResponse from(LibraryTransaction transaction) {
    LocalDate fineDate = transaction.getStatus() == TransactionStatus.Returned
        ? transaction.getReturnDate()
        : LocalDate.now();
    long overdueDays = Math.max(0, ChronoUnit.DAYS.between(transaction.getDueDate(), fineDate));
    int currentFine = (int) overdueDays * 10;

    return new TransactionResponse(
        transaction.getId(),
        transaction.getBook().getId(),
        transaction.getUser().getId(),
        transaction.getBook().getTitle(),
        transaction.getUser().getName(),
        transaction.getIssueDate().toString(),
        transaction.getDueDate().toString(),
        transaction.getReturnDate() == null ? "" : transaction.getReturnDate().toString(),
        currentFine,
        transaction.getStatus().name());
  }
}
