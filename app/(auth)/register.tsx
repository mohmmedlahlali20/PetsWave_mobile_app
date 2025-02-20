import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { Stack, useRouter } from "expo-router"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import type { User } from "~/constant/type"
import { register } from "../redux/Slice/authSlice"
import { Ionicons } from "@expo/vector-icons"
import InputField from "~/components/InputField"

export default function Register() {
  const [firstName, setFirstName] = useState("Mohammed")
  const [lastName, setLastName] = useState("Lahlali")
  const [email, setEmail] = useState("mohammedlahlali@gmail.com")
  const [password, setPassword] = useState("mohammedlahlali")
  const [passwordConfirmation, setPasswordConfirmation] = useState("mohammedlahlali")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const handleRegister = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert("Oops!", "Passwords don't match. Please try again.")
      return
    }

    setIsLoading(true)
    try {
      const userData: User = { firstName, lastName, email, password }

      await dispatch(register(userData)).unwrap()
      Alert.alert("Welcome to PetPal! 🐾", "Your account has been created successfully!", [
        { text: "Continue", onPress: () => router.push("/(auth)/login") },
      ])
    } catch (error) {
      Alert.alert("Registration Failed", "Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      Alert.alert("Welcome Back! 🐾", "You are already logged in!")
      router.push("/")
    }
  }, [isAuthenticated, router])

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView className="flex-1 bg-purple-50">
        <Stack.Screen
          options={{
            title: "Create Account",
            headerStyle: { backgroundColor: "#9333EA" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />

        <View className="p-6">
          <View className="items-center mb-8">
            <View className="bg-purple-100 rounded-full p-4 mb-4">
              <Ionicons name="paw" size={40} color="#9333EA" />
            </View>
            <Text className="text-3xl font-bold text-purple-700">Join PetWave</Text>
            <Text className="text-gray-500 mt-2">Create your account to get started</Text>
          </View>

          <InputField
            icon={<Ionicons name="person-outline" size={20} color="#9333EA" />}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />

          <InputField
            icon={<Ionicons name="person-outline" size={20} color="#9333EA" />}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />

          <InputField
            icon={<Ionicons name="mail-outline" size={20} color="#9333EA" />}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            isPassword={false}
          />

          <InputField
            icon={<Ionicons name="lock-closed-outline" size={20} color="#9333EA" />}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            showPasswordToggle={true}
            isPassword={true}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            showPasswordState={showPassword}
          />

          <InputField
            icon={<Ionicons name="lock-closed-outline" size={20} color="#9333EA" />}
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            secureTextEntry={true}
            showPasswordToggle={true}
            isPassword={true}
            togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            showPasswordState={showConfirmPassword}
          />

          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            className="w-full bg-purple-600 py-4 rounded-xl items-center mt-4 shadow-sm"
            style={{
              shadowColor: "#9333EA",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(auth)/login")} className="mt-6 items-center">
            <Text className="text-purple-600 font-medium">
              Already have an account? <Text className="font-bold">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
