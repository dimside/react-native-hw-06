import { StyleSheet, ImageBackground, View } from "react-native";
import BcgImage from "./assets/images/bcgi.jpg";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { PostsScreen } from "./src/screens/PostsScreen";
import { CommentsScreen } from "./src/screens/CommentsScreen";
import { MapScreen } from "./src/screens/MapScreen";
import { Home } from "./src/screens/Home";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { BackArrowIcon } from "./src/components/BackArrowIcon";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={styles.navContainer}>
        <View style={styles.container}>
          <ImageBackground
            source={BcgImage}
            resizeMode="cover"
            style={styles.bcgImg}
          />
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Posts"
              component={PostsScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Comments"
              component={CommentsScreen}
              options={styles.commentsScreen}
            />
            <MainStack.Screen
              name="Map"
              component={MapScreen}
              options={{ ...styles.commentsScreen, title: "Мапа" }}
            />
          </MainStack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  bcgImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  navContainer: {
    colors: {
      background: "transparent",
    },
  },
  commentsScreen: {
    headerLeft: BackArrowIcon,
    title: "Коментарі",
    headerTitleStyle: {
      textAlign: "center",
      fontFamily: "Roboto-Medium",
      fontSize: 17,
      color: "#212121",
    },
    headerRightContainerStyle: { paddingRight: 16 },
    headerLeftContainerStyle: { paddingLeft: 16 },
    headerStyle: {
      backgroundColor: "#fff",
      height: 88,
      borderBottomWidth: 1,
      borderBottomColor: "#00000050",
    },
    headerTitleAlign: "center",
  },
});
