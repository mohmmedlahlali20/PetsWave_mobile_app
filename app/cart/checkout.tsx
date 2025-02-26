"use client"

import { Stack, useRouter } from "expo-router"
import { Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { Feather, FontAwesome } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Pets } from "~/constant/type"

type PaymentMethod = "card" | "paypal" | "apple"
type CardType = "visa" | "mastercard" | "amex" | "unknown"

type CheckoutStep = "shipping" | "payment" | "confirmation"

export default function Checkout() {
  const router = useRouter()

  const [cartItems, setCartItems] = useState<Pets[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardType, setCardType] = useState<CardType>("unknown")
  const [isLoading, setIsLoading] = useState(false)


const loadCart = async () => {
  const storedCart = await AsyncStorage.getItem("cart");
  setCartItems(storedCart ? JSON.parse(storedCart) : []);
};



  const detectCardType = (number: string): CardType => {
    if (number.startsWith("4")) return "visa"
    if (number.startsWith("5")) return "mastercard"
    if (number.startsWith("3")) return "amex"
    return "unknown"
  }

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\s/g, "")
    const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim()
    setCardNumber(formatted)
    setCardType(detectCardType(cleaned))
  }

  const handlePayment = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    router.push("/cart/success")
  }

  const renderCardIcon = () => {
    switch (cardType) {
      case "visa":
        return <FontAwesome name="cc-visa" size={24} color="#1434CB" />
      case "mastercard":
        return <FontAwesome name="cc-mastercard" size={24} color="#EB001B" />
      case "amex":
        return <FontAwesome name="cc-amex" size={24} color="#016FD0" />
      default:
        return <FontAwesome name="credit-card" size={24} color="#6B7280" />
    }
  }

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
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-1 h-2 bg-purple-200 rounded-full">
            <View className="w-2/3 h-full bg-purple-600 rounded-full" />
          </View>
          <View className="flex-row items-center px-4">
            <Text className="text-purple-600 font-medium">Étape 2/3</Text>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Mode de paiement
          </Text>

          <View className="space-y-3">
            <TouchableOpacity
              onPress={() => setPaymentMethod("card")}
              className={`flex-row items-center p-4 rounded-xl border ${paymentMethod === "card"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200"
                }`}
            >
              <FontAwesome name="credit-card" size={24} color="#491975" />
              <Text className="ml-3 font-medium text-gray-800">
                Carte bancaire
              </Text>
              {paymentMethod === "card" && (
                <View className="ml-auto">
                  <Feather name="check-circle" size={20} color="#491975" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPaymentMethod("paypal")}
              className={`flex-row items-center p-4 rounded-xl border ${paymentMethod === "paypal"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200"
                }`}
            >
              <FontAwesome name="paypal" size={24} color="#009cde" />
              <Text className="ml-3 font-medium text-gray-800">PayPal</Text>
              {paymentMethod === "paypal" && (
                <View className="ml-auto">
                  <Feather name="check-circle" size={20} color="#491975" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPaymentMethod("apple")}
              className={`flex-row items-center p-4 rounded-xl border ${paymentMethod === "apple"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200"
                }`}
            >
              <FontAwesome name="apple" size={24} color="#000" />
              <Text className="ml-3 font-medium text-gray-800">Apple Pay</Text>
              {paymentMethod === "apple" && (
                <View className="ml-auto">
                  <Feather name="check-circle" size={20} color="#491975" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {paymentMethod === "card" && (
          <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Détails de la carte
            </Text>

            <View className="space-y-4">
              <View>
                <Text className="text-gray-600 mb-2">Numéro de carte</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl p-3 focus:border-purple-600">
                  {renderCardIcon()}
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

              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-gray-600 mb-2">Date d'expiration</Text>
                  <TextInput
                    className="border border-gray-200 rounded-xl p-3"
                    placeholder="MM/AA"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-600 mb-2">CVV</Text>
                  <TextInput
                    className="border border-gray-200 rounded-xl p-3"
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-600 mb-2">Nom sur la carte</Text>
                <TextInput
                  className="border border-gray-200 rounded-xl p-3"
                  placeholder="JEAN DUPONT"
                  autoCapitalize="characters"
                />
              </View>
            </View>
          </View>
        )}

        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Adresse de facturation
          </Text>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-600 mb-2">Adresse</Text>
              <TextInput
                className="border border-gray-200 rounded-xl p-3"
                placeholder="123 rue de la Paix"
              />
            </View>

            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-gray-600 mb-2">Code postal</Text>
                <TextInput
                  className="border border-gray-200 rounded-xl p-3"
                  placeholder="75000"
                  keyboardType="numeric"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-600 mb-2">Ville</Text>
                <TextInput
                  className="border border-gray-200 rounded-xl p-3"
                  placeholder="Paris"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Récapitulatif
          </Text>

          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Sous-total</Text>
              <Text className="font-medium text-gray-800">79.98 €</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Livraison</Text>
              <Text className="font-medium text-gray-800">4.99 €</Text>
            </View>
            <View className="flex-row justify-between pt-2 border-t border-gray-100">
              <Text className="font-semibold text-gray-800">Total</Text>
              <Text className="font-bold text-xl text-purple-600">84.97 €</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handlePayment}
          disabled={isLoading}
          className={`bg-purple-600 py-4 px-6 rounded-xl flex-row justify-center items-center ${isLoading ? "opacity-70" : ""
            }`}
        >
          {isLoading ? (
            <Text className="text-white font-bold text-lg">
              Traitement en cours...
            </Text>
          ) : (
            <>
              <Feather name="lock" size={20} color="#fff" />
              <Text className="ml-2 text-white font-bold text-lg">
                Payer 84.97 €
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-4">
          <Feather name="shield" size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-500 text-sm">
            Paiement sécurisé SSL
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}
