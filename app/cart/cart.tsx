import { FlatList, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { replaceIp } from "~/hooks/helpers";
import { Pets } from "~/constant/type";
import React from "react";
import { Stack } from "expo-router";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Pets[]>([]);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];

      if (!Array.isArray(parsedCart)) {
        console.error("Cart data is corrupted:", parsedCart);
        return;
      }

      setCartItems(parsedCart);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (petId: string) => {
    try {
      const updatedCart = cartItems.filter((item) => item._id !== petId);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } catch (error) {
      console.error(`Error removing ${petId}:`, error);
    }
  };


  const totalPrice = cartItems.reduce((sum, item) => sum + (item.Prix || 0), 0);

  return (
    <ScrollView className="flex-1 bg-purple-50">
      <Stack.Screen
        options={{
          title: "cart",
          headerStyle: { backgroundColor: "#491975" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="p-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Articles</Text>

          <FlatList
            data={cartItems}
            scrollEnabled={false}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={<Text className="text-gray-500 text-center">Votre panier est vide</Text>}
            renderItem={({ item }) => (
              <View className="flex-row items-center py-4 border-b border-gray-100 last:border-0">
                <Image
                  source={{ uri: item.images?.[0] ? replaceIp(item.images[0], '192.168.8.134') : undefined }}
                  className="w-20 h-20 rounded-lg"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="font-medium text-gray-800">{item.name}</Text>
                      <Text className="text-gray-500 text-sm">{item.Prix} MAD</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeItem(item._id)} className="p-2">
                      <Feather name="trash-2" size={20} color="#EF4444" />
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            )}
          />
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Total du panier</Text>
          <View className="flex-row items-center justify-between p-4 rounded-xl border border-purple-600 bg-purple-50">
            <Text className="font-medium text-gray-800 flex-row items-center">Total Pets</Text>
            <Ionicons name="paw" size={24} color="#9333EA" />
            <Text className="font-semibold text-gray-800">{totalPrice} MAD</Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-purple-600 py-4 px-6 rounded-xl flex-row justify-center items-center"
          onPress={() => console.log("Procéder au paiement")}
        >
          <Feather name="credit-card" size={20} color="#fff" />
          <Text className="ml-2 text-white font-bold text-lg">Procéder au paiement ({totalPrice} MAD)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
