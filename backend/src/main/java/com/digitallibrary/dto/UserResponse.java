package com.digitallibrary.dto;

import com.digitallibrary.model.UserAccount;

public record UserResponse(
    Long id,
    String name,
    String email,
    String password,
    String role,
    String department,
    String membershipId) {
  public static UserResponse from(UserAccount user) {
    return new UserResponse(
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getPassword(),
        user.getRole().name(),
        user.getDepartment(),
        user.getMembershipId());
  }
}
