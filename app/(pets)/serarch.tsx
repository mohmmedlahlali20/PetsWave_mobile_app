"use client"

import { Stack, useRouter } from "expo-router"
import { Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import React, { useState, useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { getPets } from "../redux/Slice/petSlice"

import { Image } from "react-native"
import { replaceIp } from "~/hooks/helpers"
import debounce from 'lodash/debounce'
import { Pets } from "~/constant/type"

type SortOption = "prix_asc" | "prix_desc" | "recent" | "populaire"
type PriceRange = "all" | "0-500" | "500-1000" | "1000-2000" | "2000+"

interface FilterState {
  category: string | null
  priceRange: PriceRange
  sortBy: SortOption
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "prix_asc", label: "Prix croissant" },
  { value: "prix_desc", label: "Prix décroissant" },
  { value: "recent", label: "Plus récent" },
  { value: "populaire", label: "Plus populaire" },
]

const priceRanges: { value: PriceRange; label: string }[] = [
  { value: "all", label: "Tous les prix" },
  { value: "0-500", label: "0 - 500 MAD" },
  { value: "500-1000", label: "500 - 1000 MAD" },
  { value: "1000-2000", label: "1000 - 2000 MAD" },
  { value: "2000+", label: "2000+ MAD" },
]

const recentSearches = [
  "Chien Berger",
  "Chat Persan",
  "Lapin nain",
  "Poisson rouge",
]

export default function Search() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector((state) => state.category)
  const { pets, isLoading } = useAppSelector((state) => state.pets)

  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    priceRange: "all",
    sortBy: "recent",
  })
  const [filteredPets, setFilteredPets] = useState<Pets[]>([])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setFilteredPets([])
        return
      }

      const searchResults = pets.filter((pet) =>
        pet.name.toLowerCase().includes(query.toLowerCase()) ||
        pet.description.toLowerCase().includes(query.toLowerCase())
      )

      setFilteredPets(searchResults)
    }, 300),
    [pets]
  )

  useEffect(() => {
    debouncedSearch(searchQuery)
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchQuery, debouncedSearch])

  const applyFilters = useCallback(() => {
    let results = [...pets]

    // Apply category filter
    if (filters.category) {
      results = results.filter((pet) => pet.category === filters.category)
    }

    // Apply price range filter
    if (filters.priceRange !== "all") {
      results = results.filter((pet) => {
        const price = pet.Prix
        switch (filters.priceRange) {
          case "0-500":
            return price <= 500
          case "500-1000":
            return price > 500 && price <= 1000
          case "1000-2000":
            return price > 1000 && price <= 2000
          case "2000+":
            return price > 2000
          default:
            return true
        }
      })
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (filters.sortBy) {
        case "prix_asc":
          return a.Prix - b.Prix
        case "prix_desc":
          return b.Prix - a.Prix
        case "recent":
          return new Date(b._id).getTime() - new Date(a._id).getTime()
        case "populaire":
          return 0 // Implement popularity logic if available
        default:
          return 0
      }
    })

    setFilteredPets(results)
  }, [pets, filters.category, filters.priceRange, filters.sortBy])

  useEffect(() => {
    if (searchQuery) {
      applyFilters()
    }
  }, [searchQuery, applyFilters])

  const renderPetCard = useCallback(({ pet }: { pet: Pet }) => (
    <TouchableOpacity
      key={pet._id}
      className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4"
      activeOpacity={0.8}
      onPress={() => router.push(`/petsDetails?petId=${pet._id}`)}
    >
      <View className="flex-row">
        {pet.images && pet.images.length > 0 ? (
          <Image
            source={{ uri: replaceIp(pet.images[0], '192.168.8.134') }}
            className="w-32 h-32"
            resizeMode="cover"
          />
        ) : (
          <View className="w-32 h-32 bg-gray-200 justify-center items-center">
            <Feather name="image" size={24} color="#9CA3AF" />
          </View>
        )}

        <View className="flex-1 p-4">
          <Text className="text-lg font-semibold text-gray-800 mb-1">
            {pet.name}
          </Text>
          <Text className="text-sm text-gray-500 mb-2" numberOfLines={2}>
            {pet.description}
          </Text>
          <View className="bg-[#491975]/10 self-start px-3 py-1 rounded-full">
            <Text className="text-[#491975] font-bold">{pet.Prix} MAD</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ), [router])

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

      {/* Search Header */}
      <View className="bg-[#491975] px-4 pb-6 pt-2">
        <View className="flex-row items-center bg-white rounded-xl px-4 py-2">
          <Feather name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Rechercher un animal..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <Feather 
              name="sliders" 
              size={20} 
              color={showFilters ? "#491975" : "#6B7280"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      {showFilters && (
        <View className="bg-white px-4 py-4 border-b border-gray-200">
          {/* Categories */}
          <Text className="font-medium text-gray-800 mb-2">Catégories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="mb-4"
          >
            <TouchableOpacity
              onPress={() => setFilters(f => ({ ...f, category: null }))}
              className={`mr-2 px-4 py-2 rounded-full ${
                filters.category === null 
                  ? "bg-[#491975] border-transparent" 
                  : "bg-white border-gray-200 border"
              }`}
            >
              <Text className={filters.category === null ? "text-white" : "text-gray-600"}>
                Tout
              </Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category._id}
                onPress={() => setFilters(f => ({ ...f, category: category._id }))}
                className={`mr-2 px-4 py-2 rounded-full ${
                  filters.category === category._id 
                    ? "bg-[#491975] border-transparent" 
                    : "bg-white border-gray-200 border"
                }`}
              >
                <Text 
                  className={
                    filters.category === category._id 
                      ? "text-white" 
                      : "text-gray-600"
                  }
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Price Range */}
          <Text className="font-medium text-gray-800 mb-2">Prix</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="mb-4"
          >
            {priceRanges.map((range) => (
              <TouchableOpacity
                key={range.value}
                onPress={() => setFilters(f => ({ ...f, priceRange: range.value }))}
                className={`mr-2 px-4 py-2 rounded-full ${
                  filters.priceRange === range.value 
                    ? "bg-[#491975] border-transparent" 
                    : "bg-white border-gray-200 border"
                }`}
              >
                <Text 
                  className={
                    filters.priceRange === range.value 
                      ? "text-white" 
                      : "text-gray-600"
                  }
                >
                  {range.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sort Options */}
          <Text className="font-medium text-gray-800 mb-2">Trier par</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setFilters(f => ({ ...f, sortBy: option.value }))}
                className={`mr-2 px-4 py-2 rounded-full ${
                  filters.sortBy === option.value 
                    ? "bg-[#491975] border-transparent" 
                    : "bg-white border-gray-200 border"
                }`}
              >
                <Text 
                  className={
                    filters.sortBy === option.value 
                      ? "text-white" 
                      : "text-gray-600"
                  }
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView className="flex-1 px-4">
        {/* Recent Searches */}
        {!searchQuery && (
          <View className="py-4">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Recherches récentes
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSearchQuery(search)}
                  className="bg-white px-4 py-2 rounded-full border border-gray-200"
                >
                  <Text className="text-gray-600">{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Search Results */}
        {searchQuery && (
          <View className="py-4">
            {isLoading ? (
              <ActivityIndicator size="large" color="#491975" />
            ) : filteredPets.length > 0 ? (
              <>
                <Text className="text-lg font-semibold text-gray-800 mb-4">
                  {filteredPets.length} résultat{filteredPets.length > 1 ? 's' : ''}
                </Text>
                <View className="space-y-4">
                  {filteredPets.map((pet) => renderPetCard({ pet }))}
                </View>
              </>
            ) : (
              <View className="py-8 items-center">
                <Feather name="search" size={48} color="#9CA3AF" />
                <Text className="text-gray-500 text-lg mt-4 text-center">
                  Aucun résultat trouvé pour "{searchQuery}"
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
