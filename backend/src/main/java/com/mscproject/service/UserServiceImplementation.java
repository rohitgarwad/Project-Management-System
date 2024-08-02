package com.mscproject.service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mscproject.config.JwtProvider;
import com.mscproject.exception.ProjectException;
import com.mscproject.exception.UserException;
import com.mscproject.model.PasswordResetToken;
import com.mscproject.model.User;
import com.mscproject.repository.PasswordResetTokenRepository;
import com.mscproject.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordResetTokenRepository passwordResetTokenRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException, ProjectException {
		String email = JwtProvider.getEmailFromJwtToken(jwt);

		User user = userRepository.findByEmail(email);

		userRepository.save(user);

		if (user == null) {
			throw new UserException("user not exist with email " + email);
		}
		return user;
	}

	@Override
	public User findUserByEmail(String username) throws UserException {

		User user = userRepository.findByEmail(username);

		if (user != null) {

			return user;
		}

		throw new UserException("user not exist with username " + username);
	}

	@Override
	public User findUserById(Long userId) throws UserException {
		Optional<User> opt = userRepository.findById(userId);

		if (opt.isEmpty()) {
			throw new UserException("user not found with id " + userId);
		}
		return opt.get();
	}

	@Override
	public User updateUsersProjectSize(User user, int number) {
		user.setProjectSize(user.getProjectSize() + number);
		if (user.getProjectSize() == -1) {
			return user;
		}
		return userRepository.save(user);
	}

	@Override
	public void updatePassword(User user, String newPassword) {
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);
	}

	@Override
	public void sendPasswordResetEmail(User user) {

		// Generate a random token (you might want to use a library for this)
		String resetToken = generateRandomToken();

		// Calculate expiry date
		Date expiryDate = calculateExpiryDate();

		// Save the token in the database
		PasswordResetToken passwordResetToken = new PasswordResetToken(resetToken, user, expiryDate);
		passwordResetTokenRepository.save(passwordResetToken);

		// Send an email containing the reset link
		sendEmail(user.getEmail(), "Password Reset",
				"Click the following link to reset your password: http://localhost:5054/reset-password?token="
						+ resetToken);
	}

	private void sendEmail(String to, String subject, String message) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();

		mailMessage.setTo(to);
		mailMessage.setSubject(subject);
		mailMessage.setText(message);

		javaMailSender.send(mailMessage);
	}

	private String generateRandomToken() {
		return UUID.randomUUID().toString();
	}

	private Date calculateExpiryDate() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.add(Calendar.MINUTE, 10);
		return cal.getTime();
	}

}
