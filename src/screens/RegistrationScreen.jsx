import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AddBtn from "../../assets/images/addBtn.png";
import DelBtn from "../../assets/images/delBtn.png";
import { useDispatch, useSelector } from "react-redux";

import { registerDB } from "../redux/auth/operations";

import { selectPosts } from "../redux/posts/selectors";
import { writeDataToFirestore } from "../redux/posts/operations";

export const RegistrationScreen = () => {
  const [userImage, setUserImage] = useState(null);
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isShowPass, setIsShowPass] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  const loginInput = useRef();
  const emailInput = useRef();
  const passInput = useRef();

  const handleAddBtnPress = async () => {
    if (!userImage) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setUserImage(result.assets[0].uri);
      } else {
        return console.log("Add image canceled");
      }
    } else {
      setUserImage(null);
    }
  };

  const handleShowPass = () => {
    setIsShowPass((current) => !current);
  };

  const handleSubmit = () => {
    if (!login || !email || !password) {
      return;
    }
    const credentials = { login, email, password, userImage };
    dispatch(registerDB(credentials));
    dispatch(writeDataToFirestore(posts));

    setLogin(null);
    setEmail(null);
    setPassword(null);
    setUserImage(null);
  };

  const handleOnFocus = (type, inputName) => {
    switch (type) {
      case "focus":
        return () => {
          setIsFocus(true);
          emailInput.current = inputName === "emailInput";
          passInput.current = inputName === "passInput";
          loginInput.current = inputName === "loginInput";
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
        <View style={styles.registrationContainer}>
          <View style={styles.userImgCont}>
            {userImage && (
              <Image style={styles.userImg} source={{ uri: userImage }} />
            )}
            <Pressable style={styles.addButton} onPress={handleAddBtnPress}>
              <Image
                source={userImage ? DelBtn : AddBtn}
                style={styles.addBtnImg}
              />
            </Pressable>
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={inputStyle(loginInput)}
              placeholder="Логін"
              placeholderTextColor="#BDBDBD"
              onChangeText={setLogin}
              value={login}
              ref={loginInput}
              onFocus={handleOnFocus("focus", "loginInput")}
              onBlur={handleOnFocus("blur", "loginInput")}
            />
            <TextInput
              style={inputStyle(emailInput)}
              placeholder="Адреса електронної пошти"
              inputMode="email"
              placeholderTextColor="#BDBDBD"
              onChangeText={setEmail}
              value={email}
              ref={emailInput}
              onFocus={handleOnFocus("focus", "emailInput")}
              onBlur={handleOnFocus("blur", "emailInput")}
            />
            <View style={styles.passwordInput}>
              <TextInput
                style={[...inputStyle(passInput), { marginBottom: 43 }]}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={isShowPass}
                ref={passInput}
                onFocus={handleOnFocus("focus", "passInput")}
                onBlur={handleOnFocus("blur", "passInput")}
              />
              <Pressable style={styles.showPassBtn} onPress={handleShowPass}>
                <Text style={styles.showPassText}>
                  {isShowPass ? "Показати" : "Сховати"}
                </Text>
              </Pressable>
            </View>
            <Pressable style={styles.registerBtn} onPress={handleSubmit}>
              <Text style={styles.registerText}>Зареєстуватися</Text>
            </Pressable>
          </KeyboardAvoidingView>
          <View style={styles.questionCont}>
            <Text style={styles.questionText}>Вже є акаунт? </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.questionText}>Увійти</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  registrationContainer: {
    position: "relative",
    width: "100%",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingTop: 92,
    paddingBottom: 78,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
  },
  userImgCont: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addButton: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    position: "absolute",
    top: 81,
    left: 107,
  },
  addBtnImg: {
    borderRadius: 12.5,
  },
  userImg: {
    flex: 1,
    borderRadius: 16,
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
  registerBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 343,
    height: 51,
    borderRadius: 25,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
  },
  registerText: {
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
