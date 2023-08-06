import { Text, View, Image, StyleSheet } from "react-native";
import userPhoto from "../../assets/images/user-photo-2.jpg";

export const Comment = ({ comment, userImage, userName }) => {
  const { author, text, date } = comment;

  const ownerStyle = (type) => {
    switch (type) {
      case "container":
        return userName === author
          ? {
              flexDirection: "row-reverse",
            }
          : {};
      case "border":
        return userName === author
          ? {
              borderTopLeftRadius: 6,
              borderTopRightRadius: 0,
            }
          : {};
      case "data":
        return userName === author
          ? {
              alignSelf: "flex-start",
            }
          : {};
      default:
        return;
    }
  };

  return (
    <View style={[styles.commentContainer, ownerStyle("container")]}>
      <Image
        style={styles.image}
        source={userName === author ? { uri: userImage } : userPhoto}
      />
      <View style={[styles.commentTextContainer, ownerStyle("border")]}>
        <Text style={styles.text}>{text}</Text>
        <Text style={[styles.date, ownerStyle("data")]}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 24,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentTextContainer: {
    width: 299,
    padding: 16,
    backgroundColor: "#00000009",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    alignSelf: "flex-end",
  },
});
