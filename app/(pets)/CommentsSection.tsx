
import React,{ useEffect, useState } from "react"
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ToastAndroid } from "react-native"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { GetAllComments, RemoveComment } from "../redux/Slice/commentSlice"
import { Feather } from "@expo/vector-icons"
import { replaceIp } from "~/hooks/helpers"

const Reviews: React.FC<{
  showAllReviews: boolean
  setShowAllReviews: (val: boolean) => void
  onUpdateComment: (commentId: string) => void
  onDeleteComment: (commentId: string) => void
}> = ({ showAllReviews, setShowAllReviews, onUpdateComment, onDeleteComment }) => {
  const dispatch = useAppDispatch()
  const { petSelected } = useAppSelector((state) => state.pets)
  const { comments, isLoading, error } = useAppSelector((state) => state.comments)
  const petsId = petSelected?._id
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  useEffect(() => {
    if (petsId) {
      dispatch(GetAllComments({ petsId }))
    }
  }, [petsId])

  const handleToggleMenu = (commentId: string) => {
    setActiveMenu(activeMenu === commentId ? null : commentId)
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      await dispatch(RemoveComment(commentId)).unwrap()
      ToastAndroid.show("Commentaire supprimé avec succès!", ToastAndroid.SHORT)
    } catch (error) {
      ToastAndroid.show("Erreur lors de la suppression!", ToastAndroid.SHORT)
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex items-center justify-center py-12">
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text className="mt-4 text-gray-600 text-base font-medium">Chargement des commentaires...</Text>
        </View>
      )
    }

    

    if (comments.length === 0) {
      return (
        <View className="flex items-center justify-center py-12 bg-gray-50 rounded-lg">
          <Feather name="message-square" size={48} color="#8B5CF6" />
          <Text className="mt-4 text-gray-600 text-lg font-medium text-center">Aucun commentaire pour le moment</Text>
          <Text className="mt-2 text-gray-500 text-base text-center">Soyez le premier à donner votre avis !</Text>
        </View>
      )
    }

    return comments.slice(0, showAllReviews ? comments.length : 2).map((comment) => (
      <View key={comment._id} className="mb-6 rounded-2xl bg-white p-5 shadow-md">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Image
              source={{
                uri: replaceIp(
                  comment.createdBy?.avatar || "https://i.pinimg.com/736x/70/8c/08/708c08614099f90b849c6f7089f8effb.jpg",
                  process.env.EXPO_PUBLIC_URL,
                ),
              }}
              className="w-12 h-12 rounded-full mr-4 border-2 border-purple-200"
            />
            <View>
              <Text className="font-bold text-gray-800 text-lg">
                {comment.createdBy?.firstName} {comment.createdBy?.lastName}
              </Text>
              <Text className="text-gray-500 text-sm">
                {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>

          <View className="relative">
            <TouchableOpacity onPress={() => handleToggleMenu(comment._id!)} className="p-2 rounded-full bg-purple-100">
              <Feather name="more-vertical" size={20} color="#8B5CF6" />
            </TouchableOpacity>

            {activeMenu === comment._id && (
              <View className="absolute right-0 top-10 bg-white rounded-xl shadow-lg z-10 w-40 border border-gray-100">
                <TouchableOpacity
                  onPress={() => {
                    onUpdateComment(comment._id!)
                    setActiveMenu(null)
                  }}
                  className="py-3 px-4 border-b border-gray-100 flex-row items-center"
                >
                  <Feather name="edit-2" size={16} color="#8B5CF6" className="mr-3" />
                  <Text className="text-gray-700 font-medium">Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleDeleteComment(comment._id!)
                    setActiveMenu(null)
                  }}
                  className="py-3 px-4 flex-row items-center"
                >
                  <Feather name="trash-2" size={16} color="#EF4444" className="mr-3" />
                  <Text className="text-red-500 font-medium">Supprimer</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Text className="text-gray-600 text-base leading-relaxed">{comment.text}</Text>
      </View>
    ))
  }

  return (
    <View className="border-b border-gray-200 py-8 px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Avis clients</Text>

      {renderContent()}

      {comments.length > 2 && (
        <TouchableOpacity
          onPress={() => setShowAllReviews(!showAllReviews)}
          className="mt-6 self-start px-6 py-3 bg-purple-600 rounded-full shadow-md active:bg-purple-700 transition-colors"
        >
          <Text className="text-white font-semibold text-base">
            {showAllReviews ? "Voir moins" : `Voir plus (${comments.length - 2})`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Reviews

