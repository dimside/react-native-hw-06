import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import commentLogo from "../../assets/images/comentsIcon.png";
import { useNavigation } from "@react-navigation/native";

export const Post = ({ itemInfo }) => {
  const { id, description, place, location, comments, likes, image } = itemInfo;
  const navigation = useNavigation();

  const handleComments = () => {
    navigation.navigate("Comments", {
      image,
      postId: id,
      comments,
    });
  };

  const handleLocation = () => {
    navigation.navigate("Map", { location, place, description });
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image source={{ uri: image }} style={styles.photo} alt={description} />
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.comentsAndPlaceContainer}>
        <Pressable style={styles.comments} onPress={handleComments}>
          {comments.length > 0 ? (
            <Image source={commentLogo} style={{ marginRight: 6 }} />
          ) : (
            <Feather
              name="message-circle"
              size={24}
              color="#BDBDBD"
              style={[{ transform: [{ scaleX: -1 }] }, { marginRight: 6 }]}
            />
          )}
          <Text style={styles.comentsNumber}>{comments.length}</Text>
        </Pressable>
        {likes !== 0 && (
          <View style={styles.thumb}>
            <Feather
              name="thumbs-up"
              size={24}
              color="#FF6C00"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.comentsNumber}>{likes}</Text>
          </View>
        )}
        <Pressable style={styles.place} onPress={handleLocation}>
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.placeText}>{place}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  photoContainer: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: 240,
  },
  description: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
  },
  comentsAndPlaceContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  thumb: {
    flexDirection: "row",
    alignItems: "center",
  },
  place: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 1,
    alignItems: "center",
  },
  placeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
});
