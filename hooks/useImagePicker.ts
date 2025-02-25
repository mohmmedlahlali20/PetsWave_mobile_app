import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { useState } from "react";

const useImagePicker = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const res = await FileSystem.uploadAsync(`http://${process.env.EXPO_PUBLIC_URL}:${process.env.EXPO_PUBLIC_PORT}/upload/avatar`, result?.assets?.[0].uri ?? '', { uploadType: FileSystem.FileSystemUploadType.MULTIPART, fieldName: 'avatar' });
    console.log(res);
    console.log("Image Picker Result:", result.assets?.[0].uri ?? '');

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      console.warn("Aucune image sélectionnée.");
    }
  };


  return { image, pickImage };
};

export default useImagePicker;
