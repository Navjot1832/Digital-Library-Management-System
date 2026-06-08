package com.digitallibrary.controller;

import com.digitallibrary.dto.BookRequest;
import com.digitallibrary.model.Book;
import com.digitallibrary.repository.BookRepository;
import com.digitallibrary.service.LibraryService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/books")
public class BookController {
  private final BookRepository bookRepository;
  private final LibraryService libraryService;

  public BookController(BookRepository bookRepository, LibraryService libraryService) {
    this.bookRepository = bookRepository;
    this.libraryService = libraryService;
  }

  @GetMapping
  public List<Book> allBooks() {
    return bookRepository.findAll();
  }

  @PostMapping
  public Book createBook(@Valid @RequestBody BookRequest request) {
    return libraryService.createBook(request);
  }

  @PutMapping("/{id}")
  public Book updateBook(@PathVariable Long id, @Valid @RequestBody BookRequest request) {
    return libraryService.updateBook(id, request);
  }

  @DeleteMapping("/{id}")
  public void deleteBook(@PathVariable Long id) {
    libraryService.deleteBook(id);
  }
}
