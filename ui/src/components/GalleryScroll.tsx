import { useState, useEffect, useRef, FC } from "react";
import NoGenerations from "./NoGenerations";
import Grid from "./Grid";
import { GalleryProps, ImageProps, ImageMapProps } from "@/types";

const limit: number = 4;

const fetchImages = async (url: string) => {
  const data: object = await (
    await fetch(url, {
      cache: "no-store",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
  ).json();
  return data;
};

const GalleryScroll: FC<GalleryProps> = ({ serverUrl, date }) => {
  const [page, setPage] = useState<number>(0);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noMoreImages, setNoMoreImages] = useState<boolean>(false);

  const fetchRef = useRef(null);

  const fetchWithOffset = async (offset: number) => {
    const url = serverUrl.replace("localhost", "127.0.0.1");
    setLoading(true);

    try {
      const all_images: ImageMapProps = (await fetchImages(
        `${url}/list_images?${new URLSearchParams({
          image_dir: "txt2img",
          date: date,
          desc: "true",
          limit: limit.toString(),
          offset: offset.toString(),
        })}`
      )) as ImageMapProps;

      if (Object.keys(all_images).length > 0) {
        setImages((prevImages) => [
          ...prevImages,
          ...Object.values(all_images),
        ]);

        setPage((prevPage) => prevPage + 1);
      } else {
        setNoMoreImages(true);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithOffset(page * limit);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !noMoreImages) {
        fetchWithOffset(page * limit);
      }
    });

    if (fetchRef.current) observer.observe(fetchRef.current);

    return () => {
      if (fetchRef.current) observer.unobserve(fetchRef.current);
    };
  }, [page, loading, noMoreImages]);

  return Object.keys(images).length > 0 ? (
    <Grid images={images} infinite={fetchRef} loading={loading} />
  ) : noMoreImages ? (
    <NoGenerations />
  ) : null;
};

export default GalleryScroll;
