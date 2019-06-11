import { API_KEY } from 'react-native-dotenv'

const fetchConfig = {
  method: "GET",
  headers: { "auth-token": API_KEY }
};

export const carbonIntensityLatest = async (lat, lon) => {
  const url = new URL(
    "https://api.electricitymap.org/v3/carbon-intensity/latest"
  );

  if (typeof lat === "number" && typeof lon === "number") {
    const params = { lat, lon };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
  }

  try {
    return await fetch(url, fetchConfig).then(response => response.json());
  } catch (e) {
    throw new Error("Failed to get latest carbon intensity", e);
  }
};

export const powerConsumptionBreakdownLatest = async (lat, lon) => {
  const url = new URL(
    "https://api.electricitymap.org/v3/power-consumption-breakdown/latest"
  );

  if (typeof lat === "number" && typeof lon === "number") {
    const params = { lat, lon };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
  }

  try {
    return await fetch(url, fetchConfig).then(response => response.json());
  } catch (e) {
    throw new Error("Failed to get latest carbon consumption breakdown", e);
  }
};
