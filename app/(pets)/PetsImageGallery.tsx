import React from "react"
import { View, Image, ScrollView, TouchableOpacity, Text } from "react-native"
import { replaceIp } from "~/hooks/helpers"

interface ProductImagesProps {
  petSelected: any
  selectedImage: number
  setSelectedImage: (index: number) => void
}

const PetsImages: React.FC<ProductImagesProps> = ({ petSelected, selectedImage, setSelectedImage }) => {
  return (
    <>
      <View className="bg-purple-150 relative">
        {petSelected?.images?.length ? (
          <Image
            source={{ uri: replaceIp(petSelected.images[selectedImage], process.env.EXPO_PUBLIC_URL) }}
            className="h-96 w-screen"
            resizeMode="cover"
          />
        ) : (
          <Text className="mt-4 text-center text-gray-500">Aucune image disponible</Text>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white px-4 py-2">
        {petSelected?.images?.map((image: string, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedImage(index)}
            className={`mr-2 overflow-hidden rounded-lg border-2 ${
              selectedImage === index ? "border-purple-600" : "border-transparent"
            }`}
          >
            <Image source={{ uri: replaceIp(image, process.env.EXPO_PUBLIC_URL) }} className="h-16 w-16" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  )
}

export default PetsImages
