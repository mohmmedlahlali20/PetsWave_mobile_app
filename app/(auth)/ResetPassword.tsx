import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

type Step = 'code' | 'password' | 'success';

export default function ResetPassword() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('code');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Veuillez entrer un code valide');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep('password');
    } catch (err) {
      setError('Code invalide. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep('success');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'code':
        return (
          <View className="space-y-4">
            <View>
              <Text className="mb-2 font-medium text-gray-700">Code de vérification</Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 px-4 py-3">
                <Feather name="key" size={20} color="#6B7280" />
                <TextInput
                  className="ml-2 flex-1 text-gray-800"
                  placeholder="000000"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
              <Text className="mt-2 text-sm text-gray-500">
                Entrez le code à 6 chiffres envoyé à votre email
              </Text>
            </View>

            {error ? (
              <View className="rounded-xl bg-red-50 p-4">
                <Text className="text-sm text-red-600">{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              className={`flex-row items-center justify-center rounded-xl bg-[#491975] py-4 ${
                isLoading ? 'opacity-70' : ''
              }`}
              onPress={handleVerifyCode}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-lg font-semibold text-white">Vérifier le code</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2"
              onPress={() => router.push('/(auth)/ForgetPassword')}>
              <Text className="text-center text-[#491975]">Renvoyer le code</Text>
            </TouchableOpacity>
          </View>
        );

      case 'password':
        return (
          <View className="space-y-4">
            <View>
              <Text className="mb-2 font-medium text-gray-700">Nouveau mot de passe</Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 px-4 py-3">
                <Feather name="lock" size={20} color="#6B7280" />
                <TextInput
                  className="ml-2 flex-1 text-gray-800"
                  placeholder="********"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <View>
              <Text className="mb-2 font-medium text-gray-700">Confirmer le mot de passe</Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 px-4 py-3">
                <Feather name="lock" size={20} color="#6B7280" />
                <TextInput
                  className="ml-2 flex-1 text-gray-800"
                  placeholder="********"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {error ? (
              <View className="rounded-xl bg-red-50 p-4">
                <Text className="text-sm text-red-600">{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              className={`flex-row items-center justify-center rounded-xl bg-[#491975] py-4 ${
                isLoading ? 'opacity-70' : ''
              }`}
              onPress={handleResetPassword}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-lg font-semibold text-white">
                  Réinitialiser le mot de passe
                </Text>
              )}
            </TouchableOpacity>
          </View>
        );

      case 'success':
        return (
          <View className="items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Feather name="check" size={32} color="#10B981" />
            </View>
            <Text className="mb-2 text-center text-2xl font-bold text-gray-800">
              Mot de passe réinitialisé !
            </Text>
            <Text className="mb-6 text-center text-gray-500">
              Votre mot de passe a été réinitialisé avec succès
            </Text>
            <TouchableOpacity
              className="rounded-xl bg-[#491975] px-8 py-4"
              onPress={() => router.push('/login')}>
              <Text className="text-lg font-semibold text-white">Se connecter</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View className="flex-1 bg-[#F5F3FF]">
      <Stack.Screen
        options={{
          title: 'Réinitialisation du mot de passe',
          headerStyle: { backgroundColor: '#491975' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <View className="flex-1 px-4 py-8">
        <View className="rounded-2xl bg-white p-6 shadow-lg">
          <View className="mb-8 flex-row justify-between">
            <View className="h-2 flex-1 rounded-full bg-gray-200">
              <View
                className="h-full rounded-full bg-[#491975]"
                style={{
                  width:
                    currentStep === 'code' ? '33%' : currentStep === 'password' ? '66%' : '100%',
                }}
              />
            </View>
          </View>

          {renderStep()}
        </View>
      </View>
    </View>
  );
}
