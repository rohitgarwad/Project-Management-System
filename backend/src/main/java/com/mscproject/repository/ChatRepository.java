package com.mscproject.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.mscproject.model.Chat;
import com.mscproject.model.Project;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    

	Chat findByProject(Project projectById);
	
}

