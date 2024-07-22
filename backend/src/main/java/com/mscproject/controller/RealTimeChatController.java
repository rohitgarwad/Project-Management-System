package com.mscproject.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeChatController {


	@MessageMapping("/message") // will get all the message coming from app/message
	@SendTo("/chatroom/public") // will broadcast the msg to chatroom
	public String receivePublicMessage(@Payload String message) {
		//System.out.println("message........"+ message);
		return message;
	}
	
	@MessageMapping("/refresh")
	@SendTo("/all/public")
	public String toRefresh(@Payload String message) {
		System.out.println("message........"+ message);
		return message;
	}

}
