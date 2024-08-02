package com.mscproject.service;

import com.mscproject.domain.PlanType;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

public interface PaypalService {
	public Payment createPayment(PlanType planType) throws PayPalRESTException;
}
