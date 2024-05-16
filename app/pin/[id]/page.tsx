// app/pin/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  const selectedImage = imageString ? JSON.parse(decodeURIComponent(imageString)) : null;
  const [relatedImages, setRelatedImages] = useState<Image[]>([]);
  const [hasMore, setHasMore] = useState(true);

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
        },
      });
      setRelatedImages(response.data);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching related images:", error);
    }
  };

  return (
    <div>
      {selectedImage && <SelectedImage image={selectedImage} />}
      <ImageGrid images={relatedImages} fetchMoreImages={fetchRelatedImages} onClick={() => {}} hasMore={hasMore} />
    </div>
  );
};

export default PinPage;
