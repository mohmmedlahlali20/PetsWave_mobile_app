import axios from 'axios';


export const uploadImageToBackend = async (imageUri: string ): Promise<string | null> => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const file = new File([blob], 'product-image.jpg', { type: blob.type });
console.log(file)
  const formData = new FormData();
formData.append('avatar', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'image.jpg',
    });

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

try {
  const response = await axios.post(`http://${process.env.EXPO_PUBLIC_URL}:${process.env.EXPO_PUBLIC_PORT}/upload`, formData, config);  
  return response.data.imageUrl
} catch (error) {
  console.error('Error uploading image:', error);
  return 'https://i.pinimg.com/736x/70/8c/08/708c08614099f90b849c6f7089f8effb.jpg'

}

};