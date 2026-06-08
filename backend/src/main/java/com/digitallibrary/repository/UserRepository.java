package com.digitallibrary.repository;

import com.digitallibrary.model.UserAccount;
import com.digitallibrary.model.UserRole;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserAccount, Long> {
  Optional<UserAccount> findByEmailIgnoreCase(String email);

  long countByRole(UserRole role);

  boolean existsByEmailIgnoreCase(String email);
}
