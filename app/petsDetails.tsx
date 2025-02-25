import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';
import { getOnePet } from './redux/Slice/petSlice';
import { replaceIp } from '~/hooks/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pets } from '~/constant/type';

type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
};

const reviews: Review[] = [
  {
    id: 1,
    user: 'Marie L.',
    rating: 5,
    comment: 'Mon chat adore ! La qualité est excellente.',
    date: '2024-02-15',
  },
  {
    id: 2,
    user: 'Pierre D.',
    rating: 4,
    comment: 'Très bon produit, livraison rapide.',
    date: '2024-02-10',
  },
];

export default function ProductDetail() {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useAppDispatch();
  const { petSelected, isLoading, error } = useAppSelector((state) => state.pets);
  
  useEffect(() => {
    if (petId) {
      dispatch(getOnePet(petId as string)).unwrap();
    }
  }, [dispatch, petId]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color="#F59E0B"
      />
    ));
  };

  const addToCart = async () => {
    try {
      if (!petSelected) {
        console.error('Aucun animal sélectionné.');
        return;
      }

      const userData = await AsyncStorage.getItem('User');
      const userId = userData ? JSON.parse(userData)._id : null;

      if (!userId) {
        console.error('Utilisateur non trouvé.');
        return;
      }

      const cartKey = `cart_${userId}`;
      const storedCart = await AsyncStorage.getItem(cartKey);
      const parsedCart: Pets[] = storedCart ? JSON.parse(storedCart) : [];

      if (parsedCart.some((item) => item._id === petSelected._id)) {
        ToastAndroid.show('Cet animal est déjà dans votre panier !', ToastAndroid.SHORT);
        return;
      }

      const updatedCart = [...parsedCart, petSelected];

      await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCart));

      ToastAndroid.show('Animal ajouté au panier !', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-purple-100">
      <Stack.Screen
        options={{
          title: 'Détails du produit',
          headerStyle: { backgroundColor: '#491975' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <View className="bg-purple-150 relative">
        {petSelected?.images && petSelected.images.length > 0 ? (
          <View className="h-96 w-screen">
            {petSelected?.images?.length > 0 && (
              <Image
                source={{ uri: replaceIp(petSelected.images[selectedImage], process.env.EXPO_PUBLIC_URL) }}
                className="h-96 w-screen"
                resizeMode="cover"
              />
            )}
          </View>
        ) : (
          <Text className="mt-4 text-center text-gray-500">Aucune image disponible</Text>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white px-4 py-2">
        {petSelected?.images &&
          petSelected.images.length > 0 &&
          petSelected.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(index)}
              className={`mr-2 overflow-hidden rounded-lg border-2 ${
                selectedImage === index ? 'border-purple-600' : 'border-transparent'
              }`}>
              <Image
                source={{ uri: replaceIp(image, process.env.EXPO_PUBLIC_URL) }}
                className="h-16 w-16"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
      </ScrollView>

      <View className="mt-2 rounded-t-3xl bg-white p-4">
        <View className="border-b border-gray-200 pb-4">
          <View className="mb-2 flex-row items-start justify-between">
            <Text className="text-2xl font-bold text-gray-800">{petSelected?.name}</Text>
            <View className="rounded-full bg-purple-100 px-3 py-1">
              <Text className="text-lg font-bold text-purple-600">{petSelected?.Prix} MAD</Text>
            </View>
          </View>
          <Text className="mb-4 text-gray-500">{petSelected?.description}</Text>
          <View className="flex-row items-center">
            <View className="mr-2 flex-row">{renderStars(4.5)}</View>
            <Text className="text-gray-600">(128 avis)</Text>
          </View>
        </View>

        <View className="border-b border-gray-200 py-4">
          <Text className="mb-3 text-lg font-semibold text-gray-800">Category</Text>
          <View className="space-y-2">
            <View className="flex-row items-center">
              <Feather name="check" size={18} color="#491975" />
              <Text className="ml-2 text-gray-600">{petSelected?.category.name}</Text>
            </View>
          </View>
        </View>

        <View className="py-4">
          <Text className="mb-3 text-lg font-semibold text-gray-800">Avis clients</Text>
          {reviews.map((review) => (
            <View key={review.id} className="mb-4 rounded-xl bg-purple-50 p-4">
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="font-medium text-gray-800">{review.user}</Text>
                <Text className="text-sm text-gray-500">{review.date}</Text>
              </View>
              <View className="mb-2 flex-row">{renderStars(review.rating)}</View>
              <Text className="text-gray-600">{review.comment}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          className="mt-4 flex-row items-center justify-center rounded-xl bg-purple-600 px-6 py-4"
          onPress={addToCart}>
          <Feather name="shopping-cart" size={20} color="#fff" />
          <Text className="ml-2 text-lg font-bold text-white">
            Ajouter au panier • {petSelected?.Prix} MAD
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
