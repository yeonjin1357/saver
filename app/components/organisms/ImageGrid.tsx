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
  hasMore: boolean;
  renderImage?: (image: Image) => React.ReactNode;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, fetchMoreImages, onClick, hasMore, renderImage }) => {
  useEffect(() => {
    fetchMoreImages();
  }, []); // 빈 배열 추가하여 컴포넌트 마운트 시 한 번만 호출

  console.log(images);

  return (
    <InfiniteScroll
      dataLength={images.length} // images.length 사용
      next={fetchMoreImages}
      hasMore={hasMore}
      loader={<h4 className={styles.loader}>Loading...</h4>}
    >
      <div className={styles.grid}>{images.map((image) => (renderImage ? <React.Fragment key={image.id}>{renderImage(image)}</React.Fragment> : <ImageCard key={image.id} image={image} onClick={() => onClick(image)} />))}</div>
    </InfiniteScroll>
  );
};

export default ImageGrid;
