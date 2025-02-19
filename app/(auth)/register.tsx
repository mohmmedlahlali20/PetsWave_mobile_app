import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native"
import { Stack, useRouter } from "expo-router"
import { Feather } from "@expo/vector-icons"
import useImagePicker from "~/hooks/useImagePicker"


export default function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const router = useRouter()

  const { image: avatar, pickImage } = useImagePicker() 

  const handleRegister = () => {
    console.log("Register:", { firstName, lastName, email, password, passwordConfirmation, avatar })
    router.push("/")
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: "Register",
          headerStyle: { backgroundColor: "#10B981" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <View className="p-6">
        <Text className="text-3xl font-bold text-emerald-600 mb-6">Create Account</Text>

        <View className="mb-6 items-center">
          <TouchableOpacity onPress={pickImage} className="mb-2">
            {avatar ? (
              <Image source={{ uri: avatar }} className="w-24 h-24 rounded-full" />
            ) : (
              <View className="w-24 h-24 rounded-full bg-gray-200 justify-center items-center">
                <Feather name="camera" size={32} color="#9CA3AF" />
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-sm text-gray-600">Tap to select avatar</Text>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">First Name</Text>
          <TextInput
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Last Name</Text>
          <TextInput
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
          <TextInput
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>
          <TextInput
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-1">Confirm Password</Text>
          <TextInput
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            placeholder="Confirm your password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleRegister} className="w-full bg-emerald-500 py-3 rounded-lg items-center">
          <Text className="text-white font-semibold text-lg">Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/login")} className="mt-4 items-center">
          <Text className="text-emerald-600">Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
