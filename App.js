import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import axios from "axios";
import Coin from "./components/Coin";

export default function App() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getData();
  }, [refreshing]);

  const getData = async () => {
    try {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d
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
    <View className="flex-1 bg-gray-500">
      <Text className="text-xl text-white font-bold pt-12 pb-2 pl-5 pr-5">
        Crypto Tracker
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-0.5 mt-1 mb-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data.map((coin) => (
          <View key={coin.id}>
            <Coin
              image={coin.image}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              current_price={coin.current_price}
              price_change_percentage_24h={coin.price_change_percentage_24h}
              data={coin.sparkline_in_7d.price}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
