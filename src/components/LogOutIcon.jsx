import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { authLogOut } from "../redux/auth/operations";
import { useDispatch } from "react-redux";

export const LogOutIcon = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authLogOut());
  };

  return (
    <Pressable onPress={handleLogOut}>
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </Pressable>
  );
};
