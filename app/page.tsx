// app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import ImageCard from "./components/molecules/ImageCard";
import ImageGrid from "./components/organisms/ImageGrid";
import SelectedImage from "./components/organisms/SelectedImage";
import styles from "./styles/page.module.css";

interface Image {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
  description?: string;
}

const HomePage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    if (!hasMore) return;

    try {
      const response = await axios.get("/api/images", {
        params: {
          page,
        },
      });

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setHasMore(false);
    }
  };

  const handleImageClick = (image: Image) => {
    router.push(`/pin/${image.id}`);
  };

  return (
    <div className={styles.page}>
      <h1>Image Gallery</h1>
      {selectedImage && <SelectedImage image={selectedImage} />}
      <ImageGrid
        images={images}
        fetchMoreImages={fetchImages}
        onClick={handleImageClick}
        hasMore={hasMore}
        renderImage={(image) => (
          <Link key={image.id} href={`/pin/${image.id}`}>
            <ImageCard image={image} onClick={() => {}} />
          </Link>
        )}
      />
      <div className={styles.loader}></div>
    </div>
  );
};

export default HomePage;
