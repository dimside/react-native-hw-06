import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  Pressable,
} from "react-native";
import { LogOutIcon } from "../components/LogOutIcon";
import { selectUser } from "../redux/auth/selectors";
// import UserImg from "../../assets/images/user.jpg";
import { selectPosts } from "../redux/posts/selectors";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Post } from "../components/Post";
import AddBtn from "../../assets/images/addBtn.png";
import DelBtn from "../../assets/images/delBtn.png";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authLogOut } from "../redux/auth/operations";

export const ProfileScreen = () => {
  const { login, userImage } = useSelector(selectUser);
  const [userAvatar, setUserAvatar] = useState(userImage);
    const dispatch = useDispatch();

  const posts = useSelector(selectPosts);

  const handleAddBtnPress = async () => {
    if (!userAvatar) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setUserAvatar(result.assets[0].uri);
      } else {
        return console.log("Add image canceled");
      }
    } else {
      setUserAvatar(null);
      console.log("userAvatar", userAvatar);
    }
  };

  const handleLogOut = () => {
    dispatch(authLogOut());
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable
          onPress={handleLogOut}
          style={styles.logOutBtn}
          hitSlop={{ left: 10, bottom: 10, top: 10, right: 10 }}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </Pressable>
        <View style={styles.avatarContainer}>
          <Pressable style={styles.addButton} onPress={handleAddBtnPress}>
            <Image
              source={userAvatar ? DelBtn : AddBtn}
              style={styles.addBtnImg}
            />
          </Pressable>
          <Image
            style={styles.avatar}
            source={{ uri: userAvatar }}
            alt="avatar"
          />
        </View>

        <Text style={styles.posterName}>{login}</Text>
        {posts.length > 0 && (
          <FlatList
            data={posts}
            renderItem={({ item }) => <Post itemInfo={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 148,
    paddingBottom: 100,
  },
  profileContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
  },
  logOutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  addButton: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    position: "absolute",
    top: 81,
    left: 107,
    zIndex: 100,
  },
  addBtnImg: {
    borderRadius: 12.5,
  },
  avatarContainer: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -60,
    backgroundColor: "white",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  delAvatarButton: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 82,
    left: 108,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "rgba(232, 232, 232, 1)",
    borderWidth: 1,
  },
  posterName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "rgba(33, 33, 33, 1)",
    marginBottom: 33,
    alignSelf: "center",
  },
});
