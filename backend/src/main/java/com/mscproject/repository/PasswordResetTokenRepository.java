package com.mscproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mscproject.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}
