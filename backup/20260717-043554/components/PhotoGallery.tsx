import Image from "next/image";
import { Photo } from "@/lib/photos";

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
}

export default function PhotoGallery({ photos, title = "Photos" }: PhotoGalleryProps) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <section id="photos">
      {title && (
        <h2 className="font-serif text-2xl font-semibold mb-10 flex items-center gap-4">
          {title}
          <span className="flex-1 h-px bg-border/80" />
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className="glass-card overflow-hidden group cursor-pointer relative"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
