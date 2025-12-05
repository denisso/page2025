import type { ContentImage } from "@/shared/types";

type ImageProps = { image?: ContentImage | null; alt: string };

export const Image = ({ image, alt }: ImageProps) => {
  if (!image) return <></>;
  // return <img src={image.src} alt={alt} />;
  return <>src:{image.src} / alt: {alt}</>
};
