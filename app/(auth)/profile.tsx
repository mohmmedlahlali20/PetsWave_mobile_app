import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { User } from "~/constant/type"; 

interface ProfileProps {
  user: User;
  onEdit: () => void; 
}

const Profile: React.FC<ProfileProps> = ({ user, onEdit }) => {
  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-3xl font-bold text-emerald-600 mb-6 text-center">Profile</Text>

      <View className="mb-6 items-center">
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} className="w-24 h-24 rounded-full mb-4" />
        ) : (
          <View className="w-24 h-24 rounded-full bg-gray-200 justify-center items-center mb-4">
            <Text className="text-gray-400">No Avatar</Text>
          </View>
        )}
        <Text className="text-xl font-semibold">{user.firstName} {user.lastName}</Text>
        <Text className="text-gray-700">{user.email}</Text>
      </View>

      <TouchableOpacity onPress={onEdit} className="w-full bg-emerald-500 py-3 rounded-lg items-center">
        <Text className="text-white font-semibold text-lg">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
