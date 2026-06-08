package com.digitallibrary.config;

import com.digitallibrary.model.Book;
import com.digitallibrary.model.BookStatus;
import com.digitallibrary.model.LibraryTransaction;
import com.digitallibrary.model.TransactionStatus;
import com.digitallibrary.model.UserAccount;
import com.digitallibrary.model.UserRole;
import com.digitallibrary.repository.BookRepository;
import com.digitallibrary.repository.TransactionRepository;
import com.digitallibrary.repository.UserRepository;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
  @Bean
  CommandLineRunner seedData(
      UserRepository userRepository,
      BookRepository bookRepository,
      TransactionRepository transactionRepository) {
    return args -> {
      if (userRepository.count() > 0) {
        return;
      }

      UserAccount admin = user("Aarav Mehta", "admin@library.com", "Admin@123", UserRole.admin,
          "Library Administration", "ADM-101");
      UserAccount john = user("John", "student@library.com", "Student@123", UserRole.user,
          "Computer Science", "STD-204");
      UserAccount rohan = user("Rohan Verma", "rohan@college.edu", "User@123", UserRole.user,
          "Electronics", "STD-327");
      userRepository.save(admin);
      userRepository.save(john);
      userRepository.save(rohan);

      Book cleanCode = book("Clean Code", "Robert C. Martin", "Programming", BookStatus.Issued,
          "A handbook of agile software craftsmanship.");
      Book algorithms = book("Introduction to Algorithms", "Thomas H. Cormen", "Computer Science",
          BookStatus.Available, "Algorithm design, analysis, and implementation.");
      Book design = book("The Design of Everyday Things", "Don Norman", "Design", BookStatus.Available,
          "Human-centered design principles for products and systems.");
      Book database = book("Database System Concepts", "Abraham Silberschatz", "Database", BookStatus.Issued,
          "Core concepts in database architecture and queries.");
      Book habits = book("Atomic Habits", "James Clear", "Self Development", BookStatus.Available,
          "Practical techniques for building good habits.");
      Book ai = book("Artificial Intelligence: A Modern Approach", "Stuart Russell", "AI", BookStatus.Available,
          "Comprehensive introduction to AI concepts and systems.");
      bookRepository.save(cleanCode);
      bookRepository.save(algorithms);
      bookRepository.save(design);
      bookRepository.save(database);
      bookRepository.save(habits);
      bookRepository.save(ai);

      transactionRepository.save(transaction(cleanCode, john, "2026-04-04", "2026-04-18", null, 20, TransactionStatus.Issued));
      transactionRepository.save(transaction(database, rohan, "2026-04-07", "2026-04-21", null, 0, TransactionStatus.Issued));
      transactionRepository.save(transaction(habits, john, "2026-03-10", "2026-03-24", "2026-03-23", 0, TransactionStatus.Returned));
    };
  }

  private UserAccount user(
      String name,
      String email,
      String password,
      UserRole role,
      String department,
      String membershipId) {
    UserAccount user = new UserAccount();
    user.setName(name);
    user.setEmail(email);
    user.setPassword(password);
    user.setRole(role);
    user.setDepartment(department);
    user.setMembershipId(membershipId);
    return user;
  }

  private Book book(String title, String author, String category, BookStatus status, String description) {
    Book book = new Book();
    book.setTitle(title);
    book.setAuthor(author);
    book.setCategory(category);
    book.setStatus(status);
    book.setDescription(description);
    return book;
  }

  private LibraryTransaction transaction(
      Book book,
      UserAccount user,
      String issueDate,
      String dueDate,
      String returnDate,
      int fine,
      TransactionStatus status) {
    LibraryTransaction transaction = new LibraryTransaction();
    transaction.setBook(book);
    transaction.setUser(user);
    transaction.setIssueDate(LocalDate.parse(issueDate));
    transaction.setDueDate(LocalDate.parse(dueDate));
    transaction.setReturnDate(returnDate == null ? null : LocalDate.parse(returnDate));
    transaction.setFine(fine);
    transaction.setStatus(status);
    return transaction;
  }
}
