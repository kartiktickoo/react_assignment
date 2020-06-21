import axios from "axios";
import { authHeader } from "../_helpers";
import { articleConstants } from "../_constants";
import { alertActions } from "./";
import { userService } from "../_services";

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ROOT_URL = "https://conduit.productionready.io/api";

export const articleActions = {
  fetchPost,
  fetchTags,
  createPost,
  updatePost,
  fetchPostByFilter,
  deletePost,
  favoritePost,
  deleteFavoritePost,
  deleteComment,
  addComment,
  fetchCommentsById,
};

function fetchPost(id) {
  let url = id ? `${ROOT_URL}/articles/${id}` : `${ROOT_URL}/articles`;

  let config = {
    headers: authHeader(),
  };
  return (dispatch) => {
    axios.get(url, config).then((response) => {
      dispatch({
        type: articleConstants.FETCH_POSTS,
        payload: id ? [response.data.article] : response.data.articles,
      });
    });
  };
}

function fetchTags() {
  let config = {
    headers: authHeader(),
  };
  return (dispatch) => {
    axios.get(`${ROOT_URL}/tags`, config).then((response) => {
      dispatch({
        type: articleConstants.FETCH_TAGS,
        payload: {
          articles: response.data,
        },
      });
    });
  };
}

function createPost(values, callback) {
  let config = {
    headers: authHeader(),
  };
  return (dispatch) => {
    axios.post(`${ROOT_URL}/articles`, values, config).then((response) => {
      dispatch({
        type: articleConstants.CREATE_POST,
        payload: response,
      });
      callback();
    });
  };
}

function updatePost(values, slug, callback) {
  let config = {
    headers: authHeader(),
  };

  return (dispatch) => {
    axios
      .put(`${ROOT_URL}/articles/${slug}`, values, config)
      .then((response) => {
        dispatch({
          type: articleConstants.CREATE_POST,
          payload: response,
        });
        callback();
      })
      .catch((error) => {
        let errorMessage = userService.errorHandle(error);
        dispatch(alertActions.error(errorMessage));
      });
  };
}

function fetchPostByFilter(filterType, filterID) {
  let config = {
    headers: authHeader(),
  };
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/articles?${filterType}=${filterID}`, config)
      .then((response) => {
        dispatch({
          type: articleConstants.FETCH_POSTS_BY_FILTER,
          payload: response,
        });
      });
  };
}

function deletePost(slug, callback) {
  let config = {
    headers: authHeader(),
  };

  return (dispatch) => {
    axios
      .delete(`${ROOT_URL}/articles/${slug}`, config)
      .then(() => {
        dispatch({
          type: articleConstants.DELETE_POST,
          payload: slug,
        });
        callback();
      })
      .catch((error) => {
        let errorMessage = userService.errorHandle(error);
        dispatch(alertActions.error(errorMessage));
      });
  };
}

function favoritePost(slug, callback) {
  let config = {
    headers: authHeader(),
  };

  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/articles/${slug}/favorite`, null, config)
      .then(() => {
        dispatch({
          type: articleConstants.DELETE_POST,
          payload: slug,
        });
        callback();
      })
      .catch((error) => {
        let errorMessage = userService.errorHandle(error);
        dispatch(alertActions.error(errorMessage));
      });
  };
}

function deleteFavoritePost(slug, callback) {
  let config = {
    headers: authHeader(),
  };

  return (dispatch) => {
    axios
      .delete(`${ROOT_URL}/articles/${slug}/favorite`, config)
      .then(() => {
        dispatch({
          type: articleConstants.DELETE_POST,
          payload: slug,
        });
        callback();
      })
      .catch((error) => {
        let errorMessage = userService.errorHandle(error);
        dispatch(alertActions.error(errorMessage));
      });
  };
}

function deleteComment(slug, id, callback) {
  let config = {
    headers: authHeader(),
  };
  return (dispatch) => {
    axios
      .delete(`${ROOT_URL}/articles/${slug}/comments/${id}`, config)
      .then(() => {
        dispatch({
          type: articleConstants.DELETE_COMMENT,
          payload: id,
        });
        callback();
      })
      .catch((error) => {
        let errorMessage = userService.errorHandle(error);
        dispatch(alertActions.error(errorMessage));
      });
  };
}

function addComment(slug, params, callback) {
  let config = {
    headers: authHeader(),
  };
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/articles/${slug}/comments`, params, config)
      .then((response) => {
        dispatch({
          type: articleConstants.ADD_COMMENT,
          payload: response,
        });
        callback();
      })
      .catch(() => {});
  };
}

function fetchCommentsById(slug) {
  let config = {
    headers: authHeader(),
  };

  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/articles/${slug}/comments`, config)
      .then((response) => {
        dispatch({
          type: articleConstants.FETCH_COMMENTS,
          payload: response,
        });
      })
      .catch(() => {});
  };
}
