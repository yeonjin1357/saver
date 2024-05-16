// app/components/molecules/ImageCard.tsx
import React from "react";
import Image from "next/image";

import styles from "../styles/ImageCard.module.css";

interface ImageCardProps {
  image: {
    id: string;
    urls: { small: string; full: string };
    alt_description: string;
  };
  onClick: (image: any) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => (
  <div className={styles.card} onClick={() => onClick(image)}>
    <Image src={image.urls.small} alt={image.alt_description || "Image"} width={300} height={200} style={{ objectFit: "cover" }} />
  </div>
);

export default ImageCard;
