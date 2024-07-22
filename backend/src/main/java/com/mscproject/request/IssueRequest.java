package com.mscproject.request;

import java.time.LocalDate;
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
	private LocalDate dueDate;
	private List<String> labels=new ArrayList<>();

}
