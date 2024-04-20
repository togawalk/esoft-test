export const getTaskHeaderColor = (task) => {
  const currentDate = new Date();
  const taskDueDate = new Date(task.dueDate);

  if (task.status === "DONE") {
    return "text-green-500"; // Заголовок завершенных задач
  } else if (taskDueDate < currentDate) {
    return "text-red-500"; // Незавершенные задачи с просроченной датой
  } else {
    return "text-gray-500"; // Остальные задачи
  }
};
