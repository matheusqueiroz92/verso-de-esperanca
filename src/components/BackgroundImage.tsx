import { useEffect, useState } from 'react';
import { fetchBackgroundImage } from '../utils/fetchApi';

export default function BackgroundImage() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      const image = await fetchBackgroundImage();
      setImageUrl(image);
    };
    loadImage();
  }, []);

  return (
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
  );
}