import { Stack, useRouter } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, TextInput, ToastAndroid } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { Pets } from "~/constant/type";
import { command } from "~/app/redux/Slice/commandSlice";
import { getPets } from "../redux/Slice/petSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Pets[]>([]);
  const [cardNumber, setCardNumber] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.command);

  const loadCart = async () => {
    try {
      const userData = await AsyncStorage.getItem("User");
      const userId = userData ? JSON.parse(userData)._id : null;

      if (!userId) {
        console.error("Utilisateur non trouvé.");
        return;
      }

      const cartKey = `cart_${userId}`;
      const storedCart = await AsyncStorage.getItem(cartKey);
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];

      if (!Array.isArray(parsedCart)) {
        console.error("Les données du panier sont corrompues :", parsedCart);
        return;
      }

      setCartItems(parsedCart);
    } catch (error) {
      console.error("Erreur lors du chargement du panier :", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const CommandeCart = async () => {
    if (cartItems.length === 0) {
      ToastAndroid.show("Votre panier est vide.", ToastAndroid.SHORT);
      return;
    }

    try {
      const userData = await AsyncStorage.getItem("User");
      const userId = userData ? JSON.parse(userData)._id : null;

      if (!userId) {
        ToastAndroid.show("Erreur : utilisateur non trouvé.", ToastAndroid.SHORT);
        return;
      }

      const petsId = cartItems.map((item) => item._id);
      const totalamount = cartItems.reduce((sum, item) => sum + (item.Prix || 0), 0);

      await dispatch(command({ petsId, userId, totalamount })).unwrap();
      await dispatch(getPets()).unwrap();

      const cartKey = `cart_${userId}`;
      await AsyncStorage.removeItem(cartKey);
      setCartItems([]);

      ToastAndroid.show("Commande enregistrée avec succès.", ToastAndroid.SHORT);
      router.push('/cart/success')
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
      ToastAndroid.show("Échec de l'enregistrement de la commande.", ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView className="flex-1 bg-purple-50">
      <Stack.Screen
        options={{
          title: "Paiement",
          headerStyle: { backgroundColor: "#491975" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="p-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Détails de la carte</Text>
          <View className="space-y-4">
            <View>
              <Text className="text-gray-600 mb-2">Numéro de carte</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl p-3">
                <FontAwesome name="credit-card" size={24} color="#491975" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800"
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  maxLength={19}
                  value={cardNumber}
                  onChangeText={handleCardNumberChange}
                />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={CommandeCart}
          
          disabled={isLoading}
          className={`bg-purple-600 py-4 px-6 rounded-xl flex-row justify-center items-center ${isLoading ? "opacity-70" : ""}`}
        >
          {isLoading ? (
            <Text className="text-white font-bold text-lg">Traitement en cours...</Text>
          ) : (
            <>
              <Feather name="lock" size={20} color="#fff" />
              <Text className="ml-2 text-white font-bold text-lg">Payer</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
