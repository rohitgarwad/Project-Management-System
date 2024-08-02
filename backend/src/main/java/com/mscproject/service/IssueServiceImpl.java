package com.mscproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mscproject.exception.IssueException;
import com.mscproject.exception.ProjectException;
import com.mscproject.exception.UserException;
import com.mscproject.model.Issue;
import com.mscproject.model.Project;
import com.mscproject.model.User;
import com.mscproject.repository.IssueRepository;
import com.mscproject.request.IssueReportRequest;
import com.mscproject.request.IssueRequest;

@Service
public class IssueServiceImpl implements IssueService {

	@Autowired
	private IssueRepository issueRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private ProjectService projectService;
	@Autowired
	private NotificationServiceImpl notificationServiceImpl;

	@Override
	public Optional<Issue> getIssueById(Long issueId) throws IssueException {
		Optional<Issue> issue = issueRepository.findById(issueId);
		if (issue.isPresent()) {
			return issue;
		}
		throw new IssueException("No issues found with issueid" + issueId);
	}

	@Override
	public List<Issue> getIssueByProjectId(Long projectId) throws ProjectException {
		projectService.getProjectById(projectId);
		List<Issue> issues = issueRepository.findByProjectId(projectId);
		return issues;
	}

	@Override
	public Issue createIssue(IssueRequest issueRequest, Long userId)
			throws UserException, IssueException, ProjectException {

		getUserOrThrow(userId);

		// Check if the project exists
		Project project = projectService.getProjectById(issueRequest.getProjectId());
		if (project == null) {
			throw new IssueException("Project not found with ID: " + issueRequest.getProjectId());
		}

		// Create a new issue
		Issue issue = new Issue();
		issue.setTitle(issueRequest.getTitle());
		issue.setDescription(issueRequest.getDescription());
		issue.setStatus(issueRequest.getStatus());
		issue.setProjectID(issueRequest.getProjectId());
		issue.setPriority(issueRequest.getPriority());
		issue.setDueDate(issueRequest.getDueDate().plusHours(5).plusMinutes(30));
		issue.setLabels(issueRequest.getLabels());

		// Set the project for the issue
		issue.setProject(project);

		// Save the issue
		return issueRepository.save(issue);
	}

	@Override
	public Optional<Issue> updateIssue(Long issueId, IssueRequest updatedIssue, Long userId)
			throws IssueException, UserException, ProjectException {

		getUserOrThrow(userId);

		Optional<Issue> existingIssue = getIssueById(issueId);

		if (existingIssue.isPresent()) {
			// Check if the project exists
			Project project = projectService.getProjectById(updatedIssue.getProjectId());
			if (project == null) {
				throw new IssueException("Project not found with ID: " + updatedIssue.getProjectId());
			}

			Issue issueToUpdate = existingIssue.get();

			if (updatedIssue.getDescription() != null) {
				issueToUpdate.setDescription(updatedIssue.getDescription());
			}

			if (updatedIssue.getDueDate() != null) {
				issueToUpdate.setDueDate(updatedIssue.getDueDate().plusHours(5).plusMinutes(30));
			}

			if (updatedIssue.getPriority() != null) {
				issueToUpdate.setPriority(updatedIssue.getPriority());
			}

			if (updatedIssue.getStatus() != null) {
				issueToUpdate.setStatus(updatedIssue.getStatus());
			}

			if (updatedIssue.getTitle() != null) {
				issueToUpdate.setTitle(updatedIssue.getTitle());
			}

			if (updatedIssue.getLabels() != null) {
				issueToUpdate.setLabels(updatedIssue.getLabels());
			}

			// Save the updated issue
			return Optional.of(issueRepository.save(issueToUpdate));
		}

		throw new IssueException("Issue not found with issueid" + issueId);
	}

	@Override
	public String deleteIssue(Long issueId, Long userId) throws UserException, IssueException {
		getUserOrThrow(userId);
		Optional<Issue> issueById = getIssueById(issueId);
		if (issueById.isPresent()) {
			issueRepository.deleteById(issueId);
			return "issue with the id" + issueId + "deleted";
		}
		throw new IssueException("Issue not found with issueid" + issueId);
	}

	@Override
	public List<Issue> getIssuesByAssigneeId(Long assigneeId) throws IssueException {
		List<Issue> issues = issueRepository.findByAssigneeId(assigneeId);
		if (issues != null) {
			return issues;
		}
		throw new IssueException("Issues not found");
	}

	private User getUserOrThrow(Long userId) throws UserException {
		User user = userService.findUserById(userId);

		if (user != null) {
			return user;
		} else {
			throw new UserException("User not found with id: " + userId);
		}
	}

	@Override
	public List<Issue> searchIssues(String title, String status, String priority, Long assigneeId)
			throws IssueException {
		List<Issue> searchIssues = issueRepository.searchIssues(title, status, priority, assigneeId);
		if (searchIssues != null) {
			return searchIssues;
		}
		throw new IssueException("No Issues found");
	}

	@Override
	public List<User> getAssigneeForIssue(Long issueId) throws IssueException {
		return null;
	}

	@Override
	public Issue addUserToIssue(Long issueId, Long userId) throws UserException, IssueException {
		User user = userService.findUserById(userId);
		Optional<Issue> issue = getIssueById(issueId);

		if (issue.isEmpty())
			throw new IssueException("issue not exist");

		issue.get().setAssignee(user);
		notifyAssignee(user.getEmail(), "New Issue Assigned To You", "New Issue Assign To You");
		return issueRepository.save(issue.get());

	}

	@Override
	public Issue updateStatus(Long issueId, String status) throws IssueException {
		Optional<Issue> optionalIssue = issueRepository.findById(issueId);
		if (optionalIssue.isEmpty()) {
			throw new IssueException("issue not found");
		}
		Issue issue = optionalIssue.get();
		issue.setStatus(status);

		return issueRepository.save(issue);
	}

	private void notifyAssignee(String email, String subject, String body) {
		// System.out.println("IssueServiceImpl.notifyAssignee()");
		notificationServiceImpl.sendNotification(email, subject, body);
	}

	@Override
	public void sendIssueReport(IssueReportRequest issueReportData) throws Exception {

		String subject = "Issue Report from " + issueReportData.getSenderEmail();

		String body = "Issue Report From: " + issueReportData.getSenderEmail() + ".\nIssue Report To: "
				+ issueReportData.getReceiverEmail() + ".\nIssue Title: " + issueReportData.getIssueTitle()
				+ ".\nIssue Status: " + issueReportData.getIssueStatus() + ".\nReport Message: "
				+ issueReportData.getReportMessage() + ".";

		notificationServiceImpl.sendIssueReportNotification(issueReportData.getSenderEmail(),
				issueReportData.getReceiverEmail(), subject, body);
	}

}
