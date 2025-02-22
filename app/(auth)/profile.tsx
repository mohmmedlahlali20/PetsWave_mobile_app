

import { Stack, useRouter } from "expo-router"
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native"
import { Feather } from "@expo/vector-icons"
import React, { useState } from "react"

type OrderStatus = "en_cours" | "livré" | "annulé"

interface Order {
  id: string
  date: string
  total: number
  status: OrderStatus
  items: number
}

interface UserInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  avatar?: string
}

const mockOrders: Order[] = [
  {
    id: "CMD-001",
    date: "2024-02-20",
    total: 149.99,
    status: "livré",
    items: 2,
  },
  {
    id: "CMD-002",
    date: "2024-02-18",
    total: 89.99,
    status: "en_cours",
    items: 1,
  },
  {
    id: "CMD-003",
    date: "2024-02-15",
    total: 199.99,
    status: "annulé",
    items: 3,
  },
]

const userInfo: UserInfo = {
  name: "Jean Dupont",
  email: "jean.dupont@example.com",
  phone: "+212 6XX-XXXXXX",
  address: "123 Rue de la Paix",
  city: "Casablanca",
  avatar: "/placeholder.svg?height=200&width=200",
}

export default function Profile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [userDetails, setUserDetails] = useState<UserInfo>(userInfo)

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "en_cours":
        return "bg-yellow-100 text-yellow-800"
      case "livré":
        return "bg-green-100 text-green-800"
      case "annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "en_cours":
        return "En cours"
      case "livré":
        return "Livré"
      case "annulé":
        return "Annulé"
      default:
        return status
    }
  }

  const renderSettingItem = (icon: string, title: string, subtitle?: string, action?: () => void) => (
    <TouchableOpacity
      onPress={action}
      className="flex-row items-center p-4 bg-white rounded-xl mb-2 shadow-sm"
    >
      <View className="bg-[#491975]/10 p-2 rounded-full">
        <Feather name={icon as any} size={20} color="#491975" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-gray-800 font-medium">{title}</Text>
        {subtitle && <Text className="text-gray-500 text-sm">{subtitle}</Text>}
      </View>
      <Feather name="chevron-right" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  )

  return (
    <ScrollView className="flex-1 bg-[#F5F3FF]">
      <Stack.Screen
        options={{
          title: "Mon Profil",
          headerStyle: { backgroundColor: "#491975" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="bg-[#491975] pt-4 pb-20 px-4">
        <View className="flex-row items-center">
          <View className="relative">
            <Image
              source={{ uri: userDetails.avatar }}
              className="w-20 h-20 rounded-full border-2 border-white"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-white p-1 rounded-full">
              <Feather name="edit-2" size={12} color="#491975" />
            </TouchableOpacity>
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-white text-xl font-bold">{userDetails.name}</Text>
            <Text className="text-purple-200">{userDetails.email}</Text>
          </View>
        </View>
      </View>


      <View className="flex-row justify-between px-4 -mt-16 mb-6">
        <View className="bg-white rounded-xl p-4 flex-1 mr-2 shadow-lg">
          <Text className="text-gray-500 text-sm">Commandes</Text>
          <Text className="text-2xl font-bold text-[#491975]">12</Text>
        </View>
        <View className="bg-white rounded-xl p-4 flex-1 mx-2 shadow-lg">
          <Text className="text-gray-500 text-sm">En cours</Text>
          <Text className="text-2xl font-bold text-[#491975]">2</Text>
        </View>
        <View className="bg-white rounded-xl p-4 flex-1 ml-2 shadow-lg">
          <Text className="text-gray-500 text-sm">Points</Text>
          <Text className="text-2xl font-bold text-[#491975]">350</Text>
        </View>
      </View>

      <View className="px-4 space-y-6">

        <View>
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Commandes récentes
          </Text>
          <View className="space-y-3">
            {mockOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                className="bg-white p-4 rounded-xl shadow-sm"
                
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="font-medium text-gray-800">
                      Commande #{order.id}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {new Date(order.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    <Text className="text-sm font-medium">
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-500">
                    {order.items} article{order.items > 1 ? "s" : ""}
                  </Text>
                  <Text className="font-bold text-[#491975]">
                    {order.total.toFixed(2)} MAD
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Paramètres
          </Text>
          <View>
            {renderSettingItem(
              "map-pin",
              "Adresses de livraison",
              "Gérer vos adresses",
              () => router.push("/")
            )}
            {renderSettingItem(
              "credit-card",
              "Méthodes de paiement",
              "Gérer vos cartes",
              () => router.push("/")
            )}
            {renderSettingItem(
              "bell",
              "Notifications",
              "Gérer vos préférences",
              () => router.push("/")
            )}
            {renderSettingItem(
              "lock",
              "Sécurité",
              "Mot de passe et authentification",
              () => router.push("/")
            )}
            {renderSettingItem(
              "help-circle",
              "Aide & Support",
              "FAQ et contact",
              () => router.push("/")
            )}
          </View>
        </View>

        <TouchableOpacity
          className="bg-red-500 py-4 px-6 rounded-xl flex-row justify-center items-center mb-8"
          onPress={() => {}}
        >
          <Feather name="log-out" size={20} color="#fff" />
          <Text className="ml-2 text-white font-semibold">
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
