package com.mscproject.service;

import java.util.List;

import com.mscproject.domain.RoleType;
import com.mscproject.model.ProjectRole;

public interface ProjectRoleService {

	public void assignRoleToUserInProject(Long userId, RoleType roleName, Long projectId);

	public ProjectRole getRolesForUserInProject(Long userId, Long projectId);

	public List<ProjectRole> getRolesForAllUsersInProject(Long projectId);

	public ProjectRole updateRoleForUserInProject(Long userId, Long projectId, RoleType oldRoleType,
			RoleType newRoleType);

	public void deleteRoleForUserInProject(Long userId, Long projectId, RoleType roleType);
}
