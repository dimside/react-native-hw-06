import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { posts } from "../data/posts";

export const CreatePostsScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [place, setPlace] = useState(null);
  const [location, setLocation] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const handleSubmit = () => {
    if (!photo) return
    const post = {
      id: uuid.v4(),
      image: photo,
      description: photoName,
      place,
      location,
      comments: [],
      likes: 0,
    };
    posts.push(post);

    handleDelete(), setLocation(null);

    navigation.navigate("Home", { screen: "Posts" });
  };

  const handleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleCameraShot = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
      console.log(photo);
    }
  };

  const handlePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    } else {
      return console.log("Image editing canceled");
    }
  };

  const handleDelete = () => {
    setPhoto(null);
    setPhotoName(null);
    setPlace(null);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.photoContainer}>
              {photo && (
                <Image source={{ uri: photo }} style={styles.photoStyle} />
              )}
              {hasPermission === false && (
                <Text style={styles.accessWarn}>No access to camera</Text>
              )}
              {hasPermission !== null && hasPermission !== false && !photo && (
                <Camera
                  style={styles.cameraContainer}
                  type={type}
                  ref={setCameraRef}
                >
                  <Pressable
                    style={styles.flipCamera}
                    onPress={handleCameraType}
                  >
                    <Ionicons
                      name="camera-reverse-outline"
                      size={22}
                      color="#BDBDBD"
                    />
                  </Pressable>
                  <Pressable
                    style={styles.cameraIcon}
                    onPress={handleCameraShot}
                  >
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color="#BDBDBD"
                    />
                  </Pressable>
                </Camera>
              )}
            </View>

            <Text style={styles.photoText} onPress={handlePhoto}>
              {!photo ? "Завантажте фото" : "Редагувати фото"}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                value={photoName}
                onChangeText={setPhotoName}
              ></TextInput>
            </View>
            <View style={[styles.inputContainer, { marginBottom: 32 }]}>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              <TextInput
                style={[styles.input, { marginLeft: 4 }]}
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                value={place}
                onChangeText={setPlace}
                maxLength={30}
              ></TextInput>
            </View>

            <Pressable
              style={[
                styles.publishBtn,
                photo
                  ? { backgroundColor: "#FF6C00" }
                  : { backgroundColor: "#F6F6F6" },
              ]}
              disabled={!photo}
            >
              <Text style={styles.publishBtnText} onPress={handleSubmit}>
                Опубліковати
              </Text>
            </Pressable>
            <Pressable style={styles.deleteBtn} onPress={handleDelete}>
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
  },
  container: { alignItems: "center" },

  photoContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  photoStyle: {
    width: "100%",
    height: "100%",
  },

  cameraContainer: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  flipCamera: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff90",
    top: 10,
    left: 10,
  },
  accessWarn: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    color: "#212121",
  },

  cameraIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff90",
  },

  photoText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    alignSelf: "flex-start",
    marginBottom: 32,
  },
  inputContainer: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  input: {
    height: 50,
    width: "100%",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  publishBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 51,
    fontStyle: "Roboto-Regular",
    fontSize: 16,
    borderRadius: 100,
    marginBottom: 80,
  },
  publishBtnText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  deleteBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});
