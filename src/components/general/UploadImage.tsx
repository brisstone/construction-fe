import { useEffect, useState } from "react";
import { UploadImage } from "@/assets/svgComp/General";
import { PlusIcon, UploadCloud } from "lucide-react";
type UploadProps = {
  onFileChange: (file: File | null, name: string) => void;
  name: string;
  logo?: string;
  resetImage?: boolean;

  accept?: string;
  userUpload?: string;
};

const UploadImg = ({
  onFileChange,
  name,
  logo,
  resetImage,
  userUpload,
  accept = "image/*",
}: UploadProps) => {
  const [image, setImage] = useState<string | null>(null);

  const [selectedfile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(URL.createObjectURL(file));
      setSelectedFile(file);
      onFileChange(file, name);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onFileChange(null, name);
  };

  useEffect(() => {
    if (resetImage) {
      setImage(null);
    }
  }, [resetImage]);

  return (
    <div className="mb-4">
      <aside className="flex items-center gap-3">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={name}
        />

        {accept.startsWith("image/") ? (
          <label className="cursor-pointer" htmlFor={name}>
            {logo && logo != "undefined" && logo != undefined ? (
              <img
                src={logo}
                alt="logoError"
                className="rounded-full border p-1 h-[100px] w-[100px]"
              />
            ) : userUpload ? (
              <UploadImage />
            ) : (
              <UploadCloud />
            )}
          </label>
        ) : (
          <label htmlFor={name}>
            <div className="h-[58px] inline-flex text-sm items-center cursor-pointer justify-center w-[126px]  hover:bg-slate-900/90 rounded-[56px] text-deepBlue font-medium bg-lightGrey hover:text-white">
              <div className="mr-2">
                <PlusIcon />
              </div>
              Upload File
            </div>
          </label>
        )}
        {/* Display Image Preview */}
        {image && (
          <div className="mt-3">
            {accept.startsWith("image/") ? (
              <img
                src={image}
                alt="Uploaded Preview"
                className="w-24 h-24 object-cover"
              />
            ) : (
              <p className="text-sm">{selectedfile?.name}</p>
            )}
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default UploadImg;
