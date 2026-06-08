package com.digitallibrary.repository;

import com.digitallibrary.model.LibraryTransaction;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<LibraryTransaction, Long> {
  @Override
  @EntityGraph(attributePaths = {"book", "user"})
  List<LibraryTransaction> findAll();

  @EntityGraph(attributePaths = {"book", "user"})
  Optional<LibraryTransaction> findWithDetailsById(Long id);

  void deleteByBookId(Long bookId);
}
