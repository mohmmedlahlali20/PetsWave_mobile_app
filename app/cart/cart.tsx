import { FlatList, Text, View, ScrollView, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { replaceIp } from '~/hooks/helpers';
import { Pets } from '~/constant/type';
import { Stack } from 'expo-router';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';

export default function Cart() {
  const [cartItems, setCartItems] = useState<Pets[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading, error, commands } = useAppSelector((state) => state.command);

  const loadCart = async () => {
    try {
      const userData = await AsyncStorage.getItem('User');
      const userId = userData ? JSON.parse(userData)._id : null;

      if (!userId) {
        console.error('Utilisateur non trouvé.');
        return;
      }

      const cartKey = `cart_${userId}`;
      const storedCart = await AsyncStorage.getItem(cartKey);
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];

      if (!Array.isArray(parsedCart)) {
        console.error('Les données du panier sont corrompues :', parsedCart);
        return;
      }

      setCartItems(parsedCart);
    } catch (error) {
      console.error('Erreur lors du chargement du panier :', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    console.log('Articles du panier :', cartItems);
  }, [cartItems]);

  const removeItem = async (petId: string) => {
    try {
      const userData = await AsyncStorage.getItem('User');
      const userId = userData ? JSON.parse(userData)._id : null;

      if (!userId) {
        console.error('Utilisateur non trouvé.');
        return;
      }

      const cartKey = `cart_${userId}`;
      const updatedCart = cartItems.filter((item) => item._id !== petId);

      await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCart));
      setCartItems(updatedCart);

      // ✅ Affichage d'un Toast pour confirmer la suppression
      ToastAndroid.show('Animal supprimé du panier.', ToastAndroid.SHORT);
    } catch (error) {
      console.error(`Erreur lors de la suppression de ${petId} :`, error);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.Prix || 0), 0);

  return (
    <ScrollView className="flex-1 bg-purple-50">
      <Stack.Screen
        options={{
          title: 'Panier',
          headerStyle: { backgroundColor: '#491975' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <View className="p-4">
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="mb-4 text-xl font-semibold text-gray-800">Articles</Text>

          <FlatList
            data={cartItems}
            scrollEnabled={false}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              <Text className="text-center text-gray-500">Votre panier est vide</Text>
            }
            renderItem={({ item }) => (
              <View className="flex-row items-center border-b border-gray-100 py-4 last:border-0">
                <Image
                  source={{
                    uri: item.images?.[0] ? replaceIp(item.images[0], '192.168.8.134') : undefined,
                  }}
                  className="h-20 w-20 rounded-lg"
                  resizeMode="cover"
                />
                <View className="ml-4 flex-1">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <Text className="font-medium text-gray-800">{item.name}</Text>
                      <Text className="text-sm text-gray-500">{item.Prix} MAD</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeItem(item._id)} className="p-2">
                      <Feather name="trash-2" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="mb-4 text-xl font-semibold text-gray-800">Total du panier</Text>
          <View className="flex-row items-center justify-between rounded-xl border border-purple-600 bg-purple-50 p-4">
            <Text className="flex-row items-center font-medium text-gray-800">Total Pets</Text>
            <Ionicons name="paw" size={24} color="#9333EA" />
            <Text className="font-semibold text-gray-800">{totalPrice} MAD</Text>
          </View>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center rounded-xl bg-purple-600 px-6 py-4"
          onPress={() => console.log('Procéder au paiement')}>
          <Feather name="credit-card" size={20} color="#fff" />
          <Text className="ml-2 text-lg font-bold text-white">
            Procéder au paiement ({totalPrice} MAD)
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
