import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export const UPDATE_TEXT_VALUE = "UPDATE_TEXT_VALUE";
export const REQUEST_STARTED = "REQUEST_STARTED";
export const REQUEST_SUCCEEDED = "REQUEST_SUCCEEDED";
export const REQUEST_FAILED = "REQUEST_FAILED";

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