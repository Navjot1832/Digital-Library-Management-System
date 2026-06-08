package com.digitallibrary.service;

import com.digitallibrary.dto.BookRequest;
import com.digitallibrary.dto.IssueRequest;
import com.digitallibrary.dto.RegisterRequest;
import com.digitallibrary.dto.ReturnRequest;
import com.digitallibrary.model.Book;
import com.digitallibrary.model.BookStatus;
import com.digitallibrary.model.LibraryTransaction;
import com.digitallibrary.model.TransactionStatus;
import com.digitallibrary.model.UserAccount;
import com.digitallibrary.model.UserRole;
import com.digitallibrary.repository.BookRepository;
import com.digitallibrary.repository.TransactionRepository;
import com.digitallibrary.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.time.temporal.ChronoUnit;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LibraryService {
  private final UserRepository userRepository;
  private final BookRepository bookRepository;
  private final TransactionRepository transactionRepository;

  public LibraryService(
      UserRepository userRepository,
      BookRepository bookRepository,
      TransactionRepository transactionRepository) {
    this.userRepository = userRepository;
    this.bookRepository = bookRepository;
    this.transactionRepository = transactionRepository;
  }

  public UserAccount register(RegisterRequest request) {
    if (userRepository.existsByEmailIgnoreCase(request.email())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
    }

    UserAccount user = new UserAccount();
    user.setName(request.name());
    user.setEmail(request.email());
    user.setPassword(request.password());
    user.setRole(UserRole.user);
    user.setDepartment(request.department());
    user.setMembershipId("DL-" + System.currentTimeMillis() % 100000);
    return userRepository.save(user);
  }

  public UserAccount login(String email, String password, String role) {
    UserAccount user = userRepository.findByEmailIgnoreCase(email)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

    if (!user.getPassword().equals(password) || (role != null && !role.isBlank() && !user.getRole().name().equals(role))) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    return user;
  }

  public Book createBook(BookRequest request) {
    Book book = new Book();
    applyBookRequest(book, request);
    return bookRepository.save(book);
  }

  public Book updateBook(Long id, BookRequest request) {
    Book book = bookRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
    applyBookRequest(book, request);
    return bookRepository.save(book);
  }

  @Transactional
  public void deleteBook(Long id) {
    if (!bookRepository.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found");
    }
    transactionRepository.deleteByBookId(id);
    bookRepository.deleteById(id);
  }

  @Transactional
  public LibraryTransaction issueBook(IssueRequest request) {
    Book book = bookRepository.findById(request.bookId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
    UserAccount user = userRepository.findById(request.userId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

    if (book.getStatus() != BookStatus.Available) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Book is already issued");
    }

    LibraryTransaction transaction = new LibraryTransaction();
    transaction.setBook(book);
    transaction.setUser(user);
    transaction.setIssueDate(request.issueDate());
    transaction.setDueDate(request.issueDate().plusDays(15));
    transaction.setFine(0);
    transaction.setStatus(TransactionStatus.Issued);

    book.setStatus(BookStatus.Issued);
    bookRepository.save(book);
    return transactionRepository.save(transaction);
  }

  @Transactional
  public LibraryTransaction returnBook(Long transactionId, ReturnRequest request) {
    LibraryTransaction transaction = transactionRepository.findWithDetailsById(transactionId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found"));

    transaction.setReturnDate(request.returnDate());
    transaction.setFine(calculateFine(transaction.getDueDate(), request.returnDate()));
    transaction.setStatus(TransactionStatus.Returned);

    Book book = transaction.getBook();
    book.setStatus(BookStatus.Available);
    bookRepository.save(book);
    return transactionRepository.save(transaction);
  }

  private void applyBookRequest(Book book, BookRequest request) {
    book.setTitle(request.title());
    book.setAuthor(request.author());
    book.setCategory(request.category());
    book.setStatus(request.status() == null || request.status().isBlank()
        ? BookStatus.Available
        : BookStatus.valueOf(request.status()));
    book.setDescription(request.description());
  }

  private int calculateFine(java.time.LocalDate dueDate, java.time.LocalDate returnDate) {
    long lateDays = Math.max(0, ChronoUnit.DAYS.between(dueDate, returnDate));
    return (int) lateDays * 10;
  }
}
