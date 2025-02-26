import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Login } from '../redux/Slice/authSlice';
import InputField from '~/components/InputField';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';




export default function LoginComponent() {
  const [email, setEmail] = useState<string>('mohmmed2010@gmail.com');
  const [password, setPassword] = useState<string>('20018555passsword');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Oops!', 'Please enter both email and password.');
      return;
    }

    await dispatch(Login({ email, password })).unwrap();
  };

  useEffect(() => {
    if (isAuthenticated) {
      Alert.alert('Welcome Back! 🐾', 'Successfully logged in!', [
        { text: 'Continue', onPress: () => router.push('/') },
      ]);
    }
  }, [isAuthenticated]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <ScrollView className="flex-1 bg-purple-50">
        <Stack.Screen
          options={{
            title: 'Login',
            headerStyle: { backgroundColor: '#491975' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />

        <View className="flex-1 p-6">
          <View className="mb-8 items-center">
            <View className="mb-4 rounded-full bg-purple-100 p-4">
              <Ionicons name="paw" size={40} color="#9333EA" />
            </View>
            <Text className="text-3xl font-bold text-purple-700">Welcome Back</Text>
            <Text className="mt-2 text-gray-500">Login to continue shopping for your pets</Text>
          </View>

          {error && (
            <View className="mb-4 rounded-lg bg-red-100 p-3">
              <Text className="text-center text-red-600">{error}</Text>
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

          <TouchableOpacity className="mb-6" onPress={()=> router.push('/(auth)/ForgetPassword')}>
            <Text className="text-right text-sm text-purple-600">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className="w-full items-center rounded-xl bg-[#491975] py-4 shadow-sm"
            style={{
              shadowColor: '#9333EA',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-lg font-bold text-white">Sign In</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center ">
            <TouchableOpacity
              onPress={() => router.push('/(auth)/register')}
              className="mt-6 items-center">
              <Text className="font-bold">Create Account</Text>
            </TouchableOpacity>

          </View>

          <View className="mt-8">
            <View className="mb-4 flex-row items-center">
              <View className="h-0.5 flex-1 bg-gray-200" />
              <Text className="mx-4 text-gray-500">or continue with</Text>
              <View className="h-0.5 flex-1 bg-gray-200" />
            </View>

            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity className="rounded-full border-2 border-purple-100 bg-white p-3">
                <Ionicons name="logo-google" size={24} color="#491975" />
              </TouchableOpacity>
              <TouchableOpacity className="rounded-full border-2 border-purple-100 bg-white p-3">
                <Ionicons name="logo-apple" size={24} color="#491975" />
              </TouchableOpacity>
              <TouchableOpacity className="rounded-full border-2 border-purple-100 bg-white p-3">
                <Ionicons name="logo-facebook" size={24} color="#491975" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
