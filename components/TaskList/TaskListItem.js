import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { useLayoutEffect, useState } from "react";
import { getHours, getTime } from "../../util/date";

function TaskListItem({ index, task, isDarkMode, navigation }) {
  const [isActive, setActive] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    setInterval(() => {
      if (!isActive) return;
      task.counter++;
    }, 1000);
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <View style={styles.dotsicon}>
          <MaterialCommunityIcons size={28} name="dots-vertical" />
        </View> */}
        <View style={styles.taskheader}>
          <View style={styles.timecontainer}>
            <View>
              <Text style={styles.time}>{getTime(task)}</Text>
            </View>
            <View>
              <Text style={styles.hour}>({getHours(task)})</Text>
            </View>
          </View>
          <View>
            <Text style={styles.title}>{task.title}</Text>
          </View>
        </View>
        <MaterialCommunityIcons
          size={32}
          name={isExpanded ? "chevron-right" : "chevron-left"}
          onPress={() => {
            setExpanded(!isExpanded);
          }}
        />
        <View style={styles.iconmenu}>
          {isExpanded && (
            <MaterialCommunityIcons size={32} name="pencil-outline" />
          )}
          {isExpanded && (
            <MaterialCommunityIcons size={32} name="delete-outline" />
          )}
        </View>
        <View style={styles.playicon}>
          <MaterialCommunityIcons
            size={32}
            name={isActive ? "play" : "publish"}
            onPress={() => {
              setActive(!isActive);
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default TaskListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    paddingHorizontal: 5,
  },
  card: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    borderColor: Colors.black,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.75,
    elevation: 5,
    minHeight: 70,
  },
  playicon: {
    flexDirection: "row",
  },
  iconmenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  taskheader: {
    flex: 12,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  time: {
    fontSize: 20,
  },
  hour: {
    fontSize: 18,
  },
  title: {
    fontSize: 14,
    color: Colors.grey600,
  },
  timecontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
