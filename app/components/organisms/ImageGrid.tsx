// app/components/organisms/ImageGrid.tsx
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageCard from "../molecules/ImageCard";
import styles from "../styles/ImageGrid.module.css";

interface Image {
  id: string;
  urls: { small: string; full: string };
  alt_description: string;
}

interface ImageGridProps {
  images: Image[];
  fetchMoreImages: () => void;
  onClick: (image: Image) => void;
  hasMore: boolean; // 더 불러올 이미지가 있는지 여부
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, fetchMoreImages, onClick, hasMore }) => {
  useEffect(() => {
    fetchMoreImages();
  }, []); // 빈 배열 추가하여 컴포넌트 마운트 시 한 번만 호출

  return (
    <InfiniteScroll
      dataLength={images.length} // images.length 사용
      next={fetchMoreImages}
      hasMore={hasMore}
      loader={<h4 className={styles.loader}>Loading...</h4>}
    >
      <div className={styles.grid}>
        {images.map((image) => (
          <ImageCard key={uuidv4()} image={image} onClick={onClick} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ImageGrid;
