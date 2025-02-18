import { Stack, useRouter } from "expo-router"
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"

type Category = {
  name: string
  icon: keyof typeof Ionicons.glyphMap
}

type Product = {
  name: string
  price: string
  image: string
}

const categories: Category[] = [
  { name: "Nourriture", icon: "fast-food-sharp" },
  { name: "Jouets", icon: "balloon" },
  { name: "Accessoires", icon: "accessibility" },
  { name: "Soins", icon: "paw" },
]

const featuredProducts: Product[] = [
  {
    name: "Croquettes Premium",
    price: "29,99 €",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Jouet Interactif",
    price: "14,99 €",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Collier GPS",
    price: "49,99 €",
    image: "https://via.placeholder.com/150",
  },
]

export default function Home() {
  const router = useRouter()

  const registerRedirect = () => {
    router.push("/(auth)/register")
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: "PetsWave Shop",
          headerStyle: { backgroundColor: "#10B981" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <View className="py-6 px-4">
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-emerald-600 mb-1">PetsWave Shop</Text>
            <Text className="text-sm text-gray-600">Tout ce dont votre animal a besoin</Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity className="mx-2 bg-emerald-500 p-2 rounded-full">
              <Feather name="search" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="mx-2 bg-emerald-500 p-2 rounded-full">
              <Feather name="shopping-cart" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={registerRedirect} className="mx-2 bg-emerald-500 p-2 rounded-full">
              <Feather name="log-out" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          {categories.map((category) => (
            <TouchableOpacity key={category.name} className="items-center mr-6">
              <View className="bg-emerald-100 rounded-full p-3 mb-2">
                <Ionicons name={category.icon} size={28} color="#10B981" />
              </View>
              <Text className="text-xs text-gray-600">{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-semibold text-gray-800">Produits en vedette</Text>
          <TouchableOpacity>
            <Text className="text-emerald-600 font-medium text-sm">Voir tout</Text>
          </TouchableOpacity>
        </View>

        {featuredProducts.map((product) => (
          <TouchableOpacity key={product.name} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            <Image source={{ uri: product.image }} className="w-full h-40" resizeMode="cover" />
            <View className="p-4">
              <Text className="text-base font-semibold text-gray-800 mb-2">{product.name}</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-emerald-600 font-bold text-lg">{product.price}</Text>
                <TouchableOpacity className="bg-emerald-500 p-2 rounded-full">
                  <Feather name="plus" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

