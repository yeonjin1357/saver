import React from "react";
import Image from "next/image";
import styles from "../styles/SelectedImage.module.css";

interface SelectedImageProps {
  image: {
    id: string;
    urls: {
      full: string;
    };
    alt_description: string;
  };
}

const SelectedImage: React.FC<SelectedImageProps> = ({ image }) => (
  <div className={styles.selectedImage}>
    <Image src={image.urls.full} alt={image.alt_description || "Selected Image"} width={600} height={400} style={{ objectFit: "contain" }} />
  </div>
);

export default SelectedImage;
