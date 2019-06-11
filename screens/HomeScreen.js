import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";

import TestComponent from "../components/TestComponent";
import { MonoText } from "../components/StyledText";
import CarbonIntensity from "../components/CarbonIntensity";
import PowerConsumptionBreakdown from "../components/PowerConsumptionBreakdown";

import { fetchData } from "../actions";
import { zoneShortName } from "../api/constants";

function getZoneTitle(zone) {
  if (zone in zoneShortName) {
    return zoneShortName[zone].zoneName;
  }

  return null;
}

function HomeScreen({
  dispatch,
  errorMessage,
  isError,
  isFetching,
  lastUpdated,
  zone
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => dispatch(fetchData())}
          />
        }
      >
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require("../assets/images/robot-dev.png")
                : require("../assets/images/robot-prod.png")
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.centeredContainer}>
          <Text style={styles.getStartedText}>
            See how clean your local energy is
            {zone && <> in {getZoneTitle(zone)}</>}
          </Text>

          <Text style={styles.getStartedText}>Current Carbon Intensity</Text>
        </View>

        <View style={styles.centeredContainer}>
          <CarbonIntensity />
        </View>

        <View style={styles.centeredContainer}>
          <Text style={styles.getStartedText}>Power Consumption</Text>
        </View>

        <View>
          <PowerConsumptionBreakdown />
        </View>

        <View style={styles.helpContainer}>
          {lastUpdated > 0 && (
            <Text style={styles.lastUpdatedText}>last updated at {lastUpdated}.</Text>
          )}
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity
            onPress={handleFindOutPress}
            style={styles.helpLink}
          >
            <Text style={styles.findOutLinkText}>
              find out more about electricityMap.org
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isError && (
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Error, try refreshing again</Text>
          <Text style={styles.tabBarInfoText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

function handleFindOutPress() {
  WebBrowser.openBrowserAsync("https://electricityMap.org");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  centeredContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  findOutLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  lastUpdatedText: {
    fontSize: 14
  }
});

function mapStateToProps(state) {
  const { errorMessage, isError, isFetching, lastUpdated } = state;

  const zone =
    "zone" in state.carbonIntensityLatestData
      ? state.carbonIntensityLatestData.zone
      : null;

  return { errorMessage, isError, isFetching, lastUpdated, zone };
}

export default connect(mapStateToProps)(HomeScreen);
