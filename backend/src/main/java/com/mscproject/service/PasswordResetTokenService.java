package com.mscproject.service;

import com.mscproject.model.PasswordResetToken;

public interface PasswordResetTokenService {	//NOT USED YET

	public PasswordResetToken findByToken(String token);

	public void delete(PasswordResetToken resetToken);

}
