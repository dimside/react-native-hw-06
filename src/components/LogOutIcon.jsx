import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export const LogOutIcon = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    navigation.navigate("Login");
  };

  return (
    <Pressable onPress={handleLogOut}>
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </Pressable>
  );
};
