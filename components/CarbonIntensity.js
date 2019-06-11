import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

function colorTemperature(carbonIntensity) {
  return "grey";
}

function CarbonIntensity({ carbonIntensity }) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colorTemperature(carbonIntensity)
      }}
    >
      <Text style={styles.intensityText}>{carbonIntensity}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    width: "auto",
    justifyContent: "center",
    alignItems: "center"
  },
  intensityText: {
    fontSize: 28
  }
});

function mapStateToProps(state) {
  if (!("carbonIntensity" in state.carbonIntensityLatestData)) {
    return { carbonIntensity: 0 };
  }

  const { carbonIntensity } = state.carbonIntensityLatestData;

  return { carbonIntensity };
}

export default connect(mapStateToProps)(CarbonIntensity);
