import { Stack, useRouter } from "expo-router";
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { forgetPassword } from "../redux/Slice/authSlice";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Oops!", "Veuillez entrer votre adresse e-mail.");
      return;
    }

    try {
      await dispatch(forgetPassword(email)).unwrap();
      router.push('/(auth)/ResetPassword')
      Alert.alert("Succès", "Un lien de réinitialisation a été envoyé à votre adresse e-mail.");
      setEmail(""); 
    } catch (err: any) {
      Alert.alert("Erreur", err || "Échec de l'envoi du lien.");
    }
  };

  return (
    <View className="flex-1 bg-[#F5F3FF]">
      <Stack.Screen
        options={{
          title: "Mot de passe oublié",
          headerStyle: { backgroundColor: "#491975" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="flex-1 px-4 py-8 items-center">
        <View className="bg-white rounded-2xl p-6 shadow-lg">
          <View className="items-center mb-6">
            <View className="bg-[#491975]/10 w-16 h-16 rounded-full items-center justify-center mb-4">
              <Ionicons name="paw" size={40} color="#9333EA" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 text-center">
              Mot de passe oublié ?
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Entrez votre email pour réinitialiser votre mot de passe
            </Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Adresse email</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 focus:border-[#491975]">
                <Feather name="mail" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800"
                  placeholder="exemple@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {error ? (
              <View className="bg-red-50 p-4 rounded-xl">
                <Text className="text-red-600 text-sm">{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              className={`bg-[#491975] py-4 rounded-xl flex-row justify-center items-center m-2 mt-5 ${
                isLoading ? "opacity-70" : ""
              }`}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-lg">Envoyer le lien</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity className="py-2" onPress={() => router.push("/login")}>
              <Text className="text-[#491975] text-center">Retour à la connexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
