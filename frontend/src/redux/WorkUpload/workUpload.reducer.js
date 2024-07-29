// reducer.js
import * as actionTypes from './workUpload.actionTypes';

const initialState = {
  workUploads: [],
  loading: false,
  error: null
};

const workUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_WORKUPLOAD_REQUEST:
    case actionTypes.DELETE_WORKUPLOAD_REQUEST:
    case actionTypes.FETCH_WORKUPLOADS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.CREATE_WORKUPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        workUploads: [...state.workUploads, action.workUpload]
      };
    case actionTypes.DELETE_WORKUPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        workUploads: state.workUploads.filter(workUpload => workUpload.id !== action.workUploadId)
      };
    case actionTypes.FETCH_WORKUPLOADS_SUCCESS:
      return {
        ...state,
        loading: false,
        workUploads: action.workUploads
      };
    case actionTypes.CREATE_WORKUPLOAD_FAILURE:
    case actionTypes.DELETE_WORKUPLOAD_FAILURE:
    case actionTypes.FETCH_WORKUPLOADS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default workUploadReducer;
