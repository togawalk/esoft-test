import { instance } from "./api.js";

function getTasks() {
  return instance.get("/tasks")
}

export const tasksService= {
  getTasks,
};

