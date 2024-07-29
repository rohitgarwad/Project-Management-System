package com.mscproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mscproject.model.WorkUpload;

public interface WorkUploadRepository extends JpaRepository<WorkUpload, Long> {

	List<WorkUpload> findByIssueId(Long issueId);
	
}
