package com.mscproject.DTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.mscproject.model.Project;
import com.mscproject.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//IssueDTO class
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueDTO {

	private Long id;
	private String title;
	private String description;
	private String status;
	private Long projectID;
	private String priority;
	private LocalDateTime dueDate;
	private List<String> labels = new ArrayList<>();
	private Project project;

	// Exclude assignee during serialization

	private User assignee;

}
