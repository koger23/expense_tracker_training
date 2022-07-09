import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExepnses";
import AllExpenses from "./screens/AllExpenses";

import IconButton from "./components/ExpensesOutput/UI/IconButton";

import { StyleSheet } from "react-native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import ExpensesContextProvider from "./store/expenses-context";
import TaskList from "./screens/TaskList";
import { GlobalStyles } from "./constants/styles";
import TasksContextProvider from "./store/tasks-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          ></IconButton>
        ),
      })}
    >
      {/* <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} color={color} name="hourglass" />
          ),
        }}
      /> */}
      {/* <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} color={color} name="calendar" />
          ),
        }}
      /> */}
      <BottomTabs.Screen
        name="Tasks"
        component={TaskList}
        options={{
          title: "Tasks",
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 size={size} color={color} name="tasks" />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <TasksContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
              }}
            >
              <Stack.Screen
                name="ExpensesOverview"
                component={ExpensesOverview}
                options={{ headerShown: false, presentation: "modal" }} // modal is different on iOS, it can be swiped down to close
              />
              <Stack.Screen name="ManageExpense" component={ManageExpense} />
            </Stack.Navigator>
          </NavigationContainer>
        </TasksContextProvider>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
