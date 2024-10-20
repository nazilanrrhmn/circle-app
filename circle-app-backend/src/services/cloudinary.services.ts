import { v2 as cloudinary } from "cloudinary";

class CloudinaryServices {
  constructor() {
    // Konfigurasi Cloudinary menggunakan environment variables
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error(
        "Missing Cloudinary configuration in environment variables"
      );
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Fungsi untuk upload file ke Cloudinary
  async upload(file: Express.Multer.File, folder: string = "circle-app") {
    try {
      if (!file || !file.buffer) {
        throw new Error("No file provided for upload");
      }

      // Ubah file buffer ke base64 format
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      // Unggah ke Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "circle-app-uploads",
      });

      return result; // Kembalikan hasil upload dari Cloudinary
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("File upload failed");
    }
  }
}

export default new CloudinaryServices();
