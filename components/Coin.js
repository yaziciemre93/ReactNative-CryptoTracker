import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const Coin = (props) => {
  return (
    <View className="flex-row bg-white justify-between p-1 pr-5 pl-5">
      <View className="flex-row items-center space-x-3">
        <Image className="w-10 h-10" source={{ uri: `${props.image}` }} />
        <View>
          <Text className="text-lg font-bold">{props.name}</Text>
          <Text className="text-lg text-gray-500">{props.symbol}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-lg pr-1">{props.current_price}</Text>
        <Text
          style={
            props.price_change_percentage_24h < 0 ? style.lower : style.higher
          }
        >
          {"%" +
            (Math.round(props.price_change_percentage_24h * 100) / 100).toFixed(
              2
            )}
        </Text>
      </View>
    </View>
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
