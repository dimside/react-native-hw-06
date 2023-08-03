import { Text, View, Image, StyleSheet } from "react-native";

export const Comment = ({ comments }) => {
  const { author, text, date } = comments;
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentTextContainer}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image
        style={styles.image}
        source={require("../../assets/images/user-photo-2.jpg")}
      />
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
    borderTopRightRadius: 6,
    borderTopLeftRadius: 0,
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
