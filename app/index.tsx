import { Stack, useRouter } from 'expo-router';
import { Text, View, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';
import { getCategory } from './redux/Slice/categorySlice';
import { getPets } from './redux/Slice/petSlice';
import { replaceIp } from '~/hooks/helpers';
import { logout } from './redux/Slice/authSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  
  const { pets = [], isLoading, error } = useAppSelector((state) => state.pets);
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [selectedCategory, setSelectedCategory] = useState(null);


  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCategory()).unwrap();
        await dispatch(getPets()).unwrap();
      } catch (err) {
        console.error('Erreur lors du chargement des données :', err);
      }
    };

    fetchData();
  }, []);

  const filteredPets = selectedCategory
    ? pets.filter((pet) => pet.category._id === selectedCategory)
    : pets;

  return (
    <ScrollView className="flex-1 bg-purple-50" scrollEventThrottle={16}>
      <Stack.Screen
        options={{
          title: 'PetsWave Shop',
          headerStyle: { backgroundColor: '#491975' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />

      <View className="h-48 justify-center bg-[#491975] px-4">
        <View className="rounded-2xl bg-white/10 p-6">
          <Text className="mb-2 text-3xl font-bold text-white">Bienvenue chez PetsWave</Text>
          <Text className="text-purple-100">
            Découvrez notre sélection premium pour vos compagnons
          </Text>
        </View>
      </View>
      <View className="-mt-6 px-4">
        <View className="mb-6 rounded-xl bg-white p-4 shadow-lg">
          <View className="flex-row items-center justify-around">
            <TouchableOpacity
              className="items-center"
              onPress={() => router.push('/(auth)/profile')}>
              <View className="mb-1 rounded-full bg-purple-600 p-3 shadow-sm">
                <Feather name="user" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center" onPress={() => router.push('/cart/cart')}>
              <View className="mb-1 rounded-full bg-purple-600 p-3 shadow-sm">
                <Feather name="shopping-cart" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Panier</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center" onPress={handleLogout}>
              <View className="mb-1 rounded-full bg-purple-600 p-3 shadow-sm">
                <Feather name="log-out" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Déconnexion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center"
              onPress={() => router.push('/(pets)/search')}>
              <View className="mb-1 rounded-full bg-purple-600 p-3 shadow-sm">
                <Feather name="search" size={20} color="#fff" />
              </View>
              <Text className="text-sm font-medium text-gray-700">Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="mb-4 text-xl font-semibold text-gray-800">Catégories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          {categories?.length > 0 ? (
            categories.map((category) => (
              <TouchableOpacity
                key={category._id}
                className="mr-6 items-center"
                onPress={() => setSelectedCategory(category._id)}
                style={{
                  transform: [
                    {
                      scale: scrollY.interpolate({
                        inputRange: [0, 100],
                        outputRange: [1, 0.95],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}>
                <View className="mb-2 rounded-2xl border border-purple-100 bg-white p-4 shadow-lg">
                  <Ionicons name="paw" size={32} color="#491975" />
                </View>
                <Text className="text-sm font-medium text-gray-700">{category.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-gray-500">Aucune catégorie disponible</Text>
          )}
        </ScrollView>

        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-gray-800">Produits en vedette</Text>
          <TouchableOpacity className="rounded-full bg-purple-100 px-4 py-2" onPress={() => setSelectedCategory(null)}>
            <Text className="font-medium text-purple-600">Voir tous les animaux</Text>
          </TouchableOpacity>
        </View>

        {filteredPets.length > 0 ? (
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, padding: 16 }}>
            {filteredPets.map((pet) => (
              <TouchableOpacity
                key={pet._id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg"
                activeOpacity={0.8}
                onPress={() => router.push(`/petsDetails?petId=${pet._id}`)}>
                {pet.images && pet.images.length > 0 ? (
                  <Image
                    source={{ uri: replaceIp(pet.images[0], process.env.EXPO_PUBLIC_URL) }}
                    className="h-56 w-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="flex h-56 w-full items-center justify-center bg-gray-200">
                    <Text className="text-gray-500">Image non disponible</Text>
                  </View>
                )}

                <View className="space-y-2 p-4">
                  <View className="flex-row items-start justify-between">
                    <View>
                      <Text className="text-lg font-semibold text-gray-800">{pet.name}</Text>
                      <Text className="text-sm text-gray-500">
                        {pet.description.split(' ').slice(0, 4).join(' ')}...
                      </Text>
                    </View>
                    <View className="rounded-full bg-purple-100 px-3 py-1">
                      <Text className="font-bold text-purple-600">{pet.Prix} MAD</Text>
                    </View>
                  </View>

                  <TouchableOpacity className="flex-row items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 py-2">
                    <Feather name="shopping-cart" size={18} color="#fff" className="mr-2" />
                    <Text className="font-semibold text-white">Ajouter au panier</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-gray-500">Aucun animal disponible</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
