import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';
import { Login } from '../redux/Slice/authSlice';


export default function loginComponents() {
    const [email, setEmail] = useState<string>('mohammedlahlali@gmail.com');
    const [password, setPassword] = useState<string>('mohammedlahlali');
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { error, isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        await dispatch(Login({ email, password })).unwrap();
    };

    useEffect(() => {
        if (isAuthenticated) {
            Alert.alert(
                    'Success',
                    'You are already logged in!',
                  );
            router.push('/');
        }
    }, [isAuthenticated]);

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <Stack.Screen
                options={{
                    title: "Login",
                    headerStyle: { backgroundColor: "#10B981" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
            <View className="flex-1 p-6 justify-center">
                <Text className="text-3xl font-bold text-emerald-600 mb-8 text-center">Log In to Your Account</Text>

                {error && (
                    <Text className="text-red-500 text-center mb-4">{error}</Text>
                )}

                <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
                    <TextInput
                        className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
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
                        className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    className="w-full bg-emerald-500 py-3 rounded-lg items-center"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-semibold text-lg">Login</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/(auth)/register")} className="mt-4 items-center">
                    <Text className="text-emerald-600 text-center">Don't have an account? Create one now!</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
