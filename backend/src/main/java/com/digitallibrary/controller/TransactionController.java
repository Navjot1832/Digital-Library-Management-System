package com.digitallibrary.controller;

import com.digitallibrary.dto.IssueRequest;
import com.digitallibrary.dto.ReturnRequest;
import com.digitallibrary.dto.TransactionResponse;
import com.digitallibrary.model.LibraryTransaction;
import com.digitallibrary.repository.TransactionRepository;
import com.digitallibrary.service.LibraryService;
import jakarta.validation.Valid;
import java.util.Comparator;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
  private final TransactionRepository transactionRepository;
  private final LibraryService libraryService;

  public TransactionController(TransactionRepository transactionRepository, LibraryService libraryService) {
    this.transactionRepository = transactionRepository;
    this.libraryService = libraryService;
  }

  @GetMapping
  public List<TransactionResponse> allTransactions() {
    return transactionRepository.findAll().stream()
        .sorted(Comparator.comparing(LibraryTransaction::getId).reversed())
        .map(TransactionResponse::from)
        .toList();
  }

  @PostMapping("/issue")
  public TransactionResponse issueBook(@Valid @RequestBody IssueRequest request) {
    return TransactionResponse.from(libraryService.issueBook(request));
  }

  @PostMapping("/{id}/return")
  public TransactionResponse returnBook(@PathVariable Long id, @Valid @RequestBody ReturnRequest request) {
    return TransactionResponse.from(libraryService.returnBook(id, request));
  }
}
