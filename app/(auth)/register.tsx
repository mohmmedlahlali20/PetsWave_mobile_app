import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch";
import { User } from "~/constant/type";
import { register } from "../redux/Slice/authSlice";

export default function Register() {
  const [firstName, setFirstName] = useState("Mohammed");
  const [lastName, setLastName] = useState("Lahlali");
  const [email, setEmail] = useState("mohammedlahlali@gmail.com");
  const [password, setPassword] = useState("mohammedlahlali");
  const [passwordConfirmation, setPasswordConfirmation] = useState("mohammedlahlali");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const handleRegister = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    const userData: User = {
      firstName,
      lastName,
      email,
      password,

    };

    const response = await dispatch(register(userData)).unwrap();
    console.log("Registration response:", response);
    Alert.alert("Success", "User registered successfully!");
    router.push('/(auth)/login');
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
          title: "Register",
          headerStyle: { backgroundColor: "#10B981" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <View className="p-6">
        <Text className="text-3xl font-bold text-emerald-600 mb-6 text-center">Create Account</Text>

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
  );
}
