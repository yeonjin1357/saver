// app/components/organisms/Modal.tsx
import React from "react";
import Image from "next/image";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  image: {
    urls: { full: string };
    alt_description: string;
    description?: string;
  };
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ image, onClose }) => (
  <div className={styles.modal}>
    <button className={styles.closeButton} onClick={onClose}>
      Close
    </button>
    <Image src={image.urls.full} alt={image.alt_description} width={800} height={600} priority style={{ objectFit: "contain" }} />
    <h2>{image.description || "No description available"}</h2>
  </div>
);

export default Modal;
