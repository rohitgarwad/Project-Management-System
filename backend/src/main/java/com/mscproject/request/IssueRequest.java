package com.mscproject.request;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class IssueRequest {

	private String title;
	private String description;
	private String status;
	private Long projectId;
	private String priority;
	private LocalDateTime dueDate;
	private List<String> labels = new ArrayList<>();

}
