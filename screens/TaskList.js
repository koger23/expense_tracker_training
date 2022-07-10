import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TaskListItem from "../components/TaskList/TaskListItem";
import { TasksContext } from "../store/tasks-context";
import { getHourAndTime } from "../util/date";

function TaskList() {
  const tasksCtx = useContext(TasksContext);
  const [activeTask, setActiveTask] = useState(undefined);
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [totalSecs, setTotalSecs] = useState(0);
  const [totalTime, setTotalTime] = useState("Total: " + getHourAndTime(0));

  useLayoutEffect(() => {
    setTasks(tasksCtx.tasks);

    const total = tasksCtx.tasks.reduce((sum, task) => {
      return sum + task.counter;
    }, 0);
    setTotalTime(totalTime);
    setTotalSecs(total);

    navigation.setOptions({
      title: "Total: " + getHourAndTime(totalSecs),
    });

    // const timer = setInterval(() => {
    //   if (activeTask) {
    //     console.log(activeTask.id);

    //     activeTask.counter++;
    //   }
    // }, 1000);

    // return () => clearInterval(timer);
  }, [navigation]);

  if (tasks?.length === 0) {
    return (
      <View style={styles.notasks}>
        <Text>No tasks for today.</Text>
      </View>
    );
  }

  function countTotal(id) {
    setTotalSecs(() => {
      return totalSecs + 1;
    });
    const total = tasksCtx.tasks.reduce((sum, task) => {
      return sum + task.counter;
    }, 0);
    setTotalTime(totalTime);
    navigation.setOptions({
      title: "Total: " + getHourAndTime(totalSecs),
    });
    //   taskId = taskToActivate.id;
    // }
    // tasksCtx.activateTask(taskId);

    if (!id) {
      const taskList = tasks;
      taskList.map((task) => {
        task.isactive = false;
      });
      setTasks(taskList);
      return;
    }

    const taskToActivateIndex = tasks.findIndex((task) => {
      return task.id === id;
    });
    const taskToActivate = tasks[taskToActivateIndex];
    taskToActivateIndex.isactive = true;

    // const restOfTheTasks = tasks.filter((task) => {
    //   const isSame = task.id !== taskToActivateIndex.id;

    //   if (!isSame) {
    //     task.isactive = false;
    //     return task;
    //   }
    // });
    setActiveTask(taskToActivate);
    console.log(taskToActivate);
    // return setTasks([taskToActivate, ...restOfTheTasks]);
  }

  return (
    <ScrollView style={styles.scrollview}>
      {(tasks || []).map((task, index) => {
        return (
          <TaskListItem
            key={index}
            id={task.id}
            title={task.title}
            counter={task.counter}
            isactive={task.isactive}
            onActivate={countTotal.bind(this, task.id)}
          />
        );
      })}
    </ScrollView>
  );
}

export default TaskList;

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
  },
  notasks: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
