import { useState } from "react"
import { Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useCameraPermissions } from "expo-camera"

export default function useImagePicker() {
  const [image, setImage] = useState<string | null>(null)
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()

  const pickImage = async () => {
    const { status: imagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!cameraPermission?.granted) {
      const { granted } = await requestCameraPermission()
      if (!granted) {
        Alert.alert("Permission required", "You need to grant camera access.")
        return
      }
    }

    if (imagePickerStatus !== "granted") {
      Alert.alert("Permission required", "You need to grant gallery access.")
      return
    }

    Alert.alert("Select Avatar", "Choose an image from your gallery or take a new photo.", [
      {
        text: "Gallery",
        onPress: async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          })
          if (!result.canceled) {
            setImage(result.assets[0].uri)
          }
        },
      },
      {
        text: "Camera",
        onPress: async () => {
          let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          })
          if (!result.canceled) {
            setImage(result.assets[0].uri)
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ])
  }

  return { image, pickImage }
}
