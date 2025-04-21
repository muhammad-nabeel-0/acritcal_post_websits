import React, { useState } from 'react';

const ImageUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show image preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    // Send file to parent
    onFileSelect(file);
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <label className="block text-sm font-semibold text-gray-600 mb-2">
        Upload Profile Image
      </label>

      <div className="flex items-center gap-4">
        {/* Image preview */}
        <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>

        {/* Upload input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm"
          required
        />
      </div>
    </div>
  );
};

export default ImageUpload;
