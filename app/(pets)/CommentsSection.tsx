import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

const reviews = [
  { id: 1, user: "Marie L.", rating: 5, comment: "Mon chat adore !", date: "2024-02-15" },
  { id: 2, user: "Pierre D.", rating: 4, comment: "Très bon produit.", date: "2024-02-10" },
]

const Reviews: React.FC<{ showAllReviews: boolean; setShowAllReviews: (val: boolean) => void }> = ({
  showAllReviews,
  setShowAllReviews,
}) => {
  const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 2)

  return (
    <View className="border-b border-gray-200 py-4">
      <Text className="mb-3 text-lg font-semibold text-gray-800">Avis clients</Text>
      {reviewsToShow.map((review) => (
        <View key={review.id} className="mb-4 rounded-xl bg-purple-50 p-4">
          <Text className="font-medium text-gray-800">{review.user}</Text>
          <Text className="text-gray-600">{review.comment}</Text>
        </View>
      ))}
      {reviews.length > 2 && (
        <TouchableOpacity onPress={() => setShowAllReviews(!showAllReviews)} className="px-4 py-2 bg-purple-200 rounded-lg">
          <Text className="text-purple-700 font-medium">{showAllReviews ? "Voir moins" : `Voir plus (${reviews.length - 2})`}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Reviews
