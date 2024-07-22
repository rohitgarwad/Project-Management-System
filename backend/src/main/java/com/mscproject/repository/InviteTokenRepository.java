package com.mscproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mscproject.model.Invitation;

public interface InviteTokenRepository extends JpaRepository<Invitation, Long> {

	void deleteByToken(String token);

    Invitation findByToken(String token);

	Invitation findByEmail(String userEmail);
}
