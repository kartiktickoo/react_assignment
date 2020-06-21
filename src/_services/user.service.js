import axios from "axios";

export const userService = {
  login,
  logout,
  register,
  errorHandle,
};

const ROOT_URL = "https://conduit.productionready.io/api";

function login(email, password) {
  const loginCred = { user: { email, password } };
  return axios.post(`${ROOT_URL}/users/login`, loginCred).then((user) => {
    localStorage.setItem("token", JSON.stringify(user.data.user.token));
    localStorage.setItem("user", JSON.stringify(user.data.user));
    return user.data.user;
  });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function register(user) {
  const loginCred = { user: { ...user } };
  return axios.post(`${ROOT_URL}/users`, loginCred).then((user) => {
    return user.data.user;
  });
}

function errorHandle(error) {
  error = { ...error }.response.data.errors;
  let errorMessage = "";
  for (let [key, value] of Object.entries(error)) {
    errorMessage += `${key} ${value}. `;
  }
  return errorMessage;
}
