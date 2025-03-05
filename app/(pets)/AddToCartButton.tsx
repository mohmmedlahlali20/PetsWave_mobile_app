import React from "react"
import { TouchableOpacity, Text, ToastAndroid } from "react-native"
import { Feather } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Pets } from "~/constant/type"

interface AddToCartButtonProps {
  petSelected: Pets | null
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ petSelected }) => {
  const addToCart = async () => {
    try {
      if (!petSelected) {
        console.error("Aucun animal sélectionné.")
        return
      }

      const userData = await AsyncStorage.getItem("User")
      const userId = userData ? JSON.parse(userData)._id : null

      if (!userId) {
        console.error("Utilisateur non trouvé.")
        return
      }

      const cartKey = `cart_${userId}`
      const storedCart = await AsyncStorage.getItem(cartKey)
      const parsedCart: Pets[] = storedCart ? JSON.parse(storedCart) : []

      if (parsedCart.some((item) => item._id === petSelected._id)) {
        ToastAndroid.show("Cet animal est déjà dans votre panier !", ToastAndroid.SHORT)
        return
      }

      const updatedCart = [...parsedCart, petSelected]
      await AsyncStorage.setItem(cartKey, JSON.stringify(updatedCart))

      ToastAndroid.show("Animal ajouté au panier !", ToastAndroid.SHORT)
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error)
    }
  }

  return (
    <TouchableOpacity
      className="mt-4 flex-row items-center justify-center rounded-xl bg-purple-600 px-6 py-4"
      onPress={addToCart}
    >
      <Feather name="shopping-cart" size={20} color="#fff" />
      <Text className="ml-2 text-lg font-bold text-white">Ajouter au panier • {petSelected?.Prix} MAD</Text>
    </TouchableOpacity>
  )
}

export default AddToCartButton
