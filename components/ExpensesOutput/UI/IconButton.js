import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

function IconButton({ icon, size, color, onPress }) {
  return (
      <Pressable
        onPress={onPress}
        styles={({ pressed }) => pressed && styles.pressed}
      >
        <View styles={styles.buttonContainer}>
          <Ionicons size={size || 24} color={color || Colors.red500} name={icon} />
        </View>
      </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});
