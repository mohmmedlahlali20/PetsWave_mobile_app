

import { Stack, useRouter } from "expo-router"
import { Text, View, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import React from "react"

export default function Success() {
  const router = useRouter()

  return (
    <View className="flex-1 bg-purple-50 justify-center items-center p-4">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="bg-white rounded-2xl p-8 shadow-lg items-center max-w-sm w-full">
        <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-6">
          <Feather name="check" size={32} color="#10B981" />
        </View>

        <Text className="text-2xl font-bold text-gray-800 text-center mb-2">Paiement réussi !</Text>
        <Text className="text-gray-600 text-center mb-8">
          Votre commande a été confirmée et sera expédiée sous peu.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/")}
          className="bg-purple-600 py-3 px-6 rounded-xl flex-row items-center"
        >
          <Feather name="home" size={20} color="#fff" />
          <Text className="ml-2 text-white font-semibold">Retour à l'accueil</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

