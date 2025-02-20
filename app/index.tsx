
import { Stack, useRouter } from "expo-router"
import { Text, View, Image, ScrollView, TouchableOpacity, Animated } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useRef } from "react"
import React from "react"

type Category = {
  name: string
  icon: keyof typeof Ionicons.glyphMap
}

type Product = {
  name: string
  price: string
  image: string
  description: string
}

const categories: Category[] = [
  { name: "Nourriture", icon: "fast-food-sharp" },
  { name: "Jouets", icon: "balloon" },
  { name: "Accessoires", icon: "accessibility" },
  { name: "Soins", icon: "paw" },
  { name: "Vêtements", icon: "shirt" },
  { name: "Litière", icon: "home" },
]

const featuredProducts: Product[] = [
  {
    name: "Croquettes Premium Bio",
    price: "29,99 €",
    image: "/placeholder.svg?height=300&width=400",
    description: "Nourriture naturelle et équilibrée",
  },
  {
    name: "Jouet Interactif Smart",
    price: "14,99 €",
    image: "/placeholder.svg?height=300&width=400",
    description: "Stimulation mentale garantie",
  },
  {
    name: "Collier GPS Premium",
    price: "49,99 €",
    image: "/placeholder.svg?height=300&width=400",
    description: "Suivi en temps réel",
  },
]

export default function Home() {
  const router = useRouter()
  const scrollY = useRef(new Animated.Value(0)).current

  const registerRedirect = () => {
    router.push("/(auth)/register")
  }

  return (
    <ScrollView
      className="flex-1 bg-purple-50"
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
      scrollEventThrottle={16}
    >
      <Stack.Screen
        options={{
          title: "PetsWave Shop",
          headerStyle: { backgroundColor: "#491975" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="h-48 bg-purple-600 px-4 justify-center">
        <View className="bg-white/10 p-6 rounded-2xl">
          <Text className="text-white text-3xl font-bold mb-2">Bienvenue chez PetsWave</Text>
          <Text className="text-purple-100">Découvrez notre sélection premium pour vos compagnons</Text>
        </View>
      </View>

      <View className="px-4 -mt-6">
        <View className="bg-white rounded-xl p-4 shadow-lg mb-6">
          <View className="flex-row justify-around items-center">
            <TouchableOpacity className="items-center">
              <View className="bg-purple-600 p-3 rounded-full mb-1 shadow-sm">
                <Feather name="user" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="bg-purple-600 p-3 rounded-full mb-1 shadow-sm">
                <Feather name="shopping-cart" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Panier</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center" onPress={registerRedirect}>
              <View className="bg-purple-600 p-3 rounded-full mb-1 shadow-sm">
                <Feather name="log-out" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Déconnexion</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" onPress={registerRedirect}>
              <View className="bg-purple-600 p-3 rounded-full mb-1 shadow-sm">
                <Feather name="search" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-xl font-semibold text-gray-800 mb-4">Catégories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.name}
              className="items-center mr-6"
              style={{
                transform: [
                  {
                    scale: scrollY.interpolate({
                      inputRange: [0, 100],
                      outputRange: [1, 0.95],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            >
              <View className="bg-white rounded-2xl p-4 mb-2 shadow-lg border border-purple-100">
                <Ionicons name={category.icon} size={32} color="#7C3AED" />
              </View>
              <Text className="text-sm font-medium text-gray-700">{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Products */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-semibold text-gray-800">Produits en vedette</Text>
          <TouchableOpacity className="bg-purple-100 px-4 py-2 rounded-full">
            <Text className="text-purple-600 font-medium">Voir tout</Text>
          </TouchableOpacity>
        </View>

        {featuredProducts.map((product, index) => (
          <TouchableOpacity
            key={product.name}
            className="bg-white rounded-2xl mb-6 overflow-hidden border border-purple-100 shadow-lg"
          >
            <Image source={{ uri: product.image }} className="w-full h-48" resizeMode="cover" />
            <View className="p-4">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800 mb-1">{product.name}</Text>
                  <Text className="text-sm text-gray-500">{product.description}</Text>
                </View>
                <View className="bg-purple-100 px-3 py-1 rounded-full">
                  <Text className="text-purple-600 font-bold">{product.price}</Text>
                </View>
              </View>
              <TouchableOpacity className="bg-purple-600 py-3 rounded-xl flex-row justify-center items-center mt-2">
                <Feather name="shopping-cart" size={18} color="#fff" className="mr-2" />
                <Text className="text-white font-semibold ml-2">Ajouter au panier</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

