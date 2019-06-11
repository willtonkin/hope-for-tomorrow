import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { connect } from "react-redux";

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  }
};

function chartData(fossilFreePercentage, renewablePercentage) {
  return {
    labels: ["Fossel Free", "Renewable"],
    datasets: [
      {
        data: [fossilFreePercentage, renewablePercentage]
      }
    ]
  };
}

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16
};

const screenWidth = Dimensions.get("window").width;

function PowerConsumptionBreakdown({
  fossilFreePercentage,
  renewablePercentage
}) {
  return (
    <View style={styles.container}>
      <BarChart
        chartConfig={chartConfig}
        data={chartData(fossilFreePercentage, renewablePercentage)}
        fromZero={true}
        height={220}
        style={graphStyle}
        width={screenWidth}
        yAxisLabel={"%"}
      />
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
  console.log(state.powerConsumptionBreakdownLatestData);

  if (
    !(
      "fossilFreePercentage" in state.powerConsumptionBreakdownLatestData ||
      "renewablePercentage" in state.powerConsumptionBreakdownLatestData
    )
  ) {
    return { fossilFreePercentage: 0, renewablePercentage: 0 };
  }

  const {
    fossilFreePercentage,
    renewablePercentage
  } = state.powerConsumptionBreakdownLatestData;
  console.log("nope");
  return { fossilFreePercentage, renewablePercentage };
}

export default connect(mapStateToProps)(PowerConsumptionBreakdown);
