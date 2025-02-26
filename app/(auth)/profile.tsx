import { Stack, useRouter } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Commands, Status, User } from '~/constant/type';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileSlice, updateAvatar } from '../redux/Slice/authSlice';
import { GetCommandeByUserId } from '../redux/Slice/commandSlice';
import useImagePicker from '~/hooks/useImagePicker';
import { uploadImageToBackend } from '~/hooks/uploadImage';
import { replaceIp } from '~/hooks/helpers';




export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { userProfile } = useAppSelector((state) => state.auth)
  const { command = [], isLoading, error } = useAppSelector((state) => state.command)


  const { avatar, pickImage } = useImagePicker();

  
  const updateUserAvatar = async () => {
    try {
      const userData = await AsyncStorage.getItem('User');
      const userId = userData ? JSON.parse(userData)._id : null;
  
      if (!userId) {
        console.warn("Utilisateur non trouvé.");
        return;
      }
  
      await pickImage();
  console.log('profile',avatar)
      if (!avatar) {
        console.warn("Aucune image sélectionnée.");
        return;
      }
  
      
      await dispatch(updateAvatar({ userId, avatar }));
  
      console.log("Avatar mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar :", error);
    }
  };
  


  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('User');
      const userId = userData ? JSON.parse(userData)._id : null;

      if (userId) {
        await Promise.all([
          dispatch(ProfileSlice(userId)),
          dispatch(GetCommandeByUserId(userId))
        ]);
      }
    };



    fetchUserData();
  }, []);




  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.Pending:
        return 'bg-yellow-100 text-yellow-800';
      case Status.InProgress:
        return 'bg-green-100 text-green-800';
      case Status.Completed:
        return 'bg-red-100 text-red-800';
      case Status.Cancelled:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Status) => {
    switch (status) {
      case Status.Pending:
        return 'Pending';
      case Status.InProgress:
        return 'Livré';
      case Status.Completed:
        return 'Annulé';
      case Status.Cancelled:
        return 'Annulé';
      default:
        return status;
    }
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    action?: () => void
  ) => (
    <TouchableOpacity
      onPress={action}
      className="mb-2 flex-row items-center rounded-xl bg-white p-4 shadow-sm">
      <View className="rounded-full bg-[#491975]/10 p-2">
        <Feather name={icon as any} size={20} color="#491975" />
      </View>
      <View className="ml-3 flex-1">
        <Text className="font-medium text-gray-800">{title}</Text>
        {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
      </View>
      <Feather name="chevron-right" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-[#F5F3FF]">
      <Stack.Screen
        options={{
          title: 'Mon Profil',
          headerStyle: { backgroundColor: '#491975' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <View className="bg-[#491975] px-4 pb-20 pt-4">
        <View className="flex-row items-center">
          <View className="relative">
            <Image
            
              source={{ uri: replaceIp(userProfile?.avatar ?? '', process.env.EXPO_PUBLIC_URL)  }}
              className="h-20 w-20 rounded-full border-2 border-white"
            />
            <TouchableOpacity onPress={updateUserAvatar} className="absolute bottom-0 right-0 rounded-full bg-white p-1">
              <Feather name="edit-2" size={12} color="#491975" />
            </TouchableOpacity>
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-white">{userProfile?.firstName}</Text>
            <Text className="text-purple-200">{userProfile?.email}</Text>
          </View>
        </View>
      </View>

      <View className="-mt-16 mb-6 flex-row justify-between px-4">
        <View className="mr-2 flex-1 rounded-xl bg-white p-4 shadow-lg">
          <Text className="text-sm text-gray-500">Commandes</Text>
          <Text className="text-2xl font-bold text-[#491975]">12</Text>
        </View>
        <View className="mx-2 flex-1 rounded-xl bg-white p-4 shadow-lg">
          <Text className="text-sm text-gray-500">En cours</Text>
          <Text className="text-2xl font-bold text-[#491975]">2</Text>
        </View>
        <View className="ml-2 flex-1 rounded-xl bg-white p-4 shadow-lg">
          <Text className="text-sm text-gray-500">Points</Text>
          <Text className="text-2xl font-bold text-[#491975]">350</Text>
        </View>
      </View>

      <View className="space-y-6 px-4">
        <View>
          <Text className="mb-4 text-xl font-semibold text-gray-800">Commandes récentes</Text>
          <View className="space-y-3">
            {command.map((order) => (
              <View key={order._id}>
                <View className="mb-2 flex-row items-start justify-between">
                  <View>
                    <Text className="font-medium text-gray-800">Commande #{order._id}</Text>
                    <Text className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View className={`rounded-full px-3 py-1 ${getStatusColor(order.status)}`}>
                    <Text className="text-sm font-medium">{getStatusText(order.status)}</Text>
                  </View>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-500">
                    {order.userId?.firstName}
                  </Text>
                  <Text className="font-bold text-[#491975]">{order.totalAmount.toFixed(2)} MAD</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text className="mb-4 text-xl font-semibold text-gray-800">Paramètres</Text>
          <View>
            {renderSettingItem('map-pin', 'Adresses de livraison', 'Gérer vos adresses', () =>
              router.push('/')
            )}
            {renderSettingItem('credit-card', 'Méthodes de paiement', 'Gérer vos cartes', () =>
              router.push('/')
            )}
            {renderSettingItem('bell', 'Notifications', 'Gérer vos préférences', () =>
              router.push('/')
            )}
            {renderSettingItem('lock', 'Sécurité', 'Mot de passe et authentification', () =>
              router.push('/')
            )}
            {renderSettingItem('help-circle', 'Aide & Support', 'FAQ et contact', () =>
              router.push('/')
            )}
          </View>
        </View>

        <TouchableOpacity
          className="mb-8 flex-row items-center justify-center rounded-xl bg-red-500 px-6 py-4"
          onPress={() => { }}>
          <Feather name="log-out" size={20} color="#fff" />
          <Text className="ml-2 font-semibold text-white">Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
