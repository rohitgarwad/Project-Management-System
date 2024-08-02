package com.mscproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mscproject.model.User;
import com.mscproject.model.WorkUpload;
import com.mscproject.request.CreateWorkUploadRequest;
import com.mscproject.response.MessageResponse;
import com.mscproject.service.UserService;
import com.mscproject.service.WorkUploadService;

@RestController
@RequestMapping("/api/workUploads")
public class WorkUploadController {

	@Autowired
	private WorkUploadService workUploadService;
	@Autowired
	private UserService userService;

	@PostMapping()
	public ResponseEntity<WorkUpload> createWorkUpload(

			@RequestBody CreateWorkUploadRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		WorkUpload createdWorkUpload = workUploadService.createWorkUpload(req.getIssueId(), user.getId(),
				req.getContent());
		return new ResponseEntity<>(createdWorkUpload, HttpStatus.CREATED);
	}

	@DeleteMapping("/{workUploadId}")
	public ResponseEntity<MessageResponse> deleteWorkUpload(@PathVariable Long workUploadId,

			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		workUploadService.deleteWorkUpload(workUploadId, user.getId());
		MessageResponse res = new MessageResponse();
		res.setMessage("workUpload deleted successfully");
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("/{issueId}")
	public ResponseEntity<List<WorkUpload>> getWorkUploadIssueId(@PathVariable Long issueId) {
		List<WorkUpload> workUploads = workUploadService.findWorkUploadByIssueId(issueId);
		return new ResponseEntity<>(workUploads, HttpStatus.OK);
	}

}
