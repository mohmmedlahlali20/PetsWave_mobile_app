import { Stack, useRouter } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, Image, ToastAndroid, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { replaceIp } from "~/hooks/helpers";
import { Pets } from "~/constant/type";
import React from "react";

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Pets[]>([]);

  const loadCart = async () => {
    const storedCart = await AsyncStorage.getItem("cart");
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (_id: string) => {
    try {
      const existingCart = await AsyncStorage.getItem("cart");
      const cart = existingCart ? JSON.parse(existingCart) : [];

      const updatedCart = cart.filter((item: { id: string; }) => item.id !== _id);

      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));

      setCartItems(updatedCart);

      ToastAndroid.show("Animal retiré du panier !", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'animal du panier :", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la suppression de l'animal du panier. Veuillez réessayer.",
        [{ text: "OK" }]
      );
    }
  };

  console.log(cartItems);

  return (
    <ScrollView className="flex-1 bg-purple-50">
      <Stack.Screen
        options={{
          title: "Panier",
          headerStyle: { backgroundColor: "#491975" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="p-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Articles</Text>

          {cartItems.length === 0 ? (
            <Text className="text-center text-gray-500">Le panier est vide.</Text>
          ) : (
            cartItems.map((item) => (
              <View key={item._id} className="flex-row items-center py-4 border-b border-gray-100 last:border-0">
                <Image
                  source={{ uri: item.images?.[0] ? replaceIp(item.images[0], '192.168.1.11') : undefined }}
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
            ))
          )}
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Mode de livraison</Text>
          <TouchableOpacity
            className={"flex-row items-center justify-between p-4 rounded-xl mb-2 border border-purple-600 bg-purple-50"}
          >
            <View className="flex-1">
              <Text className="font-medium text-gray-800">Option de livraison</Text>
              <Text className="text-gray-500 text-sm">Durée</Text>
            </View>
            <Text className="font-semibold text-gray-800">150 €</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-purple-600 py-4 px-6 rounded-xl flex-row justify-center items-center"
          onPress={() => router.push("/cart/checkout")}
        >
          <Feather name="credit-card" size={20} color="#fff" className="mr-2" />
          <Text className="ml-2 text-white font-bold text-lg">Procéder au paiement</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
