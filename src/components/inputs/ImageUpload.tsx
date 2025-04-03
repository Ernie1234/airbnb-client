import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const cloudUrl = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const uploadPreset = import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      const uploadedUrls: string[] = [];

      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
          const response = await fetch(cloudUrl, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          uploadedUrls.push(data.secure_url);
        } catch (error) {
          toast.error("Error uploading image. Please try again.");
          setUploading(false);
        }
      }

      onChange([...value, ...uploadedUrls]);
      setUploading(false);
    },
    [onChange, value]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {uploading ? (
        <p>Uploading...</p>
      ) : (
        <p>Drag & drop images here, or click to select files</p>
      )}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {value.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
            className="w-full h-24 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
