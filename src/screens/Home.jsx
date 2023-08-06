import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { LogOutIcon } from "../components/LogOutIcon";
import { BackArrowIcon } from "../components/BackArrowIcon";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={styles.navigationStyle}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: LogOutIcon,
          title: "Публікації",
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerLeft: BackArrowIcon,
          title: "Створити публікацію",
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigationStyle: {
    headerStyle: {
      backgroundColor: "#fff",
      height: 88,
      borderBottomWidth: 1,
      borderBottomColor: "#00000050",
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      textAlign: "center",
      fontFamily: "Roboto-Medium",
      fontSize: 17,
      color: "#212121",
    },
    headerLeftContainerStyle: { paddingLeft: 16 },
    headerRightContainerStyle: { paddingRight: 16 },

    tabBarStyle: {
      height: 58,
      backgroundColor: "#ffffff",
      paddingTop: 9,
      paddingLeft: 67,
      paddingRight: 67,
      borderTopWidth: 1,
      borderTopColor: "#21212180",
    },
    tabBarItemStyle: {
      height: 40,
      width: 70,
      borderRadius: 20,
    },
    tabBarShowLabel: false,
    tabBarActiveTintColor: "#fff",
    tabBarInactiveTintColor: "#21212180",
    tabBarActiveBackgroundColor: "#FF6C00",
  },
});
