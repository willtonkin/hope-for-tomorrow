import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.sectionContainer}>
          <Text style={styles.subheadingText}>What is "carbon intensity"?</Text>
          <Text style={styles.bodyText}>
            Carbon intensity is a measure of the greenhouse gas emissions
            associated with producing the electricity you consume (in gCO2eq/kWh
            - grams of carbon dioxide equivalents emitted per kilowatt hour of
            electricity consumed). We measure the emissions of electricity
            consumption (not production), meaning all greenhouse gas emissions
            (both CO2 and other greenhouse gases such as methane) that has gone
            into producing the electricity which is being consumed in an area,
            taking into account the carbon intensities of the electricity
            imported from other areas. We use a life cycle analysis (LCA)
            approach, meaning that we take into account emissions arising from
            the whole life cycle of power plants (construction, fuel production,
            operational emissions, and decommissioning).
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.subheadingText}>
            What is the difference between “renewable” and “low-carbon”?
          </Text>
          <Text style={styles.bodyText}>
            Renewable energy production is based on renewable energy sources
            such as wind and water flow, sunshine, and geothermal energy.
            Low-carbon energy production means that the production involves a
            very low level of greenhouse gas emissions, such as in nuclear power
            production.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity
            onPress={handleFindOutPress}
            style={styles.helpLink}
          >
            <Text style={styles.findOutLinkText}>
              read more of the FAQs at electricityMap.org
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

InfoScreen.navigationOptions = {
  title: "Information"
};

function handleFindOutPress() {
  WebBrowser.openBrowserAsync("https://www.electricitymap.org/?page=faq");
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  headlineText: {
    color: "rgba(50,50,50, 1)",
    fontSize: 32,
    textAlign: "center"
  },
  bodyText: {
    color: "rgba(50,50,50, 1)",
    fontSize: 18,
    lineHeight: 24
  },
  sectionContainer: {
    paddingTop: 32
  },
  subheadingText: {
    fontSize: 24,
    color: "rgba(50,50,50, 1)"
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
  }
});
