import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

export const MapScreen = () => {
  const {
    params: {
      location: { latitude, longitude },
      place,
      description,
    },
  } = useRoute();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        mapType="standard"
        showsUserLocation={true}
        rotateEnabled={true}
        scrollEnabled={true}
        showsCompass={true}
        minZoomLevel={5}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title={place}
          coordinate={{ latitude: latitude, longitude: longitude }}
          description={description}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
