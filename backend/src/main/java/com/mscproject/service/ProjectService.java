package com.mscproject.service;

import java.util.List;

import com.mscproject.exception.ChatException;
import com.mscproject.exception.ProjectException;
import com.mscproject.exception.UserException;
import com.mscproject.model.Chat;
import com.mscproject.model.Project;
import com.mscproject.model.User;

public interface ProjectService {
	Project createProject(Project project, Long userId) throws UserException;

	List<Project> getProjectsByTeam(User user, String category, String tag) throws ProjectException;

	Project getProjectById(Long projectId) throws ProjectException;

	String deleteProject(Long projectId, Long userId) throws UserException;

	Project updateProject(Project updatedProject, Long id) throws ProjectException;

	List<Project> searchProjects(String keyword, User user) throws ProjectException;

	void addUserToProject(Long projectId, Long userId) throws UserException, ProjectException;

	void removeUserFromProject(Long projectId, Long userId) throws UserException, ProjectException;

	Chat getChatByProjectId(Long projectId) throws ProjectException, ChatException;

}
