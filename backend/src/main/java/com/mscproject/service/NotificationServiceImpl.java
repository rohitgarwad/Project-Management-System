package com.mscproject.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl {

    private final JavaMailSender javaMailSender;

    public NotificationServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendNotification(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }
    
    public void sendIssueReportNotification(String from, String to, String subject, String body) {
    	SimpleMailMessage message = new SimpleMailMessage();
    	message.setFrom(from);
    	message.setTo(to);
    	message.setSubject(subject);
    	message.setText(body);
    	javaMailSender.send(message);
    }
}

