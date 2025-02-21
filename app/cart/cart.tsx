import { Stack, useRouter } from "expo-router"
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useState } from "react"
import React from "react"

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

type ShippingOption = {
  id: number
  name: string
  price: number
  duration: string
}

const shippingOptions: ShippingOption[] = [
  {
    id: 1,
    name: "Livraison Standard",
    price: 4.99,
    duration: "3-5 jours ouvrés",
  },
  {
    id: 2,
    name: "Livraison Express",
    price: 9.99,
    duration: "1-2 jours ouvrés",
  },
  {
    id: 3,
    name: "Livraison Gratuite",
    price: 0,
    duration: "5-7 jours ouvrés",
  },
]

export default function Cart() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Harnais Adventure Pro",
      price: 49.99,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 1,
      size: "M",
      color: "Bleu",
    },
    {
      id: 2,
      name: "Croquettes Premium Bio",
      price: 29.99,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 2,
    },
  ])
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(shippingOptions[0])
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + selectedShipping.price - discount

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
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Articles ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </Text>

          {cartItems.map((item) => (
            <View key={item.id} className="flex-row items-center py-4 border-b border-gray-100 last:border-0">
              <Image source={{ uri: item.image }} className="w-20 h-20 rounded-lg" resizeMode="cover" />

              <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="font-medium text-gray-800 mb-1">{item.name}</Text>
                    {item.size && <Text className="text-gray-500 text-sm">Taille: {item.size}</Text>}
                    {item.color && <Text className="text-gray-500 text-sm">Couleur: {item.color}</Text>}
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.id)} className="p-2">
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <View className="flex-row justify-between items-center mt-2">
                  <View className="flex-row items-center bg-purple-50 rounded-lg">
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} className="p-2">
                      <Feather name="minus" size={18} color="#491975" />
                    </TouchableOpacity>
                    <Text className="px-4 font-medium">{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} className="p-2">
                      <Feather name="plus" size={18} color="#491975" />
                    </TouchableOpacity>
                  </View>
                  <Text className="font-semibold text-gray-800">{(item.price * item.quantity).toFixed(2)} €</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

       
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Mode de livraison</Text>

          {shippingOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedShipping(option)}
              className={`flex-row items-center justify-between p-4 rounded-xl mb-2 border ${
                selectedShipping.id === option.id ? "border-purple-600 bg-purple-50" : "border-gray-200"
              }`}
            >
              <View className="flex-1">
                <Text className="font-medium text-gray-800">{option.name}</Text>
                <Text className="text-gray-500 text-sm">{option.duration}</Text>
              </View>
              <Text className="font-semibold text-gray-800">
                {option.price === 0 ? "Gratuit" : `${option.price.toFixed(2)} €`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promo Code */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Code promo</Text>

          <View className="flex-row items-center">
            <View className="flex-1 bg-purple-50 rounded-l-xl px-4 py-3">
              <Text className="text-gray-600">{promoApplied ? "PROMO10" : "Entrez votre code"}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setPromoApplied(!promoApplied)}
              className={`px-6 py-3 rounded-r-xl ${promoApplied ? "bg-red-500" : "bg-purple-600"}`}
            >
              <Text className="font-medium text-white">{promoApplied ? "Retirer" : "Appliquer"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Récapitulatif</Text>

          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Sous-total</Text>
              <Text className="font-medium text-gray-800">{subtotal.toFixed(2)} €</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">Livraison</Text>
              <Text className="font-medium text-gray-800">
                {selectedShipping.price === 0 ? "Gratuit" : `${selectedShipping.price.toFixed(2)} €`}
              </Text>
            </View>

            {promoApplied && (
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Réduction (10%)</Text>
                <Text className="font-medium text-green-600">-{discount.toFixed(2)} €</Text>
              </View>
            )}

            <View className="flex-row justify-between pt-2 border-t border-gray-100">
              <Text className="font-semibold text-gray-800">Total</Text>
              <Text className="font-bold text-xl text-purple-600">{total.toFixed(2)} €</Text>
            </View>
          </View>
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
  )
}

