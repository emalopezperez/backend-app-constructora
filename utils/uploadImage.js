const cloudinary = require("cloudinary").v2;

const uploadImages = async (imageFiles) => {
  if (!imageFiles || imageFiles.length === 0) {
    return [];
  }

  const uploadPromises = imageFiles.map((file) =>
    cloudinary.uploader.upload(file.path, { resource_type: "image" })
  );

  const uploadedImages = await Promise.all(uploadPromises);

  return uploadedImages.map((image) => image.secure_url);
};

module.exports = uploadImages;
