

import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import React from "react"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { getOnePet } from "./redux/Slice/petSlice"
import { replaceIp } from "~/hooks/helpers"


type Review = {
    id: number
    user: string
    rating: number
    comment: string
    date: string
}


const reviews: Review[] = [
    {
        id: 1,
        user: "Marie L.",
        rating: 5,
        comment: "Mon chat adore ! La qualité est excellente.",
        date: "2024-02-15",
    },
    {
        id: 2,
        user: "Pierre D.",
        rating: 4,
        comment: "Très bon produit, livraison rapide.",
        date: "2024-02-10",
    },
]

const sizes = ["XS", "S", "M", "L", "XL"]

export default function ProductDetail() {
    const router = useRouter()
    const { petId } = useLocalSearchParams();
    const [selectedImage, setSelectedImage] = useState(0)
    const dispatch = useAppDispatch()
    const { petSelected, isLoading, error } = useAppSelector((state) => state.pets)

    console.log(petSelected);

    useEffect(() => {
        console.log(petId);

        const fetchPet = async () => {
            await dispatch(getOnePet(petId as string)).unwrap()
        }
        fetchPet()
    }, [dispatch])

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Ionicons key={index} name={index < rating ? "star" : "star-outline"} size={16} color="#F59E0B" />
        ))
    }

    return (
        <ScrollView className="flex-1 bg-purple-100">
            <Stack.Screen
                options={{
                    title: "Détails du produit",
                    headerStyle: { backgroundColor: "#7C3AED" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />

            <View className="relative bg-purple-150">
                {petSelected?.images && petSelected.images.length > 0 ? (
                    <View className="w-screen h-96">
                        {petSelected?.images?.length > 0 && (
                            <Image

                                source={{ uri: replaceIp(petSelected.images[selectedImage], "192.168.8.134") }}
                                className="w-screen h-96"
                                resizeMode="cover"
                            />
                        )}
                    </View>
                ) : (
                    <Text className="text-center text-gray-500 mt-4">Aucune image disponible</Text>
                )}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-2 bg-white">
                {petSelected?.images && petSelected.images.length > 0 && petSelected.images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedImage(index)}
                        className={`mr-2 border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-purple-600" : "border-transparent"
                            }`}
                    >
                        <Image source={{ uri: replaceIp(image, '192.168.8.134') }} className="w-16 h-16" resizeMode="cover" />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View className="p-4 bg-white mt-2 rounded-t-3xl">
                <View className="border-b border-gray-200 pb-4">
                    <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-2xl font-bold text-gray-800">{petSelected?.name}</Text>
                        <View className="bg-purple-100 px-3 py-1 rounded-full">
                            <Text className="text-purple-600 font-bold text-lg">{petSelected?.Prix} MAD</Text>
                        </View>
                    </View>
                    <Text className="text-gray-500 mb-4">
                        {petSelected?.description}
                    </Text>
                    <View className="flex-row items-center">
                        <View className="flex-row mr-2">{renderStars(4.5)}</View>
                        <Text className="text-gray-600">(128 avis)</Text>
                    </View>
                </View>





                <View className="py-4 border-b border-gray-200">
                    <Text className="text-lg font-semibold text-gray-800 mb-3">Category</Text>
                    <View className="space-y-2">

                        <View className="flex-row items-center">
                            <Feather name="check" size={18} color="#7C3AED" />
                            <Text className="ml-2 text-gray-600">{petSelected?.category.name}</Text>
                        </View>

                    </View>
                </View>

                <View className="py-4">
                    <Text className="text-lg font-semibold text-gray-800 mb-3">Avis clients</Text>
                    {reviews.map((review) => (
                        <View key={review.id} className="mb-4 bg-purple-50 p-4 rounded-xl">
                            <View className="flex-row justify-between items-center mb-2">
                                <Text className="font-medium text-gray-800">{review.user}</Text>
                                <Text className="text-gray-500 text-sm">{review.date}</Text>
                            </View>
                            <View className="flex-row mb-2">{renderStars(review.rating)}</View>
                            <Text className="text-gray-600">{review.comment}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity className="bg-purple-600 py-4 px-6 rounded-xl flex-row justify-center items-center mt-4">
                    <Feather name="shopping-cart" size={20} color="#fff" />
                    <Text className="ml-2 text-white font-bold text-lg">
                        Ajouter au panier • {petSelected?.Prix} €
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

