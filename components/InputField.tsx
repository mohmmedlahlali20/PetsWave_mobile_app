import React from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import { InputFieldProps } from "~/constant/type";
import { Ionicons } from "@expo/vector-icons";

const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  isPassword = false,
  togglePasswordVisibility = () => {},
  showPasswordState = false,
}) => {
  return (
    <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-white m-2">
      {icon && <View className="mr-2">{icon}</View>}
      <TextInput
        placeholder={placeholder} 
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword ? !showPasswordState : secureTextEntry}
        className="flex-1 text-base"
        placeholderTextColor="#999"
      />
      {showPasswordToggle && isPassword && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          accessible={true}
          accessibilityLabel="Toggle password visibility"
        >
  
          <View>
            <Ionicons name={showPasswordState ? "eye-off" : "eye"} size={20} color="#9333EA" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
