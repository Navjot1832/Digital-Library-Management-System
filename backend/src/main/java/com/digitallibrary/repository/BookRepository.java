package com.digitallibrary.repository;

import com.digitallibrary.model.Book;
import com.digitallibrary.model.BookStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
  long countByStatus(BookStatus status);
}
