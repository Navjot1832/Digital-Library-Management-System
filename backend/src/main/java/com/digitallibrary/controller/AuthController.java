package com.digitallibrary.controller;

import com.digitallibrary.dto.LoginRequest;
import com.digitallibrary.dto.RegisterRequest;
import com.digitallibrary.dto.UserResponse;
import com.digitallibrary.service.LibraryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final LibraryService libraryService;

  public AuthController(LibraryService libraryService) {
    this.libraryService = libraryService;
  }

  @PostMapping("/login")
  public UserResponse login(@Valid @RequestBody LoginRequest request) {
    return UserResponse.from(libraryService.login(request.email(), request.password(), request.role()));
  }

  @PostMapping("/register")
  public UserResponse register(@Valid @RequestBody RegisterRequest request) {
    return UserResponse.from(libraryService.register(request));
  }
}
