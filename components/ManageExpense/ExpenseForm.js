import { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../../components/ExpensesOutput/UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
        value: defaultValues ? getFormattedDate(defaultValues.date) : "",
        isValid: true, 
    },
    description: {
        value: defaultValues ? defaultValues.description : "",
        isValid: true, 
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValues) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValues, isValid: true }, // standard JS, target property dynamically
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const IsAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const IsDateValid = expenseData.date.toString() !== "Invalid Date";
    const IsDescriptionValid = expenseData.description.trim().length > 0;

    if (!IsAmountValid || !IsDescriptionValid || !IsDateValid) {
      // Alert.alert("Invalid input", "Please check your input values!");
      setInputs((currentInputs) => {
        return {
            amount: { value: currentInputs.amount.value, isValid: IsAmountValid },
            date: { value: currentInputs.date.value, isValid: IsDateValid },
            description: { value: currentInputs.description.value, isValid: IsDescriptionValid },
        }
      })
      return;
    }
    onSubmit(expenseData);
  }

  const isFormInvalid = 
    !inputs.amount.isValid || 
    !inputs.date.isValid || 
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      {isFormInvalid && <Text style={styles.errorText}>Invalid input values - please check your input data!</Text>}
      <View style={styles.amountAndDate}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"), // enteredValues automatically added
            value: inputs.amount.value, // two-way binding
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"), // enteredValues automatically added
            value: inputs.date.value, // two-way binding
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"), // enteredValues automatically added
          value: inputs.description.value, // two-way binding
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  amountAndDate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  }
});
