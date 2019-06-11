import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

function CarbonIntensity({ carbonIntensity }) {
  return (
    <View style={styles.container}>
      <Text>{carbonIntensity}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});

function mapStateToProps(state) {
  console.log(state.carbonIntensityLatestData);

  if (!("carbonIntensity" in state.carbonIntensityLatestData)) {
    return { carbonIntensity: 0 };
  }

  const { carbonIntensity } = state.carbonIntensityLatestData;

  return { carbonIntensity };
}

export default connect(mapStateToProps)(CarbonIntensity);
