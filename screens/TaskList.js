import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TaskListItem from "../components/TaskList/TaskListItem";
import { TasksContext } from "../store/tasks-context";
import { getHourAndTime } from "../util/date";

function TaskList() {
  const tasksCtx = useContext(TasksContext);
  const [acitveTask, setActiveTask] = useState(tasksCtx?.tasks[0]);
  const navigation = useNavigation();

  console.log(acitveTask);

  useLayoutEffect(() => {
    const total = tasksCtx.tasks.reduce((sum, task) => {
      return sum + task.counter;
    }, 0);
    navigation.setOptions({
      title: "Total: " + getHourAndTime({ counter: total }),
    });
  }, [navigation]);

  if (tasksCtx.tasks.length === 0) {
    return (
      <View style={styles.notasks}>
        <Text>No tasks for today.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollview}>
      {(tasksCtx.tasks || []).map((task, index) => {
        return <TaskListItem key={index} index={index} task={task} />;
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
