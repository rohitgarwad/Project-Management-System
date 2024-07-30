package com.mscproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mscproject.DTO.IssueDTO;
import com.mscproject.exception.IssueException;
import com.mscproject.exception.ProjectException;
import com.mscproject.exception.UserException;
import com.mscproject.model.Issue;
import com.mscproject.model.User;
import com.mscproject.request.IssueReportRequest;
import com.mscproject.request.IssueRequest;
import com.mscproject.response.AuthResponse;
import com.mscproject.response.MessageResponse;
import com.mscproject.service.IssueService;
import com.mscproject.service.UserService;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

	@Autowired
	private IssueService issueService;

	@Autowired
	private UserService userService;

	@GetMapping("/{issueId}")
	public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId) throws IssueException {
		return ResponseEntity.ok(issueService.getIssueById(issueId).get());

	}

	@GetMapping("/project/{projectId}")
	public ResponseEntity<List<Issue>> getIssueByProjectId(@PathVariable Long projectId) throws ProjectException {
		return ResponseEntity.ok(issueService.getIssueByProjectId(projectId));

	}

	@PostMapping
	public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueRequest issue,
			@RequestHeader("Authorization") String token) throws UserException, IssueException, ProjectException {
		// System.out.println("issue-----"+issue);
		User tokenUser = userService.findUserProfileByJwt(token);
		User user = userService.findUserById(tokenUser.getId());

		if (user != null) {

			Issue createdIssue = issueService.createIssue(issue, tokenUser.getId());
			IssueDTO issueDTO = new IssueDTO();
			issueDTO.setDescription(createdIssue.getDescription());
			issueDTO.setDueDate(createdIssue.getDueDate());
			issueDTO.setId(createdIssue.getId());
			issueDTO.setPriority(createdIssue.getPriority());
			issueDTO.setProject(createdIssue.getProject());
			issueDTO.setProjectID(createdIssue.getProjectID());
			issueDTO.setStatus(createdIssue.getStatus());
			issueDTO.setTitle(createdIssue.getTitle());
			issueDTO.setLabels(createdIssue.getLabels());
			issueDTO.setAssignee(createdIssue.getAssignee());

			return ResponseEntity.ok(issueDTO);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@PutMapping("/{issueId}")
	public ResponseEntity<Issue> updateIssue(@PathVariable Long issueId, @RequestBody IssueRequest updatedIssue,
			@RequestHeader("Authorization") String token) throws IssueException, UserException, ProjectException {
		User user = userService.findUserProfileByJwt(token);

		Issue updated = issueService.updateIssue(issueId, updatedIssue, user.getId()).get();

		return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{issueId}")
	public ResponseEntity<AuthResponse> deleteIssue(@PathVariable Long issueId,
			@RequestHeader("Authorization") String token) throws UserException, IssueException, ProjectException {
		User user = userService.findUserProfileByJwt(token);
		issueService.deleteIssue(issueId, user.getId());

		AuthResponse res = new AuthResponse();
		res.setMessage("Issue deleted");
		res.setStatus(true);

		return ResponseEntity.ok(res);

	}

	@GetMapping("/search")
	public ResponseEntity<List<Issue>> searchIssues(@RequestParam(required = false) String title,
			@RequestParam(required = false) String status, @RequestParam(required = false) String priority,
			@RequestParam(required = false) Long assigneeId) throws IssueException {
		// You can add more parameters as needed for your filtering criteria
		// Use the parameters to build a search query and call the service method

		List<Issue> filteredIssues = issueService.searchIssues(title, status, priority, assigneeId);

		return ResponseEntity.ok(filteredIssues);
	}

	@PutMapping("/{issueId}/assignee/{userId}")
	public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueId, @PathVariable Long userId)
			throws UserException, IssueException {

		Issue issue = issueService.addUserToIssue(issueId, userId);

		return ResponseEntity.ok(issue);

	}

	@GetMapping("/assignee/{assigneeId}")
	public ResponseEntity<List<Issue>> getIssuesByAssigneeId(@PathVariable Long assigneeId) throws IssueException {
		List<Issue> issues = issueService.getIssuesByAssigneeId(assigneeId);
		return ResponseEntity.ok(issues);
	}

	@PutMapping("/{issueId}/status/{status}")
	public ResponseEntity<Issue> updateIssueStatus(@PathVariable String status, @PathVariable Long issueId)
			throws IssueException {
		Issue issue = issueService.updateStatus(issueId, status);
		return ResponseEntity.ok(issue);
	}

	@PostMapping("/report")
	public ResponseEntity<MessageResponse> sendIssueReport(@RequestBody IssueReportRequest issueReportData,
			@RequestHeader("Authorization") String token) throws Exception {
		issueService.sendIssueReport(issueReportData);
		MessageResponse messageResponse = new MessageResponse();
		messageResponse.setMessage("Report sent successfully !");
		return ResponseEntity.ok(messageResponse);
	}

}
