import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import UserImg from "../../assets/images/user.jpg";

import { Post } from "../components/Post";
import { selectPosts, selectPostsId } from "../redux/posts/selectors";
import {
  getDataFromFirestore,
  updateDataInFirestore,
} from "../redux/posts/operations";
import { useEffect } from "react";

export const PostsScreen = () => {
  const posts = useSelector(selectPosts);
  const { userImage, login, email } = useSelector(selectUser);
  const dispatch = useDispatch();
  const postsId = useSelector(selectPostsId);

  useEffect(() => {
    dispatch(getDataFromFirestore());
  }, []);

  useEffect(() => {
    updateDataInFirestore(postsId, posts);
  }, [posts]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userImageContainer}>
          <Image
            style={styles.userImage}
            source={userImage ? { uri: userImage } : UserImg}
            alt="avatar"
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post itemInfo={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userImageContainer: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,
    overflow: "hidden",
  },
  userImage: { width: 60, height: 60 },
  userName: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
    color: "#21212180",
  },
});
