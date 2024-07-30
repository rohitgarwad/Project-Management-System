// actions.js
import * as actionTypes from "./ActionTypes";
import api from "@/Api/api";

// Action for fetching issues
export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get(
        `/api/issues/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      //console.log("fetch issues", response.data);
      dispatch({
        type: actionTypes.FETCH_ISSUES_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      console.log("fetch issues error: ", error);
      dispatch({
        type: actionTypes.FETCH_ISSUES_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchIssueById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
    try {
      const response = await api.get(
        `/api/issues/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      //console.log("fetch issue by id", response.data);
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      console.log("fetch issue by id error: ", error);
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE,
        error: error.message,
      });
    }
  };
};

export const updateIssueStatus = ({ id, status }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
    try {
      const response = await api.put(
        `/api/issues/${id}/status/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      //console.log("update issue status", response.data);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      console.log("update issue status error: ", error);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
        error: error.message,
      });
    }
  };
};

export const assignedUserToIssue = ({ issueId, userId, sendRefresh }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
    try {
      const response = await api.put(
        `/api/issues/${issueId}/assignee/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      sendRefresh("Issue assigned to User !");
      //console.log("assigned issue --- ", response.data);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      console.log("assign user to issue error: ", error);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for creating an issue
export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });
    try {
      const response = await api.post("/api/issues", issueData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      //console.log("create issue response: ", response);
      dispatch({
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      console.log("create issue error: ", error);
      dispatch({
        type: actionTypes.CREATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for updating an issue
export const updateIssue = (issueId, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_REQUEST });
    try {
      const response = await api.put(`/api/issues/${issueId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      //console.log("updated Issue data: ", response);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      console.log("update issue error: ", error);
      dispatch({
        type: actionTypes.UPDATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for deleting an issue
export const deleteIssue = (issueId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });
    try {
      await api.delete(`/api/issues/${issueId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({ type: actionTypes.DELETE_ISSUE_SUCCESS, issueId });
    } catch (error) {
      //console.log("delete issue error: ", error);
      dispatch({
        type: actionTypes.DELETE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for sending issue report
export const sendIssueReport = (issueReportData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEND_ISSUE_REPORT_REQUEST });
    try {
      const data = await api.post(`/api/issues/report`, issueReportData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({ type: actionTypes.SEND_ISSUE_REPORT_SUCCESS});
      console.log("send issue report success: ", data);
    } catch (error) {
      console.log("send issue report error: ", error);
      dispatch({
        type: actionTypes.SEND_ISSUE_REPORT_FAILURE,
        error: error.message,
      })
    }
  }
}
