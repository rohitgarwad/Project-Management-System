package com.mscproject.controller;

import com.mscproject.domain.PlanType;
import com.mscproject.response.PaymentLinkResponse;
import com.mscproject.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/payments")
public class PaymentController {

	@Autowired
	private PaypalService paypalService;

	@PostMapping("/{planType}")
	public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable PlanType planType,
			@RequestHeader("Authorization") String jwt) throws Exception {

		PaymentLinkResponse res = new PaymentLinkResponse();

		try {

			Payment payment = paypalService.createPayment(planType);
			//System.out.println("payment object: " + payment);

			for (Links links : payment.getLinks()) {
				if (links.getRel().equals("approval_url")) {
					res.setPayment_link_url(links.getHref());
				}
			}

		} catch (PayPalRESTException e) {
			log.error("Error occurred: ", e);
			res.setPayment_link_url("http://localhost:5173/upgrade_plan/failure");
			return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
//				throw new Exception("payment failed.");
		}
		return new ResponseEntity<>(res, HttpStatus.CREATED);

	}

}
