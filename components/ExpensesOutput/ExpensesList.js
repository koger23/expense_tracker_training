import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(object) {
  const item = object.item;
  return (
    <ExpenseItem id={item.id} description={item.description} amount={item.amount} date={item.date}></ExpenseItem>
  );
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;

const styles = StyleSheet.create({});
