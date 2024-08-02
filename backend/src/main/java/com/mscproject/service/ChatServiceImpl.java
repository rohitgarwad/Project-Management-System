package com.mscproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mscproject.model.Chat;
import com.mscproject.repository.ChatRepository;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatRepository chatRepository;

	@Override
	public Chat createChat(Chat chat) {
		return chatRepository.save(chat);
	}
}
