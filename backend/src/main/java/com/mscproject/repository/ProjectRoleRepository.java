package com.mscproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mscproject.domain.RoleType;
import com.mscproject.model.ProjectRole;

public interface ProjectRoleRepository extends JpaRepository<ProjectRole, Long> {
	ProjectRole findByUserIdAndProjectId(Long userId, Long projectId);

	List<ProjectRole> findByProjectId(Long projectId);

	Optional<ProjectRole> findByUserIdAndRoleTypeAndProjectId(Long userId, RoleType roleType, Long projectId);
}
