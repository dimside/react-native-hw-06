import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isShowPass, setIsShowPass] = useState(true);

  const navigation = useNavigation();

  const emailInput = useRef();
  const passInput = useRef();

  const handleShowPass = () => {
    setIsShowPass((current) => !current);
  };
  const handleSubmit = () => {
    const credentials = { email, password };
    console.log(credentials);
    setEmail(null);
    setPassword(null);
    navigation.navigate("Home", { screen: "PostsScreen" });
  };

  const handleOnFocus = (type, inputName) => {
    switch (type) {
      case "focus":
        return () => {
          setIsFocus(true);
          emailInput.current = inputName === "emailInput";
          passInput.current = inputName === "passInput";
        };

      case "blur":
        return () => {
          setIsFocus(false);
          inputName.current = 0;
        };

      default:
        return;
    }
  };
  const inputStyle = (inputName) => {
    return [
      styles.input,
      {
        borderColor: inputName.current && isFocus ? "#FF6C00" : "#E8E8E8",
      },
    ];
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Увійти</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              ref={emailInput}
              style={inputStyle(emailInput)}
              placeholder="Адреса електронної пошти"
              inputMode="email"
              placeholderTextColor="#BDBDBD"
              onChangeText={setEmail}
              value={email}
              onFocus={handleOnFocus("focus", "emailInput")}
              onBlur={handleOnFocus("blur", "emailInput")}
            />
            <View style={styles.passwordInput}>
              <TextInput
                ref={passInput}
                style={[...inputStyle(passInput), { marginBottom: 43 }]}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={isShowPass}
                onFocus={handleOnFocus("focus", "passInput")}
                onBlur={handleOnFocus("blur", "passInput")}
              />
              <Pressable style={styles.showPassBtn} onPress={handleShowPass}>
                <Text style={styles.showPassText}>
                  {isShowPass ? "Показати" : "Сховати"}
                </Text>
              </Pressable>
            </View>
            <Pressable style={styles.loginBtn} onPress={handleSubmit}>
              <Text style={styles.loginText}>Увійти</Text>
            </Pressable>
          </KeyboardAvoidingView>
          <View style={styles.questionCont}>
            <Text style={styles.questionText}>Немає акаунту? </Text>
            <Pressable onPress={() => navigation.navigate("Registration")}>
              <Text style={styles.questionText}>Зареєструватися</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  loginContainer: {
    position: "relative",
    width: "100%",
    height: 489,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginBottom: 32,
  },
  input: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  passwordInput: {
    position: "relative",
  },
  showPassBtn: {
    position: "absolute",
    top: 16,
    left: 255,
  },
  showPassText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
  },
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 343,
    height: 51,
    borderRadius: 25,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
  },
  loginText: {
    fontFamily: "Roboto-Regular",
    color: "#fff",
  },
  questionCont: {
    flexDirection: "row",
  },
  questionText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
  },
});
