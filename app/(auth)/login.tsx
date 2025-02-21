import React from "react"
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native"
import { useState, useEffect } from "react"
import { Stack, useRouter } from "expo-router"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { Login } from "../redux/Slice/authSlice"
import { Ionicons } from "@expo/vector-icons"
import InputField from "~/components/InputField"


export default function LoginComponent() {
    const [email, setEmail] = useState<string>("mohmmed2010@gmail.com")
    const [password, setPassword] = useState<string>("20018555passsword")
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { error, isLoading, isAuthenticated } = useAppSelector((state) => state.auth)

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Oops!", "Please enter both email and password.")
            return
        }

        await dispatch(Login({ email, password })).unwrap()
    }

    useEffect(() => {
        if (isAuthenticated) {
            Alert.alert("Welcome Back! 🐾", "Successfully logged in!", [
                { text: "Continue", onPress: () => router.push("/") },
            ])
        }
    }, [isAuthenticated, router])


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
            <ScrollView className="flex-1 bg-purple-50">
                <Stack.Screen
                    options={{
                        title: "Welcome Back",
                        headerStyle: { backgroundColor: "#9333EA" },
                        headerTintColor: "#fff",
                        headerTitleStyle: { fontWeight: "bold" },
                    }}
                />

                <View className="flex-1 p-6">
                    <View className="items-center mb-8">
                        <View className="bg-purple-100 rounded-full p-4 mb-4">
                            <Ionicons name="paw" size={40} color="#9333EA" />
                        </View>
                        <Text className="text-3xl font-bold text-purple-700">Welcome Back</Text>
                        <Text className="text-gray-500 mt-2">Login to continue shopping for your pets</Text>
                    </View>

                    {error && (
                        <View className="mb-4 bg-red-100 p-3 rounded-lg">
                            <Text className="text-red-600 text-center">{error}</Text>
                        </View>
                    )}

                    <InputField
                        icon={<Ionicons name="mail-outline" size={20} color="#9333EA" />}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
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

                    <TouchableOpacity className="mb-6">
                        <Text className="text-purple-600 text-right text-sm">Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={isLoading}
                        className="w-full bg-purple-600 py-4 rounded-xl items-center shadow-sm"
                        style={{
                            shadowColor: "#9333EA",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text className="text-white font-bold text-lg">Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/(auth)/register")} className="mt-6 items-center">
                        <Text className="font-bold">Create Account</Text>
                    </TouchableOpacity>

                    <View className="mt-8">
                        <View className="flex-row items-center mb-4">
                            <View className="flex-1 h-0.5 bg-gray-200" />
                            <Text className="mx-4 text-gray-500">or continue with</Text>
                            <View className="flex-1 h-0.5 bg-gray-200" />
                        </View>

                        <View className="flex-row justify-center space-x-4">
                            <TouchableOpacity className="p-3 bg-white rounded-full border-2 border-purple-100">
                                <Ionicons name="logo-google" size={24} color="#9333EA" />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-3 bg-white rounded-full border-2 border-purple-100">
                                <Ionicons name="logo-apple" size={24} color="#9333EA" />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-3 bg-white rounded-full border-2 border-purple-100">
                                <Ionicons name="logo-facebook" size={24} color="#9333EA" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

