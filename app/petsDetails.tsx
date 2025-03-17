import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';

import AddToCartButton from './(pets)/AddToCartButton';
import CommentInput from './(pets)/CommentInput';
import Reviews from './(pets)/CommentsSection';
import PetsImages from './(pets)/PetsImageGallery';
import PetsDetails from './(pets)/PetsInfo';
import { getOnePet } from './redux/Slice/petSlice';

import { addComments } from '~/app/redux/service/api/comment';
import { Pets } from '~/constant/type';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';

export default function ProductDetail() {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { petSelected, isLoading, error } = useAppSelector((state) => state.pets);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    if (petId) {
      dispatch(getOnePet(petId as string)).unwrap();
    }
  }, [petId, dispatch]);

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
      <PetsImages
        petSelected={petSelected}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <View className="mt-2 rounded-t-3xl bg-white p-4">
        <PetsDetails petSelected={petSelected} />
        <CommentInput />
        <Reviews showAllReviews={showAllReviews} setShowAllReviews={setShowAllReviews} />
        <AddToCartButton petSelected={petSelected} />
      </View>
    </ScrollView>
  );
}
