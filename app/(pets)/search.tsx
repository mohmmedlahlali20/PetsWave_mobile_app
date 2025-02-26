import { Stack, useRouter } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "~/hooks/useAppDispatch";
import { Pets } from "~/constant/type";
import { replaceIp } from "~/hooks/helpers";

export default function Search() {
  const router = useRouter();
  const { pets, isLoading } = useAppSelector((state) => state.pets);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPets, setFilteredPets] = useState<Pets[]>([]);
  const [sortingByPrice, setSortingByPrice] = useState<"asc" | "desc">("asc");
  const [filterBySex, setFilterBySex] = useState<"All" | "Male" | "Female">("All");

  const toggleSortOrder = () => {
    setSortingByPrice((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    let filtered = pets.filter((pet) =>
      pet.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterBySex !== "All") {
      filtered = filtered.filter((pet) => pet.gender === filterBySex);
    }

    filtered.sort((a, b) =>
      sortingByPrice === "asc" ? a.Prix - b.Prix : b.Prix - a.Prix
    );

    setFilteredPets(filtered);
  }, [searchQuery, sortingByPrice, filterBySex]);

  return (
    <View className="flex-1 bg-[#F5F3FF]">
      <Stack.Screen
        options={{
          title: "Recherche",
          headerStyle: { backgroundColor: "#491975" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="bg-[#491975] px-4 pb-6 pt-2">
        <View className="flex-row items-center bg-white rounded-xl px-4 py-2">
          <Feather name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Rechercher un animal..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View className="flex-row items-center bg-white rounded-xl px-4 py-2 mt-3 space-x-4">
          <Text className="text-black font-semibold">Filter by price:</Text>

          <TouchableOpacity
            className="flex-row items-center space-x-2"
            onPress={toggleSortOrder}
          >
            <Feather
              name={sortingByPrice === "asc" ? "arrow-up" : "arrow-down"}
              size={20}
              color="#000"
            />
            <Text className="text-lg font-bold text-black">
              {sortingByPrice === "asc" ? "ASC" : "DESC"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row space-x-4 mt-3 gap-2">
          <TouchableOpacity
            onPress={() => setFilterBySex("All")}
            className={`px-4 py-2 rounded-lg ${filterBySex === "All" ? "bg-gray-200" : "bg-white"}`}
          >
            <Text className="text-black">All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterBySex("Male")}
            className={`px-4 py-2 rounded-lg ${filterBySex === "Male" ? "bg-gray-200" : "bg-white"}`}
          >
            <Text className="text-black">Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterBySex("Female")}
            className={`px-4 py-2 rounded-lg ${filterBySex === "Female" ? "bg-gray-200" : "bg-white"}`}
          >
            <Text className="text-black">Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {isLoading ? (
          <ActivityIndicator size="large" color="#491975" />
        ) : filteredPets.length === 0 ? (
          <View className="py-8 items-center">
            <Feather name="search" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg mt-4 text-center">
              Aucun résultat trouvé pour "{searchQuery}" ou  avec le filtre "{filterBySex}".
            </Text>
          </View>
        ) : (
          filteredPets.map((pet) => (
            <TouchableOpacity
              key={pet._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4"
              activeOpacity={0.8}
              onPress={() => router.push(`/petsDetails?petId=${pet._id}`)}
            >
              <View className="flex-row">
                {pet.images?.length ? (
                  <Image
                    source={{ uri: replaceIp(pet.images[0], process.env.EXPO_PUBLIC_URL) }}
                    className="w-32 h-32"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-32 h-32 bg-gray-200 justify-center items-center">
                    <Feather name="image" size={24} color="#9CA3AF" />
                  </View>
                )}

                <View className="flex-1 p-4">
                  <Text className="text-lg font-semibold text-gray-800">{pet.name}</Text>
                  <View className="mt-2 flex-row gap-2">
                    <Text className="bg-[#491975]/10 self-start px-3 py-1 rounded-full text-[#491975] font-bold">{pet.Prix} MAD</Text>
                    <Text className="bg-[#491975]/10 self-start px-3 py-1 rounded-full text-[#491975] font-bold">{pet.category.name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
