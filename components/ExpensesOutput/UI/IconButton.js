import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  return (
      <Pressable
        onPress={onPress}
        styles={({ pressed }) => pressed && styles.pressed}
      >
        <View styles={styles.buttonContainer}>
          <Ionicons size={size} color={color} name={icon} />
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
