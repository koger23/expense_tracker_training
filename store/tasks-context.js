import { createContext, useReducer } from "react";

const DUMMY_TASKS = [
  {
    id: 1,
    title: "Title",
    counter: 10,
    note: "asd",
    isactive: false,
  },
  {
    id: 2,
    title: "Title-2",
    counter: 20,
    note: "qwe",
    isactive: false,
  },
  {
    id: 3,
    title: "Title-3asdasddddddddddddddddddddddddddddddddddddddddddddddd",
    counter: 300,
    note: "qwe3",
    isactive: false,
  },
];

export const TasksContext = createContext({
  tasks: DUMMY_TASKS,
  // tasks: [],
  setTasks: (tasks) => {
    [];
  },
  addTask: ({
    title,
    notes,
    counter,
    createdon,
    stoppedon,
    position,
    isactive,
  }) => {},
  activateTask: ({
    id,
    title,
    notes,
    counter,
    createdon,
    stoppedon,
    isactive,
  }) => {},
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
    case "ACTIVATE":
      if (!id || id < 0) {
        state.forEach((task) => {
          task.isactive = false;
        });
        return;
      }
      const activatableTaskIndex = state.findIndex((task) => {
        return task.id === action.payload.id;
      });
      const activatableTask = state[activatableTaskIndex];
      activatableTask.isactive = true;
      const activatedTask = { ...activatableTask, ...action.payload };
      const restOfTheTasks = state.filter((task) => {
        const isSame = task.id !== activatedTask.id;

        if (!isSame) {
          task.isactive = false;
          return task;
        }
      });
      return [activatedTask, ...restOfTheTasks];
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

  function activateTask(id) {
    if (!id) {
      id = -1;
    }
    dispatch({ type: "Activate", payload: { id: id } });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    tasks: tasksState,
    addTask: addTask,
    updateTask: updateTask,
    activateTask: activateTask,
    deleteTask: deleteTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
export default TasksContextProvider;
