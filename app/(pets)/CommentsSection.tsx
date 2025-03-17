import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ToastAndroid } from 'react-native';

import { GetAllComments, RemoveComment } from '../redux/Slice/commentSlice';

import { replaceIp } from '~/hooks/helpers';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppDispatch';

const Reviews: React.FC<{
  showAllReviews: boolean;
  setShowAllReviews: (val: boolean) => void;
  onUpdateComment: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
}> = ({ showAllReviews, setShowAllReviews, onUpdateComment, onDeleteComment }) => {
  const dispatch = useAppDispatch();
  const { petSelected } = useAppSelector((state) => state.pets);
  const { comments, isLoading, error } = useAppSelector((state) => state.comments);
  const petsId = petSelected?._id;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    if (petsId) {
      dispatch(GetAllComments({ petsId }));
    }
  }, [petsId]);

  const handleToggleMenu = (commentId: string) => {
    setActiveMenu(activeMenu === commentId ? null : commentId);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await dispatch(RemoveComment(commentId)).unwrap();
      ToastAndroid.show('Commentaire supprimé avec succès!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Erreur lors de la suppression!', ToastAndroid.SHORT);
    }
  };

  return (
    <View className="border-b border-gray-200 py-6">
      <Text className="mb-4 text-xl font-bold text-gray-800">Avis clients</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#6B46C1" className="my-4" />
      ) : error ? (
        <Text className="my-4 text-red-500">{error}</Text>
      ) : (
        comments.slice(0, showAllReviews ? comments.length : 2).map((comment) => (
          <View key={comment._id} className="mb-4 rounded-xl bg-purple-50 p-4 shadow-sm">
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Image
                  source={{
                    uri: replaceIp(
                      comment.createdBy?.avatar || 'https://via.placeholder.com/40',
                      process.env.EXPO_PUBLIC_URL
                    ),
                  }}
                  className="mr-3 h-10 w-10 rounded-full"
                />
                <View>
                  <Text className="font-semibold text-gray-800">
                    {comment.createdBy?.firstName} {comment.createdBy?.lastName}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View className="relative">
                <TouchableOpacity onPress={() => handleToggleMenu(comment._id!)} className="p-2">
                  <Feather name="more-vertical" size={20} color="#4B5563" />
                </TouchableOpacity>

                {activeMenu === comment._id && (
                  <View className="absolute right-0 top-8 z-10 w-32 rounded-lg border border-gray-200 bg-white shadow-md">
                    <TouchableOpacity
                      onPress={() => {
                        onUpdateComment(comment._id!);
                        setActiveMenu(null);
                      }}
                      className="flex-row items-center border-b border-gray-100 px-4 py-3">
                      <Feather name="edit-2" size={16} color="#6B46C1" className="mr-2" />
                      <Text className="text-gray-700">Modifier</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        handleDeleteComment(comment._id!);
                        setActiveMenu(null);
                      }}
                      className="flex-row items-center px-4 py-3">
                      <Feather name="trash-2" size={16} color="#EF4444" className="mr-2" />
                      <Text className="text-red-500">Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <Text className="mb-2 text-gray-600">{comment.text}</Text>
          </View>
        ))
      )}

      {comments.length > 2 && (
        <TouchableOpacity
          onPress={() => setShowAllReviews(!showAllReviews)}
          className="mt-4 self-start rounded-full bg-purple-600 px-6 py-3">
          <Text className="font-semibold text-white">
            {showAllReviews ? 'Voir moins' : `Voir plus (${comments.length - 2})`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Reviews;
