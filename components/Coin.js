import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ChartPath, ChartPathProvider } from "@rainbow-me/animated-charts";
import moment from "moment";

const Coin = (props) => {
  const [details, setDetails] = useState(false);

  const data = props.data;
  const { width: SIZE } = Dimensions.get("window");

  const formatSparkline = (numbers) => {
    const sevenDaysAgo = moment().subtract(7, "days").unix();
    let formattedSparkline = numbers.map((item, index) => {
      return {
        x: sevenDaysAgo + (index + 1) * 3600,
        y: item,
      };
    });
    return formattedSparkline;
  };

  useEffect(() => {}, [details]);

  const formattedData = formatSparkline(data);

  return (
    <TouchableOpacity
      className="bg-white p-2"
      onPress={() => {
        setDetails(!details);
      }}
    >
      <View className="flex-row  justify-between p-1 pr-2 pl-2">
        <View className="flex-row items-center space-x-3">
          <Image className="w-10 h-10" source={{ uri: `${props.image}` }} />
          <View className="justify-center">
            <Text className="text-lg font-bold">{props.name}</Text>
            <Text className="text-sm font-semibold text-gray-400">
              {props.symbol}
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-lg pr-1 font-semibold">
            {(Math.round(props.current_price * 100) / 100).toFixed(2) + "$"}
          </Text>
          <Text
            style={
              props.price_change_percentage_24h < 0 ? style.lower : style.higher
            }
          >
            {"%" +
              (
                Math.round(props.price_change_percentage_24h * 100) / 100
              ).toFixed(2)}
          </Text>
        </View>
      </View>
      {details && (
        <View className="mt-5" style={{ backgroundColor: "white" }}>
          <Text className="absolute right-2 text-gray-500 justify-end">
            last 7d
          </Text>
          <ChartPathProvider
            data={{ points: formattedData, smoothingStrategy: "bezier" }}
          >
            <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          </ChartPathProvider>
        </View>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  lower: {
    color: "red",
  },
  higher: {
    color: "green",
  },
});

export default Coin;
