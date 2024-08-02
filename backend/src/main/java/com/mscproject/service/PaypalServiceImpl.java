package com.mscproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mscproject.domain.PlanType;
import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaypalServiceImpl implements PaypalService {

	private final APIContext apiContext;

	public Payment createPayment(PlanType planType) throws PayPalRESTException {

		String cancelUrl = "http://localhost:5173/upgrade_plan";
		String successUrl = "http://localhost:5173/upgrade_plan/success?planType=" + planType;
		String description = "Payment description";
		String currency = "USD";
		String intent = "sale";
		String method = "paypal";

		double total = 10.0;

		if (planType.equals(PlanType.ANNUALLY)) {
			total = total * 12;
			total = (double) (total * 0.7);
		}

		Amount amount = new Amount();
		amount.setCurrency(currency);
		// amount.setTotal(String.format(Locale.forLanguageTag(currency), "%.2f",
		// total));
		amount.setTotal("" + total);

		Transaction transaction = new Transaction();
		transaction.setDescription(description);
		transaction.setAmount(amount);

		List<Transaction> transactions = new ArrayList<>();
		transactions.add(transaction);

		Payer payer = new Payer();
		payer.setPaymentMethod(method);

		Payment payment = new Payment();
		payment.setIntent(intent);
		payment.setPayer(payer);
		payment.setTransactions(transactions);

		RedirectUrls redirectUrls = new RedirectUrls();
		redirectUrls.setCancelUrl(cancelUrl);
		redirectUrls.setReturnUrl(successUrl);

		payment.setRedirectUrls(redirectUrls);

		return payment.create(apiContext);

	}

//	public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
//
//		Payment payment = new Payment();
//		payment.setId(paymentId);
//
//		PaymentExecution paymentExecution = new PaymentExecution();
//		paymentExecution.setPayerId(payerId);
//
//		return payment.execute(apiContext, paymentExecution);
//	}

}
