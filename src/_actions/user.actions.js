import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  // getCurrentUser,
};

function login(username, password) {
  return (dispatch) => {
    dispatch({
      type: userConstants.LOGIN_REQUEST,
      user: username,
    });

    userService.login(username, password).then(
      (user) => {
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          user,
        });
        history.push("/");
      },
      (error) => {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          error,
        });
        let errorMessage = userService.errorHandle(error);
        dispatch(alertActions.error(errorMessage));
      }
    );
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch({ type: userConstants.REGISTER_REQUEST, user });

    userService
      .register(user)
      .then((user) => {
        dispatch({ type: userConstants.REGISTER_SUCCESS, user });
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      })
      .catch((error) => {
        dispatch({ type: userConstants.REGISTER_FAILURE, error });
        let errorMessage = userService.errorHandle(error);
        dispatch(alertActions.error(errorMessage));
      });
  };
}

// function getCurrentUser() {
//   return JSON.parse(localStorage.getItem("user")).username;
// }
