
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

  return (
    <View className="border-b border-gray-200 py-6">
      <Text className="mb-4 text-xl font-bold text-gray-800">Avis clients</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#6B46C1" className="my-4" />
      ) : error ? (
        <Text className="text-red-500 my-4">{error}</Text>
      ) : (
        comments.slice(0, showAllReviews ? comments.length : 2).map((comment) => (
          <View key={comment._id} className="mb-4 rounded-xl bg-purple-50 p-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center">
                <Image
                  source={{
                    uri: replaceIp(
                      comment.createdBy?.avatar || "https://via.placeholder.com/40",
                      process.env.EXPO_PUBLIC_URL,
                    ),
                  }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View>
                  <Text className="font-semibold text-gray-800">
                    {comment.createdBy?.firstName} {comment.createdBy?.lastName}
                  </Text>
                  <Text className="text-gray-500 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</Text>
                </View>
              </View>

              
                <View className="relative">
                  <TouchableOpacity onPress={() => handleToggleMenu(comment._id!)} className="p-2">
                    <Feather name="more-vertical" size={20} color="#4B5563" />
                  </TouchableOpacity>

                  {activeMenu === comment._id && (
                    <View className="absolute right-0 top-8 bg-white rounded-lg shadow-md z-10 w-32 border border-gray-200">
                      <TouchableOpacity
                        onPress={() => {
                          onUpdateComment(comment._id!)
                          setActiveMenu(null)
                        }}
                        className="py-3 px-4 border-b border-gray-100 flex-row items-center"
                      >
                        <Feather name="edit-2" size={16} color="#6B46C1" className="mr-2" />
                        <Text className="text-gray-700">Modifier</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          handleDeleteComment(comment._id!)
                          setActiveMenu(null)
                        }}
                        className="py-3 px-4 flex-row items-center"
                      >
                        <Feather name="trash-2" size={16} color="#EF4444" className="mr-2" />
                        <Text className="text-red-500">Supprimer</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              
            </View>

            <Text className="text-gray-600 mb-2">{comment.text}</Text>
          </View>
        ))
      )}

      {comments.length > 2 && (
        <TouchableOpacity
          onPress={() => setShowAllReviews(!showAllReviews)}
          className="mt-4 self-start px-6 py-3 bg-purple-600 rounded-full"
        >
          <Text className="text-white font-semibold">
            {showAllReviews ? "Voir moins" : `Voir plus (${comments.length - 2})`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Reviews

