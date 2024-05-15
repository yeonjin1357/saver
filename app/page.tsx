// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import ImageGrid from "./components/organisms/ImageGrid";
import SelectedImage from "./components/organisms/SelectedImage";
import axios from "axios";
import styles from "./styles/page.module.css";

interface Image {
  id: string;
  urls: { small: string; full: string };
  alt_description: string;
  description?: string;
}

const HomePage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [relatedImages, setRelatedImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const [hasMore, setHasMore] = useState(true); // 더 불러올 이미지가 있는지 여부

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    if (!hasMore) return; // 더 이상 불러올 이미지가 없으면 중단

    try {
      const response = await axios.get("/api/images", {
        params: { page }, // 페이지 번호를 파라미터로 전달
      });
      if (response.data.length === 0) {
        setHasMore(false); // 불러온 이미지가 없으면 더 이상 요청하지 않음
      } else {
        setImages((prevImages) => [...prevImages, ...response.data]);
        setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setHasMore(false); // 오류 발생 시 더 이상 요청하지 않음
    }
  };

  const handleImageClick = async (image: Image) => {
    setSelectedImage(image);
    await fetchRelatedImages(image);
  };

  const fetchRelatedImages = async (image: Image) => {
    try {
      const response = await axios.get("/api/related-images", {
        params: { query: image.alt_description },
      });
      setRelatedImages(response.data);
    } catch (error) {
      console.error("Error fetching related images:", error);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Image Gallery</h1>
      {selectedImage && <SelectedImage image={selectedImage} />}
      <ImageGrid
        images={selectedImage ? relatedImages : images}
        fetchMoreImages={fetchImages}
        onClick={handleImageClick}
        hasMore={hasMore} // hasMore 속성 추가
      />
      <div className={styles.loader}></div>
    </div>
  );
};

export default HomePage;
