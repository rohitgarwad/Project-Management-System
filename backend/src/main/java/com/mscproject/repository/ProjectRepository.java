package com.mscproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mscproject.model.Project;
import com.mscproject.model.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	List<Project> findByOwner(User owner);

	Optional<Project> findByName(String name);

	List<Project> findByNameContainingAndTeamContains(String partialName, User user);

	List<Project> findByNameContainingAndTeamContaining(String partialName, User user);

	@Query("SELECT p FROM Project p JOIN p.team t WHERE t = :user")
	List<Project> findProjectsByTeam(@Param("user") User user);

	List<Project> findByTeamContainingOrOwner(User user, User owner);

}
