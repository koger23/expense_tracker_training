import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  return (
    <View style={[styles.inptContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
}
export default Input;

const styles = StyleSheet.create({
  inptContainer: {
    marginHorizintal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});