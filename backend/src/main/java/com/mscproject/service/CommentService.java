package com.mscproject.service;

import java.util.List;

import com.mscproject.exception.IssueException;
import com.mscproject.exception.UserException;
import com.mscproject.model.Comment;

public interface CommentService {
    Comment createComment(Long issueId,Long userId,String comment) throws UserException, IssueException;

    void  deleteComment(Long commentId, Long userId) throws UserException, IssueException;

    List<Comment> findCommentByIssueId(Long issueId);

}
