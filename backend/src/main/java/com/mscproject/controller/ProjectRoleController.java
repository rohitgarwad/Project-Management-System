package com.mscproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mscproject.domain.RoleType;
import com.mscproject.model.ProjectRole;
import com.mscproject.response.MessageResponse;
import com.mscproject.service.ProjectRoleService;

@RestController
@RequestMapping("/api/projects")
public class ProjectRoleController {
	
    @Autowired
    private ProjectRoleService projectRoleService;

    @PostMapping("/{projectId}/users/{userId}/roles/{roleType}")
    public ResponseEntity<MessageResponse> assignRole(@PathVariable Long projectId, @PathVariable Long userId, @PathVariable RoleType roleType) {
        projectRoleService.assignRoleToUserInProject(userId, roleType, projectId);
        MessageResponse messageResponse = new MessageResponse("Role Assigned Successfully.");
        return ResponseEntity.ok(messageResponse);
    }

    @GetMapping("/{projectId}/users/{userId}/roles")
    public ResponseEntity<ProjectRole> getUsersRole(@PathVariable Long projectId, @PathVariable Long userId) {
        ProjectRole roles = projectRoleService.getRolesForUserInProject(userId, projectId);
        return ResponseEntity.ok(roles);
    }
    
    @GetMapping("/{projectId}/roles")
    public ResponseEntity<List<ProjectRole>> getRoles(@PathVariable Long projectId) {
        List<ProjectRole> roles = projectRoleService.getRolesForAllUsersInProject(projectId);
        return ResponseEntity.ok(roles);
    }

    @PutMapping("/{projectId}/users/{userId}/roles")
    public ResponseEntity<ProjectRole> updateRole(@PathVariable Long projectId, @PathVariable Long userId, @RequestParam RoleType oldRoleType, @RequestParam RoleType newRoleType) {
        ProjectRole updatedProjectRole = projectRoleService.updateRoleForUserInProject(userId, projectId, oldRoleType, newRoleType);
        return ResponseEntity.ok(updatedProjectRole);
    }

    @DeleteMapping("/{projectId}/users/{userId}/roles/{roleType}")
    public ResponseEntity<MessageResponse> deleteRole(@PathVariable Long projectId, @PathVariable Long userId, @PathVariable RoleType roleType) {
        projectRoleService.deleteRoleForUserInProject(userId, projectId, roleType);
        MessageResponse messageResponse = new MessageResponse("Project Role Deleted Successfully.");
        return ResponseEntity.ok(messageResponse);
    }
}
