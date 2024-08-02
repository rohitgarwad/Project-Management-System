package com.mscproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mscproject.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByEmail(String email);

}
