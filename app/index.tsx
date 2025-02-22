
import { Stack, useRouter } from "expo-router"
import { Text, View, Image, ScrollView, TouchableOpacity, Animated } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useEffect, useRef } from "react"
import React from "react"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { getCategory } from "./redux/Slice/categorySlice"
import { getPets } from "./redux/Slice/petSlice"
import { replaceIp } from "~/hooks/helpers"
import { logout } from "./redux/Slice/authSlice"


export default function Home() {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector((state) => state.category)
  const { pets = [], isLoading, error } = useAppSelector((state) => state.pets)
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const scrollY = useRef(new Animated.Value(0)).current


  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        router.push('/(auth)/login');
      }, 100); 
    }
  }, [isAuthenticated, router]);
  


  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCategory()).unwrap()
        await dispatch(getPets()).unwrap()
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err)
      }
    }

    fetchData()
  }, [dispatch])


  return (
    <ScrollView
      className="flex-1 bg-purple-50"
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

      <View className="h-48 bg-[#491975] px-4 justify-center">
        <View className="bg-white/10 p-6 rounded-2xl">
          <Text className="text-white text-3xl font-bold mb-2">Bienvenue chez PetsWave</Text>
          <Text className="text-purple-100">Découvrez notre sélection premium pour vos compagnons</Text>
        </View>
      </View>
      <View className="px-4 -mt-6">
        <View className="bg-white rounded-xl p-4 shadow-lg mb-6">
          <View className="flex-row justify-around items-center">
            <TouchableOpacity className="items-center" onPress={() => router.push('/(auth)/profile')}>
              <View className="bg-purple-600 p-3 rounded-full mb-1 shadow-sm">
                <Feather name="user" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center" onPress={() => router.push('/cart/cart')}>
              <View className="bg-purple-600 p-3 rounded-full mb-1 shadow-sm">
                <Feather name="shopping-cart" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Panier</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center" onPress={handleLogout}>
              <View className="bg-purple-600 p-3 rounded-full mb-1 shadow-sm">
                <Feather name="log-out" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Déconnexion</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" onPress={() => router.push('/(pets)/serarch')}>
              <View className="bg-purple-600 p-3 rounded-full mb-1 shadow-sm">
                <Feather name="search" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-xl font-semibold text-gray-800 mb-4">Catégories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          {categories?.length > 0 ? (
            categories.map((category, index) => (
              <TouchableOpacity
                key={Math.random()}
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
                  <Ionicons name="paw" size={32} color="#491975" />
                </View>
                <Text className="text-sm font-medium text-gray-700">{category.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-gray-500">Aucune catégorie disponible</Text>
          )}

        </ScrollView>

        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-semibold text-gray-800">Produits en vedette</Text>
          <TouchableOpacity className="bg-purple-100 px-4 py-2 rounded-full">
            <Text className="text-purple-600 font-medium">Voir tout</Text>
          </TouchableOpacity>
        </View>

        {pets.length > 0 ? (
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, padding: 16 }}
          >
            {pets.map((pet, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
                activeOpacity={0.8}
                onPress={() => router.push(`/petsDetails?petId=${pet._id}`)}
              >
                {pet.images && pet.images.length > 0 ? (
                  <Image
                    source={{ uri: replaceIp(pet.images[0], '192.168.1.11') }}
                    className="w-full h-56"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-56 bg-gray-200 flex justify-center items-center">
                    <Text className="text-gray-500">Image non disponible</Text>
                  </View>
                )}

                <View className="p-4 space-y-2">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-lg font-semibold text-gray-800">{pet.name}</Text>
                      <Text className="text-sm text-gray-500">
                        {pet.description.split(" ").slice(0, 4).join(" ")}...
                      </Text>

                    </View>
                    <View className="bg-purple-100 px-3 py-1 rounded-full">
                      <Text className="text-purple-600 font-bold">{pet.Prix} MAD</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    className="bg-gradient-to-r from-purple-600 to-purple-400 py-2 rounded-xl flex-row justify-center items-center"
                  >
                    <Feather name="shopping-cart" size={18} color="#fff" className="mr-2" />
                    <Text className="text-white font-semibold">Ajouter au panier</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-lg">Aucun animal disponible</Text>
          </View>
        )}

      </View>
    </ScrollView>
  )
}

