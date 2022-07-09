import { createContext, useReducer } from "react";


const DUMMY_TASKS = [
  { id: 1, title: "Title", counter: new Date().getUTCSeconds(), note: "asd" },
  { id: 2, title: "Title-2", counter: new Date().getUTCSeconds(), note: "qwe" },
  { id: 3, title: "Title-3asdasddddddddddddddddddddddddddddddddddddddddddddddd", counter: new Date().getUTCSeconds(), note: "qwe3" },
]

export const TasksContext = createContext({
  tasks: DUMMY_TASKS,
  // tasks: [],
  setTasks: (tasks) => {
    [];
  },
  addTask: ({ title, notes, counter, createdon, stoppedon, position }) => {},
  deleteTask: (id) => {},
  updateTask: (id, { title, notes, counter, stoppedon, position }) => {},
});

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const updateableTaskIndex = state.findIndex((task) => {
        return task.id === action.payload.id;
      });
      const updateableTask = state[updateableTaskIndex];
      const updatedItem = { ...updateableTask, ...action.payload.data };
      const updatedTasks = [...state];
      updatedTasks[updateableTaskIndex] = updatedItem;
      return updatedTasks;
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

function TasksContextProvider({ children }) {
  const [tasksState, dispatch] = useReducer(tasksReducer, DUMMY_TASKS); // 2nd param initial value

  function addTask(taskData) {
    dispatch({ type: "ADD", payload: taskData });
  }

  function updateTask(id, taskData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: taskData } });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    tasks: tasksState,
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}
export default TasksContextProvider;
