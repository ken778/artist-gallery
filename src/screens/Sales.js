import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
// import PieChart from "react-native-pie-chart";
//import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("screen").width;

export default function Sales({ navigation }) {
  const widthAndHeight = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#f44336", "#2196f3", "#ffeb3b", "#4caf50", "#ff9800"];

  return (
    <View style={styles.container}>
      <View style={styles.AmountContainer}>
        <Text style={styles.Total}>R 70 000</Text>
      </View>

      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Basic</Text>
          {/* <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
          /> */}
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ width: 20, height: 20, backgroundColor: "#f44336" }}
            ></View>
            <Text
              style={{
                color: "#f44336",
                fontWeight: "bold",
                paddingHorizontal: 10,
              }}
            >
              JANUARY
            </Text>
          </View>
          <Text> </Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ width: 20, height: 20, backgroundColor: "#2196f3" }}
            ></View>
            <Text
              style={{
                color: "#2196f3",
                fontWeight: "bold",
                paddingHorizontal: 10,
              }}
            >
              FEBRUARY
            </Text>
          </View>
          <Text> </Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ width: 20, height: 20, backgroundColor: "#ffeb3b" }}
            ></View>
            <Text
              style={{
                color: "#ffeb3b",
                fontWeight: "bold",
                paddingHorizontal: 10,
              }}
            >
              MARCH
            </Text>
          </View>
          <Text> </Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ width: 20, height: 20, backgroundColor: "#4caf50" }}
            ></View>
            <Text
              style={{
                color: "#4caf50",
                fontWeight: "bold",
                paddingHorizontal: 10,
              }}
            >
              APRIL
            </Text>
          </View>
          <Text> </Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ width: 20, height: 20, backgroundColor: "#ff9800" }}
            ></View>
            <Text
              style={{
                color: "#ff9800",
                fontWeight: "bold",
                paddingHorizontal: 10,
              }}
            >
              MAY
            </Text>
          </View>
        </View>

        {/* <BarChart
                    // style={graphStyle}
                    data={data}
                    width={150}
                    height={220}
                    yAxisLabel='$'
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  AmountContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignSelf: "center",
    width: "45%",
    height: "8%",
    margin: 15,
    borderRadius: 10,
  },
  Total: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
  },
});
