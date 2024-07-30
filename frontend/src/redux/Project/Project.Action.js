// actions.js
import * as actionTypes from "./ActionTypes";
import api, { API_BASE_URL } from "@/Api/api";

// Action for fetching projects
export const fetchProjects = ({ category, tag }) => {
  const params = {};
  if (category) {
    params.category = category;
  }
  if (tag) {
    params.tag = tag;
  }
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECTS_REQUEST });
    try {
      const response = await api.get("/api/projects", {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      //console.log("fetch Projects ", response.data);
      dispatch({
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: response.data,
      });
    } catch (error) {
      // console.log("fetch project error: ", error);
      dispatch({
        type: actionTypes.FETCH_PROJECTS_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for searching projects by keyword
export const searchProjects = (keyword) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEARCH_PROJECT_REQUEST });
    try {
      const response = await api.get(
        `/api/projects/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      //console.log("search Projects ", response.data);
      dispatch({
        type: actionTypes.SEARCH_PROJECT_SUCCESS,
        projects: response.data,
      });
    } catch (error) {
      // console.log("search project error: ", error);
      dispatch({
        type: actionTypes.SEARCH_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for creating a project
export const createProject = (projectData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
    try {
      const response = await api.post(
        `${API_BASE_URL}/api/projects`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      //console.log("created project data...............", response);
      dispatch({
        type: actionTypes.CREATE_PROJECT_SUCCESS,
        project: response.data,
      });
    } catch (error) {
      // console.log("create project error ", error);
      dispatch({
        type: actionTypes.CREATE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for updating a project
export const updateProject = ({ projectId, updatedData }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_PROJECT_REQUEST });
    try {
      const response = await api.put(
        `${API_BASE_URL}/api/projects/${projectId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      //console.log("updated project data: ",response);
      dispatch({
        type: actionTypes.UPDATE_PROJECT_SUCCESS,
        project: response.data,
      });
    } catch (error) {
      // console.log("update project error ", error);
      dispatch({
        type: actionTypes.UPDATE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for fetching project by id
export const fetchProjectById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECT_BY_Id_REQUEST });
    try {
      const response = await api.get(`/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      //console.log("fetch Projects by id", response.data);
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_Id_SUCCESS,
        projectDetails: response.data,
      });
    } catch (error) {
      // console.log("fetch project by id error: ", error);
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_Id_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for deleting a project
export const deleteProject = ({ projectId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST });
    try {
      await api.delete(`/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({ type: actionTypes.DELETE_PROJECT_SUCCESS, projectId });
    } catch (error) {
      // console.log("delete project error - ", error);
      dispatch({
        type: actionTypes.DELETE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for inviting to project
export const inviteToProject = ({ email, projectId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.INVITE_TO_PROJECT_REQUEST });
    try {
      const response = await api.post(
        `/api/projects/invite`,
        {
          email,
          projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch({ type: actionTypes.INVITE_TO_PROJECT_SUCCESS });
      //console.log("invite to project ", response);
    } catch (error) {
      // console.log("invite to project error: ", error);
      dispatch({
        type: actionTypes.INVITE_TO_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for accepting invitation
export const acceptInvitation = ({ invitationToken, navigate }) => {
  //console.log("invitation token",invitationToken)
  return async (dispatch) => {
    dispatch({ type: actionTypes.ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get("/api/projects/accept_invitation", {
        params: { token: invitationToken },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      navigate(`/project/${data.projectId}`);
      //console.log("accept invitation",data)
      dispatch({ type: actionTypes.ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
      // console.log("accept invite error ", error);
      dispatch({
        type: actionTypes.ACCEPT_INVITATION_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for fetching all users project roles
export const fetchAllUsersProjectRoles = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ALL_USERS_PROJECT_ROLES_REQUEST });
    try {
      const response = await api.get(`/api/projects/${projectId}/roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      //console.log("fetch all users project roles ", response.data);
      dispatch({
        type: actionTypes.FETCH_ALL_USERS_PROJECT_ROLES_SUCCESS,
        projectRoles: response.data,
      });
    } catch (error) {
      // console.log("fetch all users project roles error: ", error);
      dispatch({
        type: actionTypes.FETCH_ALL_USERS_PROJECT_ROLES_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for fetching users project role
export const fetchUserProjectRole = (projectId, userId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_USER_PROJECT_ROLE_REQUEST });
    try {
      const response = await api.get(
        `/api/projects/${projectId}/users/${userId}/roles`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      //console.log("fetch user project role ", response);
      dispatch({
        type: actionTypes.FETCH_USER_PROJECT_ROLE_SUCCESS,
        userProjectRole: response.data,
      });
    } catch (error) {
      // console.log("fetch user project role error: ", error);
      dispatch({
        type: actionTypes.FETCH_USER_PROJECT_ROLE_FAILURE,
        error: error.message,
      });
    }
  };
};

// Action for updating users project role
export const updateUsersProjectRole = (updateRoleData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_USERS_PROJECT_ROLE_REQUEST });
    try {
      const response = await api.put(
        `/api/projects/${updateRoleData.projectId}/users/${updateRoleData.userId}/roles`,
        {},
        {
          params: {
            oldRoleType: updateRoleData.oldRoleType,
            newRoleType: updateRoleData.newRoleType,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      //console.log("update users project role ", response);
      dispatch({
        type: actionTypes.UPDATE_USERS_PROJECT_ROLE_SUCCESS,
        projectRole: response.data,
      });
    } catch (error) {
      // console.log("update users project role error: ", error);
      dispatch({
        type: actionTypes.UPDATE_USERS_PROJECT_ROLE_FAILURE,
        error: error.message,
      });
    }
  };
};
