import React,{useEffect} from "react"
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native"
import { useAppDispatch, useAppSelector } from "~/hooks/useAppDispatch"
import { GetAllComments } from "../redux/Slice/commentSlice"
import { Feather } from "@expo/vector-icons"
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu"
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
  const {userId} = useAppSelector((state) => state.auth)
  const petsId = petSelected?._id
console.log(comments[2]?.createdBy.firstName);

  
  
  

 useEffect(() => {
    if (petsId) {
      dispatch(GetAllComments({ petsId }))
    }
  }, [petsId])

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
                  source={{ uri: replaceIp(comment.createdBy?.avatar || 'https://via.placeholder.com/40', process.env.EXPO_PUBLIC_URL) }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View>
                  <Text className="font-semibold text-gray-800">
                    {comment.createdBy?.firstName} {comment.createdBy?.lastName}
                  </Text>
                  <Text className="text-gray-500 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</Text>
                </View>
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

