import { Stack } from "expo-router"
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native"
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons"

const categories = [
  { name: "Nourriture", icon: "fast-food-sharp" },
  { name: "Jouets", icon: "balloon" },
  { name: "Accessoires", icon: "accessibility" },
  { name: "Soins", icon: "paw" },
]

const featuredProducts = [
  { name: "Croquettes Premium", price: "29,99 €", image: "https://imgs.search.brave.com/XZsE_lhqVYy9v76xevVsKpJr6Bcg973RTSmZTEZ1Z-M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTgz/MzM0NTAwL3Bob3Rv/L3B1cHB5LWFuZC1r/aXR0ZW4uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXBCVnJR/S000bTJqZVdXRVIz/dXlJYjFNZ2dEbTNH/a21PMEZZc2g1a196/dm89" },
  { name: "Jouet Interactif", price: "14,99 €", image: "https://imgs.search.brave.com/XZsE_lhqVYy9v76xevVsKpJr6Bcg973RTSmZTEZ1Z-M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTgz/MzM0NTAwL3Bob3Rv/L3B1cHB5LWFuZC1r/aXR0ZW4uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXBCVnJR/S000bTJqZVdXRVIz/dXlJYjFNZ2dEbTNH/a21PMEZZc2g1a196/dm89" },
  { name: "Collier GPS", price: "49,99 €", image: "https://imgs.search.brave.com/XZsE_lhqVYy9v76xevVsKpJr6Bcg973RTSmZTEZ1Z-M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTgz/MzM0NTAwL3Bob3Rv/L3B1cHB5LWFuZC1r/aXR0ZW4uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXBCVnJR/S000bTJqZVdXRVIz/dXlJYjFNZ2dEbTNH/a21PMEZZc2g1a196/dm89" },
]

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: "PetsWave Shop",
          headerStyle: { backgroundColor: "#10B981" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => (
            <View className="flex-row">
              <TouchableOpacity className="mr-4">
                <Feather name="search" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity className="mr-4">
                <Feather name="shopping-cart" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity className="mr-4">
                <Feather name="log-out" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View className="py-6 px-4">
        <Text className="text-3xl font-bold text-emerald-600 mb-2">PetsWave Shop</Text>
        <Text className="text-base text-gray-600 mb-6">
          Tout ce dont votre animal a besoin
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          {categories.map((category) => (
            <TouchableOpacity key={category.name} className="items-center mr-6">
              <View className="bg-emerald-100 rounded-full p-4 mb-2">
                <Ionicons name={category.icon} size={24} color="#10B981" />
              </View>
              <Text className="text-sm text-gray-600">{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-semibold text-gray-800">Produits en vedette</Text>
          <TouchableOpacity>
            <Text className="text-emerald-600 font-medium">Voir tout</Text>
          </TouchableOpacity>
        </View>

        {featuredProducts.map((product) => (
          <TouchableOpacity key={product.name} className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
            <Image source={{ uri: product.image }} className="w-full h-48" />
            <View className="p-3">
              <Text className="text-lg font-semibold text-gray-800">{product.name}</Text>
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-emerald-600 font-bold text-lg">{product.price}</Text>
                <TouchableOpacity className="bg-emerald-500 p-2 rounded-full">
                  <Feather name="plus" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity className="bg-emerald-500 mt-4 py-3 rounded-full">
          <Text className="text-white text-center font-semibold">Voir tous les produits</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}