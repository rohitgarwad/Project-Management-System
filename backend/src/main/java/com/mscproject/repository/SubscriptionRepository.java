package com.mscproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mscproject.model.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
	Subscription findByUserId(Long userId);
}
