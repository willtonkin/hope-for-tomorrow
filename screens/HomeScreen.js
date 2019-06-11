import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";

import { fetchData } from "../actions";
import { zoneShortName } from "../api/constants";
import CarbonIntensity from "../components/CarbonIntensity";
import PowerConsumptionBreakdown from "../components/PowerConsumptionBreakdown";

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
    <View style={styles.outerContainer}>
      <ImageBackground
        source={require("../assets/images/header-wind.jpg")}
        style={styles.headerBackgroundImage}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,1)"]}
          style={styles.headerGradient}
        />
      </ImageBackground>
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
        <View style={styles.centeredContainer}>
          {zone && (
            <Text style={styles.headlineText}>{getZoneTitle(zone)}</Text>
          )}
          <Text style={styles.getStartedText}>
            See how clean your local energy is
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.subheadingText}>Current Carbon Intensity</Text>
          <View style={styles.centeredContainer}>
            <CarbonIntensity />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.subheadingText}>Power Consumption</Text>
          <PowerConsumptionBreakdown />
        </View>

        <View style={styles.helpContainer}>
          {lastUpdated > 0 && (
            <Text style={styles.lastUpdatedText}>
              last updated at {new Date(lastUpdated).toTimeString()}.
            </Text>
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
  outerContainer: { flex: 1 },
  container: {
    flex: 1,
    marginTop: -200
  },
  contentContainer: {
    paddingTop: 150
  },
  centeredContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  headerBackgroundImage: {
    width: "100%",
    height: 200
  },
  headerGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 200
  },
  headlineText: {
    color: "rgba(50,50,50, 1)",
    fontSize: 32,
    textAlign: "center"
  },
  sectionContainer: {
    paddingTop: 32
  },
  subheadingText: {
    fontSize: 24,
    color: "rgba(50,50,50, 1)",
    textAlign: "center"
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
