import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export const BackArrowIcon = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={handleLogOut}>
      <Feather name="arrow-left" size={24} color="#21212180" />
    </Pressable>
  );
};
