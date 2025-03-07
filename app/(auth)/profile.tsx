import { Stack, useRouter } from "expo-router"
import { Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { Feather } from "@expo/vector-icons"
import React,{ useEffect } from "react"
import { Status } from "~/constant/type"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ProfileSlice, updateAvatar } from "../redux/Slice/authSlice"
import { GetCommandeByUserId } from "../redux/Slice/commandSlice"
import useImagePicker from "~/hooks/useImagePicker"
import { replaceIp } from "~/hooks/helpers"
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated"

export default function Profile() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { userProfile } = useAppSelector((state) => state.auth)
  const { command = [], isLoading, error } = useAppSelector((state) => state.command)
  const { avatar, pickImage } = useImagePicker()

  const updateUserAvatar = async () => {
    try {
      const userData = await AsyncStorage.getItem("User")
      const userId = userData ? JSON.parse(userData)._id : null
      if (!userId) {
        console.warn("Utilisateur non trouvé.")
        return
      }
      await pickImage()
      if (!avatar) {
        console.warn("Aucune image sélectionnée.")
        return
      }
      await dispatch(updateAvatar({ userId, avatar }))
      console.log("Avatar mis à jour avec succès !")
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar :", error)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem("User")
      const userId = userData ? JSON.parse(userData)._id : null
      if (userId) {
        await Promise.all([dispatch(ProfileSlice(userId)), dispatch(GetCommandeByUserId(userId))])
      }
    }
    fetchUserData()
  }, [])

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.Pending:
        return "bg-yellow-100 text-yellow-800"
      case Status.InProgress:
        return "bg-green-100 text-green-800"
      case Status.Completed:
        return "bg-blue-100 text-blue-800"
      case Status.Cancelled:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Status) => {
    switch (status) {
      case Status.Pending:
        return "En attente"
      case Status.InProgress:
        return "En cours"
      case Status.Completed:
        return "Livré"
      case Status.Cancelled:
        return "Annulé"
      default:
        return status
    }
  }

  const renderSettingItem = (icon: string, title: string, subtitle?: string, action?: () => void) => (
    <TouchableOpacity onPress={action} className="mb-3 flex-row items-center rounded-2xl bg-white p-4 shadow-sm">
      <View className="rounded-full bg-purple-100 p-3">
        <Feather name={icon as any} size={20} color="#491975" />
      </View>
      <View className="ml-4 flex-1">
        <Text className="font-semibold text-gray-800">{title}</Text>
        {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
      </View>
      <Feather name="chevron-right" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  )

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: "Mon Profil",
          headerStyle: { backgroundColor: "#491975" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="bg-[#491975] px-4 pb-24 pt-6">
        <Animated.View entering={FadeInDown.delay(300).duration(1000)} className="flex-row items-center">
          <View className="relative">
            <Image
              source={{ uri: replaceIp(userProfile?.avatar ?? "", process.env.EXPO_PUBLIC_URL) }}
              className="h-24 w-24 rounded-full border-4 border-white"
            />
            <TouchableOpacity
              onPress={updateUserAvatar}
              className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-md"
            >
              <Feather name="camera" size={16} color="#491975" />
            </TouchableOpacity>
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-2xl font-bold text-white">{userProfile?.firstName}</Text>
            <Text className="text-lg text-purple-200">{userProfile?.email}</Text>
          </View>
        </Animated.View>
      </View>

      <View className="-mt-16 mb-8 flex-row justify-between px-4">
        {["Commandes", "En cours", "Points"].map((item, index) => (
          <Animated.View
            key={item}
            entering={FadeInRight.delay(300 * index).duration(1000)}
            className="flex-1 mx-1 rounded-2xl bg-white p-4 shadow-lg"
          >
            <Text className="text-sm font-medium text-gray-500">{item}</Text>
            <Text className="text-2xl font-bold text-[#491975]">
              {index === 0
                ? command.length
                : index === 1
                  ? command.filter((c) => c.status === Status.InProgress).length
                  : "350"}
            </Text>
          </Animated.View>
        ))}
      </View>

      <View className="px-4 space-y-6">
        <Animated.View entering={FadeInDown.delay(600).duration(1000)}>
          <Text className="mb-4 text-xl font-bold text-gray-800">Commandes récentes</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#491975" />
          ) : error ? (
            <Text className="text-red-500">{error}</Text>
          ) : (
            <View className="space-y-4">
              {command.slice(0, 3).map((order) => (
                <View key={order._id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="font-semibold text-gray-800">Commande #{order._id.slice(-4)}</Text>
                    <View className={`rounded-full px-3 py-1 ${getStatusColor(order.status)}`}>
                      <Text className="text-xs font-medium">{getStatusText(order.status)}</Text>
                    </View>
                  </View>
                  <Text className="text-sm text-gray-500 mb-2">
                    {new Date(order.orderDate).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-600">{order.userId?.firstName}</Text>
                    <Text className="font-bold text-[#491975]">{order.totalAmount.toFixed(2)} MAD</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(900).duration(1000)} className="mt-6">
          <Text className="mb-4 text-xl font-bold text-gray-800">Paramètres</Text>
          {renderSettingItem("user", "Informations personnelles")}
          {renderSettingItem("bell", "Notifications")}
          {renderSettingItem("lock", "Sécurité")}
          {renderSettingItem("help-circle", "Aide et support")}
        </Animated.View>

        <TouchableOpacity
          className="mt-8 mb-12 flex-row items-center justify-center rounded-full bg-red-500 px-6 py-4 shadow-lg"
          onPress={() => {}}
        >
          <Feather name="log-out" size={20} color="#fff" />
          <Text className="ml-2 text-lg font-semibold text-white">Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

