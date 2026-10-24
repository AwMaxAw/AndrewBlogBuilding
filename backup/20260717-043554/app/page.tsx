import Hero from "@/components/Hero";
import PhotoGallery from "@/components/PhotoGallery";
import { getAllPhotos } from "@/lib/photos";

export default function Home() {
  const photos = getAllPhotos();

  return (
    <>
      <Hero />
      <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 md:px-8 py-16">
        <PhotoGallery photos={photos} title="Photos" />
      </div>
    </>
  );
}
