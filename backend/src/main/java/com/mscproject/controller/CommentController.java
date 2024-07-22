package com.mscproject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mscproject.exception.IssueException;
import com.mscproject.exception.ProjectException;
import com.mscproject.exception.UserException;
import com.mscproject.model.Comment;
import com.mscproject.model.User;
import com.mscproject.request.CreateCommentRequest;
import com.mscproject.response.MessageResponse;
import com.mscproject.service.CommentService;
import com.mscproject.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	private CommentService commentService;
	private UserService userService;

	public CommentController(CommentService commentService, UserService userService) {
		this.commentService = commentService;
		this.userService = userService;
	}

	@PostMapping()
	public ResponseEntity<Comment> createComment(

			@RequestBody CreateCommentRequest req, @RequestHeader("Authorization") String jwt)
			throws UserException, IssueException, ProjectException {
		User user = userService.findUserProfileByJwt(jwt);
		Comment createdComment = commentService.createComment(req.getIssueId(), user.getId(), req.getContent());
		return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
	}

	@DeleteMapping("/{commentId}")
	public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId,

			@RequestHeader("Authorization") String jwt) throws UserException, IssueException, ProjectException {
		User user = userService.findUserProfileByJwt(jwt);
		commentService.deleteComment(commentId, user.getId());
		MessageResponse res = new MessageResponse();
		res.setMessage("comment deleted successfully");
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("/{issueId}")
	public ResponseEntity<List<Comment>> getCommentsByIssueId(@PathVariable Long issueId) {
		List<Comment> comments = commentService.findCommentByIssueId(issueId);
		return new ResponseEntity<>(comments, HttpStatus.OK);
	}
}
