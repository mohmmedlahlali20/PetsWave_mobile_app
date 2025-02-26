import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';
import type { User } from '~/constant/type';
import { register } from '../redux/Slice/authSlice';
import { Ionicons } from '@expo/vector-icons';
import InputField from '~/components/InputField';

export default function Register() {
  const [firstName, setFirstName] = useState('Mohammed');
  const [lastName, setLastName] = useState('Lahlali');
  const [email, setEmail] = useState('mohammedlahlali@gmail.com');
  const [password, setPassword] = useState('mohammedlahlali');
  const [passwordConfirmation, setPasswordConfirmation] = useState('mohammedlahlali');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const handleRegister = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert('Oops!', "Passwords don't match. Please try again.");
      return;
    }

    try {
      const userData: User = { firstName, lastName, email, password };

      await dispatch(register(userData)).unwrap();
      Alert.alert('Welcome to PetPal! 🐾', 'Your account has been created successfully!', [
        { text: 'Continue', onPress: () => router.push('/(auth)/login') },
      ]);
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again later.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      Alert.alert('Welcome Back! 🐾', 'You are already logged in!');
      router.push('/');
    }
  }, [isAuthenticated]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <ScrollView className="flex-1 bg-purple-50">
        <Stack.Screen
          options={{
            title: 'Create Account',
            headerStyle: { backgroundColor: '#491975' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />

        <View className="p-6">
          <View className="mb-8 items-center">
            <View className="mb-4 rounded-full bg-purple-100 p-4">
              <Ionicons name="paw" size={40} color="#491975" />
            </View>
            <Text className="text-3xl font-bold text-purple-700">Join PetWave</Text>
            <Text className="mt-2 text-gray-500">Create your account to get started</Text>
          </View>
          {error && (
            <View className="mb-4 rounded-lg bg-red-100 p-3">
              <Text className="text-center text-red-600">{error}</Text>
            </View>
          )}
          <InputField
            icon={<Ionicons name="person-outline" size={20} color="#491975" />}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />

          <InputField
            icon={<Ionicons name="person-outline" size={20} color="#491975" />}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />

          <InputField
            icon={<Ionicons name="mail-outline" size={20} color="#491975" />}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            isPassword={false}
          />

          <InputField
            icon={<Ionicons name="lock-closed-outline" size={20} color="#491975" />}
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
            icon={<Ionicons name="lock-closed-outline" size={20} color="#491975" />}
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
            className="mt-4 w-full items-center rounded-xl bg-[#491975] py-4 shadow-sm"
            style={{
              shadowColor: '#491975',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-lg font-bold text-white">Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            className="mt-6 items-center">
            <Text className="font-medium text-purple-600">
              Already have an account? <Text className="font-bold">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
