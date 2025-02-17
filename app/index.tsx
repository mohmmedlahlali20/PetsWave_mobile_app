import { Stack } from "expo-router"
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native"
import { AntDesign, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"


const categories = [
  { name: "Chiens", icon: "dog" },
  { name: "Chats", icon: "cat" },
  { name: "Oiseaux", icon: "bird" },
  { name: "Poissons", icon: "fish" },
]

const featuredPets = [
  { name: "Luna", type: "Chien", image: "https://imgs.search.brave.com/eQGujdyMHjURYw9RqnuGEol2cpa3JWGpNjytG_oO3wg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzM3Lzk1LzQz/LzM2MF9GXzUzNzk1/NDMyNV9uT2wxdllO/WWxPVWI4VnhDMDdY/ODRSYnFBWUxTdGJi/Ny5qcGc" },
  { name: "Milo", type: "Chat", image: "/placeholder.svg?height=200&width=200" },
  { name: "Coco", type: "Oiseau", image: "/placeholder.svg?height=200&width=200" },
]

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
       <Stack.Screen
        options={{
          title: "PetsWave",
          headerStyle: { backgroundColor: "#4F46E5" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => (
            <View className="flex-row">
              <TouchableOpacity className="mr-4">
                <Ionicons name="notifications-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity className="mr-4">
                <Ionicons name="log-out-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View className="py-8">
        <Text className="text-4xl font-extrabold text-center text-indigo-600 mb-2">PetsWave</Text>
        <Text className="text-lg text-center text-gray-600 mb-8 px-4">
          Découvrez la beauté et la diversité de la vie animale
        </Text>

        <View className="flex-row justify-around mb-8">
          {categories.map((category) => (
            <TouchableOpacity key={category.name} className="items-center">
              <View className="bg-indigo-100 rounded-full p-3 mb-2">
                <MaterialCommunityIcons name={category.icon} size={24} color="#4F46E5" />
              </View>
              <Text className="text-sm text-gray-600">{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="px-4">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Animaux en vedette</Text>
          {featuredPets.map((pet) => (
            <TouchableOpacity key={pet.name} className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
              <Image source={{ uri: pet.image }} className="w-full h-48" />
              <View className="p-4">
                <Text className="text-xl font-semibold text-gray-800">{pet.name}</Text>
                <Text className="text-gray-600">{pet.type}</Text>
                <View className="flex-row justify-between items-center mt-2">
                  <TouchableOpacity className="bg-indigo-600 py-2 px-4 rounded-full">
                    <Text className="text-white font-semibold">En savoir plus</Text>
                  </TouchableOpacity>
                  <AntDesign name="heart" size={24} color="#EF4444" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity className="bg-indigo-600 mx-4 mt-4 py-3 rounded-full">
          <Text className="text-white text-center font-semibold text-lg">Voir tous les animaux</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

