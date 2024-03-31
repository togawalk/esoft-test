import { instance } from "./api.js";

function login(username: string, password: string) {
  return instance.post("/login", {username: username, password: password})
}

export const authService= {
  login,
};

