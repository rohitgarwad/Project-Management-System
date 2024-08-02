package com.mscproject.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueReportRequest {

	private String senderEmail;
	private String receiverEmail;
	private String issueTitle;
	private String issueStatus;
	private String reportMessage;

}
