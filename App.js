import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import axios from "axios";
import Coin from "./components/Coin";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false

    `
        )
        .then((response) => {
          setData(response.data);
          console.log(data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View className="flex-1 bg-gray-200">
      <Text className="text-xl font-bold pt-12 pb-2 pl-5 pr-5">
        Crypto Tracker
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-1 mt-1 mb-5"
      >
        {data.map((coin) => (
          <View key={coin.id}>
            <Coin
              image={coin.image}
              name={coin.name}
              symbol={coin.symbol}
              current_price={coin.current_price}
              price_change_percentage_24h={coin.price_change_percentage_24h}
            />
            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
