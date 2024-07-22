package com.mscproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mscproject.domain.RoleType;
import com.mscproject.model.Project;
import com.mscproject.model.ProjectRole;
import com.mscproject.model.User;
import com.mscproject.repository.ProjectRepository;
import com.mscproject.repository.ProjectRoleRepository;
import com.mscproject.repository.UserRepository;

@Service
public class ProjectRoleServiceImpl implements ProjectRoleService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private ProjectRoleRepository projectRoleRepository;

	@Override
	public void assignRoleToUserInProject(Long userId, RoleType roleType, Long projectId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new RuntimeException("Project not found"));

		ProjectRole projectRole = new ProjectRole();
		projectRole.setUser(user);
		projectRole.setRoleType(roleType);
		projectRole.setProject(project);

		projectRoleRepository.save(projectRole);

	}

	@Override
	public ProjectRole getRolesForUserInProject(Long userId, Long projectId) {
		return projectRoleRepository.findByUserIdAndProjectId(userId, projectId);
	}
	
	@Override
	public List<ProjectRole> getRolesForAllUsersInProject(Long projectId) {
		
		return projectRoleRepository.findByProjectId(projectId);
	}
	
	@Override
	public ProjectRole updateRoleForUserInProject(Long userId, Long projectId, RoleType oldRoleType, RoleType newRoleType) {
        
        ProjectRole projectRole = projectRoleRepository.findByUserIdAndRoleTypeAndProjectId(userId, oldRoleType, projectId)
                .orElseThrow(() -> new RuntimeException("Project role not found"));

        projectRole.setRoleType(newRoleType);
        return projectRoleRepository.save(projectRole);
    }

	@Override
    public void deleteRoleForUserInProject(Long userId, Long projectId, RoleType roleType) {

		ProjectRole projectRole = projectRoleRepository.findByUserIdAndRoleTypeAndProjectId(userId, roleType, projectId)
                .orElseThrow(() -> new RuntimeException("Project role not found"));

        projectRoleRepository.delete(projectRole);
    }
}
