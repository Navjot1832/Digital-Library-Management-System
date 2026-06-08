package com.digitallibrary.controller;

import com.digitallibrary.dto.SummaryResponse;
import com.digitallibrary.model.BookStatus;
import com.digitallibrary.model.UserRole;
import com.digitallibrary.repository.BookRepository;
import com.digitallibrary.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
  private final BookRepository bookRepository;
  private final UserRepository userRepository;

  public DashboardController(BookRepository bookRepository, UserRepository userRepository) {
    this.bookRepository = bookRepository;
    this.userRepository = userRepository;
  }

  @GetMapping("/summary")
  public SummaryResponse summary() {
    return new SummaryResponse(
        bookRepository.count(),
        bookRepository.countByStatus(BookStatus.Issued),
        userRepository.countByRole(UserRole.user));
  }
}
