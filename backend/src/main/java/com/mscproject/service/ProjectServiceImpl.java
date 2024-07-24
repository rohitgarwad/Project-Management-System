package com.mscproject.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mscproject.domain.RoleType;
import com.mscproject.exception.ChatException;
import com.mscproject.exception.ProjectException;
import com.mscproject.exception.UserException;
import com.mscproject.model.Chat;
import com.mscproject.model.Issue;
import com.mscproject.model.Project;
import com.mscproject.model.User;
import com.mscproject.repository.ProjectRepository;

import jakarta.transaction.Transactional;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private ChatService chatService;

	@Autowired
	private UserService userService;
	
	@Autowired
	private ProjectRoleService projectRoleService;

	@Override
	public Project createProject(Project project, Long id) throws UserException {
		User user = userService.findUserById(id);
		Project createdProject = new Project();

		createdProject.setOwner(user);
		createdProject.setTags(project.getTags());
		createdProject.setName(project.getName());
		createdProject.setCategory(project.getCategory());
		createdProject.setDescription(project.getDescription());
		createdProject.setDeadline(project.getDeadline().plusDays(1));
		createdProject.setStatus("in-progress");

		// System.out.println(createdProject);
		Project savedProject = projectRepository.save(createdProject);

		savedProject.getTeam().add(user);

		Chat chat = new Chat();
		chat.setProject(savedProject);
		Chat projectChat = chatService.createChat(chat);
		savedProject.setChat(projectChat);
		
		//assign role to user in project
		projectRoleService.assignRoleToUserInProject(id, RoleType.OWNER, savedProject.getId());

		return savedProject;
	}

	@Override
	public List<Project> getProjectsByTeam(User user, String category, String tag) throws ProjectException {
		List<Project> projects = projectRepository.findByTeamContainingOrOwner(user, user);

		if (category != null) {
			projects = projects.stream().filter(project -> project.getCategory().equals(category))
					.map(project -> updateProjectStatus(project)).collect(Collectors.toList());
		}

		if (tag != null) {
			projects = projects.stream().filter(project -> project.getTags().contains(tag))
					.map(project -> updateProjectStatus(project)).collect(Collectors.toList());
		}

		return projects.stream().map(project -> updateProjectStatus(project)).collect(Collectors.toList());
	}

	@Override
	public Project getProjectById(Long projectId) throws ProjectException {
		Optional<Project> project = projectRepository.findById(projectId);
		if (project.isPresent()) {
			return updateProjectStatus(project.get());
			// return project.get();
		}
		throw new ProjectException("No project exists with the id " + projectId);
	}

	@Override
	public String deleteProject(Long projectId, Long id) throws UserException {
		User user = userService.findUserById(id);
		// System.out.println("user ____>" + user);
		if (user != null) {
			projectRepository.deleteById(projectId);
			return "project deleted";
		}
		throw new UserException("User doesnot exists");
	}

	@Override
	public Project updateProject(Project updatedProject, Long id) throws ProjectException {
		Project project = getProjectById(id);

		if (project != null) {
			// Update the existing project with the fields from updatedProject
			if (updatedProject.getName() != null) {
				project.setName(updatedProject.getName());
			}

			if (updatedProject.getDescription() != null) {
				project.setDescription(updatedProject.getDescription());
			}

			if (updatedProject.getTags() != null) {
				project.setTags(updatedProject.getTags());
			}

			if (updatedProject.getCategory() != null) {
				project.setCategory(updatedProject.getCategory());
			}

			if (updatedProject.getDeadline() != null) {
				project.setDeadline(updatedProject.getDeadline().plusDays(1));
			}

			// Save the updated project once
			return projectRepository.save(project);
		}

		throw new ProjectException("Project does not exist");
	}

	@Override
	public List<Project> searchProjects(String keyword, User user) throws ProjectException {

		List<Project> list = projectRepository.findByNameContainingAndTeamContains(keyword, user);
		if (list != null) {
			return list;
		}
		throw new ProjectException("No Projects available");
	}

	@Override
	@Transactional
	public void addUserToProject(Long projectId, Long userId) throws UserException, ProjectException {
		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new ProjectException("project not found"));
		User user = userService.findUserById(userId);

		if (!project.getTeam().contains(user)) {
			project.getChat().getUsers().add(user);
			project.getTeam().add(user);
			projectRepository.save(project);
			projectRoleService.assignRoleToUserInProject(userId, RoleType.EMPLOYEE, projectId);
		}

	}

	@Override
	public void removeUserFromProject(Long projectId, Long userId) throws UserException, ProjectException {
		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new ProjectException("project not found"));
		User user = userService.findUserById(userId);

		if (project.getTeam().contains(user)) {
			project.getTeam().remove(user);
			project.getChat().getUsers().remove(user);
		}

	}

	@Override
	public Chat getChatByProjectId(Long projectId) throws ProjectException, ChatException {
		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new ProjectException("Project not found"));
		if (project != null)
			return project.getChat();

		throw new ChatException("no chats found");

	}

	public List<User> getUsersByProjectId(Long projectId) throws ProjectException {
		Project project = projectRepository.findById(projectId).orElse(null);
		if (project != null)
			return project.getChat().getUsers();

		throw new ProjectException("no project found with id " + projectId);
	}

	public Project updateProjectStatus(Project project) {

		String status = null;
		boolean isDone = true;
		List<Issue> issues = project.getIssues();
		// System.out.println("issuelength.........."+issues.size());

		if (issues.isEmpty()) {
			status = "in-progress";
		} else {
			for (Issue issue : issues) {
				// System.out.println("issueStatus.........."+issue.getId()+issue.getStatus());
				if (!issue.getStatus().equals("done")) {
					isDone = false;
					break;
				} else {
					isDone = true;
				}
			}
			if (isDone) {
				status = "done";
			} else {
				status = "in-progress";
			}
		}

		// System.out.println("projectStatus........."+status);
		project.setStatus(status);

		return projectRepository.save(project);
	}

}
