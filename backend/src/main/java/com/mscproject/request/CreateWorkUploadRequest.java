package com.mscproject.request;

import lombok.Data;

@Data
public class CreateWorkUploadRequest {
	
	private Long issueId;
	private String content;

}
