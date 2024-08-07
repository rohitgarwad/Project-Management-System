package com.mscproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mscproject.model.PasswordResetToken;
import com.mscproject.repository.PasswordResetTokenRepository;

@Service
public class PasswordResetTokenServiceImplementation implements PasswordResetTokenService {	//NOT USED YET
	@Autowired
	private PasswordResetTokenRepository passwordResetTokenRepository;

	@Override
	public PasswordResetToken findByToken(String token) {
		PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
		return passwordResetToken;
	}

	@Override
	public void delete(PasswordResetToken resetToken) {
		passwordResetTokenRepository.delete(resetToken);

	}

}
