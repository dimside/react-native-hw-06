import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import UserImg from "../../assets/images/user.jpg";
import { posts } from "../data/posts";
import { Post } from "../components/Post";

export const PostsScreen = () => {
  const { userImage, login, email } = useSelector(selectUser);
 
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
