package com.mscproject.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mscproject.exception.IssueException;
import com.mscproject.exception.UserException;
import com.mscproject.model.Issue;
import com.mscproject.model.User;
import com.mscproject.model.WorkUpload;
import com.mscproject.repository.IssueRepository;
import com.mscproject.repository.UserRepository;
import com.mscproject.repository.WorkUploadRepository;

@Service
public class WorkUploadServiceImpl implements WorkUploadService {

	@Autowired
	private WorkUploadRepository workUploadRepository;
	@Autowired
	private IssueRepository issueRepository;
	@Autowired
	private UserRepository userRepository;

	@Override
	public WorkUpload createWorkUpload(Long issueId, Long userId, String content) throws Exception {

		Optional<Issue> issueOptional = issueRepository.findById(issueId);
		Optional<User> userOptional = userRepository.findById(userId);

		if (issueOptional.isEmpty()) {
			throw new IssueException("issue not found with id " + issueId);
		}
		if (userOptional.isEmpty()) {
			throw new UserException("user not found with id " + userId);
		}
		Issue issue = issueOptional.get();
		User user = userOptional.get();

		WorkUpload workUpload = new WorkUpload();

		workUpload.setIssue(issue);
		workUpload.setUser(user);
		workUpload.setCreatedDateTime(LocalDateTime.now());
		workUpload.setContent(content);

		WorkUpload savedWorkUpload = workUploadRepository.save(workUpload);

		issue.getWorkUpload().add(savedWorkUpload);

		return savedWorkUpload;
	}

	@Override
	public void deleteWorkUpload(Long workUploadId, Long userId) throws Exception {

		Optional<WorkUpload> workUploadOptional = workUploadRepository.findById(workUploadId);
		Optional<User> userOptional = userRepository.findById(userId);

		if (workUploadOptional.isEmpty()) {
			throw new IssueException("comment not found with id " + workUploadId);
		}
		if (userOptional.isEmpty()) {
			throw new UserException("user not found with id " + userId);
		}

		WorkUpload workUpload = workUploadOptional.get();
		User user = userOptional.get();

		if (workUpload.getUser().equals(user)) {
			workUploadRepository.delete(workUpload);
		} else {
			throw new UserException("User does not have permission to delete this comment!");
		}

	}

	@Override
	public List<WorkUpload> findWorkUploadByIssueId(Long issueId) {

		return workUploadRepository.findByIssueId(issueId);
	}

}
