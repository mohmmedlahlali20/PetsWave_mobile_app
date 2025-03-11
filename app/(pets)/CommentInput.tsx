import { View, TextInput, TouchableOpacity, Text, ToastAndroid } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useState } from "react"
import React from "react"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { AddComment } from "../redux/Slice/commentSlice"

export default function CommentInput() {
  const [text, setText] = useState("")
  const { user } = useAppSelector((state) => state.auth)
  const {petSelected} = useAppSelector((state)=> state.pets)
  
  

  const dispatch = useAppDispatch()


  const handleSubmitComment = async () => {
    const petsId = petSelected?._id;
    const createdBy = user?._id;
  
    if (!petsId || !createdBy) {
      ToastAndroid.show("Erreur: utilisateur ou animal introuvable", ToastAndroid.SHORT);
      return;
    }
  
    if (!text.trim()) {
      ToastAndroid.show("Veuillez entrer un commentaire", ToastAndroid.SHORT);
      return;
    }
  
    try {
      await dispatch(AddComment({ petsId, createdBy, text })).unwrap();
      ToastAndroid.show("Commentaire envoyé avec succès!", ToastAndroid.SHORT);
      setText("");
    } catch (err: any) {
      ToastAndroid.show("Erreur lors de l'ajout du commentaire", ToastAndroid.SHORT);
    }
  };
  

  return (
    <View className="py-4 border-b border-gray-200">
      <Text className="mb-3 text-lg font-semibold text-gray-800">Ajouter un commentaire</Text>

      <View className="flex-row items-center bg-white p-3 rounded-lg border border-gray-300">
        <TextInput
          className="flex-1 pr-3 text-gray-800"
          placeholder="Écrivez ici..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSubmitComment} className="p-4 rounded-full bg-purple-600">
          <Feather name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
