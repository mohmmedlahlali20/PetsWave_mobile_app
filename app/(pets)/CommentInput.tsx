import { View, TextInput, TouchableOpacity, Text, ToastAndroid } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import React from "react";

export default function CommentInput() {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      ToastAndroid.show("Veuillez entrer un commentaire", ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show("Commentaire envoyé avec succès!", ToastAndroid.SHORT);
    setNewComment("");
  };

  return (
    <View className="py-4 border-b border-gray-200">
      <Text className="mb-3 text-lg font-semibold text-gray-800">Ajouter un commentaire</Text>
      <TextInput className="bg-white p-3 rounded-lg" placeholder="Écrivez ici..." value={newComment} onChangeText={setNewComment} />
      <TouchableOpacity onPress={handleSubmitComment} className="bg-purple-600 p-3 mt-2 rounded-lg">
        <Text className="text-white text-center">Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
}
