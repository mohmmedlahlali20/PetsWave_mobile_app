import React from "react"
import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"

interface ProductDetailsProps {
  petSelected: any
}

const renderStars = (rating: number) => {
  return [...Array(5)].map((_, index) => (
    <Feather key={index} name={index < rating ? "star" : "star-outline"} size={16} color="#F59E0B" />
  ))
}

const PetsDetails: React.FC<ProductDetailsProps> = ({ petSelected }) => {
  return (
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
  )
}

export default PetsDetails
