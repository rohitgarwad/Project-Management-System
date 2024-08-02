package com.mscproject.service;

import com.mscproject.domain.PlanType;
import com.mscproject.model.Subscription;
import com.mscproject.model.User;

public interface SubscriptionService {
	Subscription createSubscription(User user);

	Subscription getUserSubscription(Long userId) throws Exception;

	Subscription upgradeSubscription(Long userId, PlanType planType);

	boolean isValid(Subscription subscription);
}
