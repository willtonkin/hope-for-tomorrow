import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export async function getLocationAsync() {
  const { status, permissions } = await Permissions.askAsync(
    Permissions.LOCATION
  );

  if (status !== "granted") {
    throw new Error("Location permission not granted");
  }

  const response = await Location.getCurrentPositionAsync();

  const { longitude: lon, latitude: lat } = response.coords

  return {lat, lon};
}