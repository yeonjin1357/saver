// app/pin/[id]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import SelectedImage from "../../components/organisms/SelectedImage";
import ImageGrid from "../../components/organisms/ImageGrid";

interface Image {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
  description?: string;
}

interface PinPageProps {
  params: {
    id: string;
  };
}

const PinPage: React.FC<PinPageProps> = ({ params }) => {
  const { id } = params;
  const searchParams = useSearchParams();
  const imageString = searchParams.get("image");
  const [selectedImage, setSelectedImage] = useState<Image | null>(imageString ? JSON.parse(decodeURIComponent(imageString)) : null);
  const [relatedImages, setRelatedImages] = useState<Image[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (selectedImage) {
      fetchRelatedImages();
    }
  }, [selectedImage]);

  const fetchRelatedImages = async () => {
    if (!selectedImage) return;

    try {
      const response = await axios.get("/api/related-images", {
        params: {
          imageId: selectedImage.id,
          page: page,
        },
      });
      setRelatedImages((prevImages) => [...prevImages, ...response.data]);
      setHasMore(response.data.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching related images:", error);
    }
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setRelatedImages([]);
    setPage(1);
    router.push(`/pin/${image.id}?image=${encodeURIComponent(JSON.stringify(image))}`);
  };

  return (
    <div>
      {selectedImage && <SelectedImage image={selectedImage} />}
      <ImageGrid images={relatedImages} fetchMoreImages={fetchRelatedImages} onClick={handleImageClick} hasMore={hasMore} />
    </div>
  );
};

export default PinPage;
