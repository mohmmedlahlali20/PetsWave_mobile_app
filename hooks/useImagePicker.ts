import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { uploadImageToBackend } from "./uploadImage";

const useImagePicker = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Image Picker Result:", result.assets?.[0]?.uri ?? '');

    if (!result.canceled && result.assets && result.assets.length > 0) {
      try {
        const imageUrl = await uploadImageToBackend(result.assets[0].uri);
        console.log('picker hook',imageUrl)
        setAvatar(imageUrl); 
      } catch (error) {
        console.error("Erreur lors de l'upload de l'image :", error);
      }
    } else {
      console.warn("Aucune image sélectionnée.");
    }
  };

  return { avatar, setAvatar, pickImage }; 
};

export default useImagePicker;
