import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';
import { resetPassword, verifyOTP } from '../redux/Slice/authSlice';

type Step = 'code' | 'password' | 'success';

export default function ResetPassword() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('code');
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, isOTPVerified, error } = useAppSelector((state) => state.auth);

  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleVerifyOTP = async () => {
    if (!otp || !email) {
      Alert.alert("Erreur", "Veuillez entrer votre email et le code OTP.");
      return;
    }

    try {
      await dispatch(verifyOTP({ email, otp })).unwrap();
      Alert.alert("Succès", "OTP validé !");
      setCurrentStep("password");
    } catch (err: any) {
      Alert.alert("Erreur", err);
    }
  };


  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez entrer et confirmer votre mot de passe.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await dispatch(resetPassword({ email, newPassword })).unwrap();
      Alert.alert("Succès", "Votre mot de passe a été réinitialisé avec succès !");
      router.push("/login");
    } catch (err: any) {
      Alert.alert("Erreur", err);
    }
  };





  const renderStep = () => {
    switch (currentStep) {
      case "code":
        return (
          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Adresse email</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-white">
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

            <View>
              <Text className="text-gray-700 mb-2 font-medium">Code de vérification</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 bg-white">
                <Feather name="key" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800"
                  placeholder="000000"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
              <Text className="text-gray-500 text-sm mt-2">Entrez le code à 6 chiffres envoyé à votre email</Text>
            </View>

            

            <TouchableOpacity
              className={`bg-[#491975] py-4 rounded-xl flex-row justify-center items-center ${
                isLoading ? "opacity-70" : ""
              }`}
              onPress={handleVerifyOTP}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-lg text-center">Vérifier le code</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity className="py-2" onPress={() => router.push("/")}>
              <Text className="text-[#491975] text-center">Renvoyer le code</Text>
            </TouchableOpacity>
          </View>
        );

      case "password":
        return (
          <View className="space-y-4">
            <TextInput
              className="ml-2 flex-1 text-gray-800"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />

            <TextInput
              className="ml-2 flex-1 text-gray-800"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity
              className="rounded-xl bg-[#491975] py-4"
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text className="text-lg font-semibold text-white">Réinitialiser</Text>}
            </TouchableOpacity>
          </View>
        );

      case "success":
        return (
          <View className="items-center">
            <Feather name="check" size={32} color="#10B981" />
            <Text className="text-lg font-bold text-gray-800">Mot de passe réinitialisé !</Text>
            <TouchableOpacity
              className="rounded-xl bg-[#491975] px-8 py-4"
              onPress={() => router.push("/login")}
            >
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
          headerBackVisible: false,
          gestureEnabled: false,
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
