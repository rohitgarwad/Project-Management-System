package com.mscproject.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mscproject.exception.ChatException;
import com.mscproject.exception.ProjectException;
import com.mscproject.exception.UserException;
import com.mscproject.model.Chat;
import com.mscproject.model.Message;
import com.mscproject.model.User;
import com.mscproject.request.CreateMessageRequest;
import com.mscproject.service.MessageService;
import com.mscproject.service.ProjectService;
import com.mscproject.service.UserService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;




    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody CreateMessageRequest request)
            throws UserException, ChatException, ProjectException {
        
        User user = userService.findUserById(request.getSenderId());  
        if(user==null) throw new UserException("user Not found with id "+request.getSenderId());
        Chat chats = projectService.getProjectById(request.getProjectId()).getChat();  // This method should throw ChatException if the chat is not found
        if(chats==null) throw new ChatException("Chats not found");
        Message sentMessage = messageService.sendMessage(request.getSenderId(), request.getProjectId(), request.getContent());
        return ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable Long projectId)
            throws ProjectException, ChatException {
        List<Message> messages = messageService.getMessagesByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }
}

