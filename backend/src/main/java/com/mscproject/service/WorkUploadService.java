package com.mscproject.service;

import java.util.List;

import com.mscproject.model.WorkUpload;

public interface WorkUploadService {

	WorkUpload createWorkUpload(Long issueId, Long userId, String content) throws Exception;

	void deleteWorkUpload(Long workUploadId, Long userId) throws Exception;

	List<WorkUpload> findWorkUploadByIssueId(Long issueId);

}
