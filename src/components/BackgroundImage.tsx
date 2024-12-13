import { useEffect, useState } from "react";
import { fetchBackgroundImage } from "../utils/fetchApi";

export default function BackgroundImage() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      const image = await fetchBackgroundImage();
      setImageUrl(image);
    };
    loadImage();
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10 brightness-50"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
}
