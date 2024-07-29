// actions.js
import * as actionTypes from "./workUpload.actionTypes";
import api from "@/Api/api";

// Action for creating a workUpload
export const createWorkUpload = (workUploadData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_WORKUPLOAD_REQUEST });
    try {
      const response = await api.post(`/api/workUploads`, workUploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      //console.log("workUpload created", response.data)
      dispatch({
        type: actionTypes.CREATE_WORKUPLOAD_SUCCESS,
        workUpload: response.data,
      });
    } catch (error) {
      console.log("create workUpload error ", error);
      dispatch({
        type: actionTypes.CREATE_WORKUPLOAD_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for deleting a workUpload
export const deleteWorkUpload = (workUploadId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_WORKUPLOAD_REQUEST });
    try {
      await api.delete(`/api/workUploads/${workUploadId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({ type: actionTypes.DELETE_WORKUPLOAD_SUCCESS, workUploadId });
    } catch (error) {
      console.log("delete workUpload error ", error);
      dispatch({
        type: actionTypes.DELETE_WORKUPLOAD_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for fetching workUploads by issueId
export const fetchWorkUploads = (issueId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_WORKUPLOADS_REQUEST });
    try {
      const response = await api.get(`/api/workUploads/${issueId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({
        type: actionTypes.FETCH_WORKUPLOADS_SUCCESS,
        workUploads: response.data,
      });
      //console.log("fetched workUploads ",response.data)
    } catch (error) {
      console.log("fetch workUploads error ", error);
      dispatch({
        type: actionTypes.FETCH_WORKUPLOADS_FAILURE,
        error: error.message,
      });
    }
  };
};
