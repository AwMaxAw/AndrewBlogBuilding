import fs from "fs";
import path from "path";

export interface Photo {
  src: string;
  alt: string;
}

export function getAllPhotos(): Photo[] {
  const photosDir = path.join(process.cwd(), "public", "pic");

  if (!fs.existsSync(photosDir)) {
    return [];
  }

  const files = fs
    .readdirSync(photosDir)
    .filter((file) =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    )
    .sort();

  return files.map((file) => ({
    src: `/pic/${file}`,
    alt: file.replace(/\.[^/.]+$/, ""),
  }));
}
