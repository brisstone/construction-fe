import { useEffect, useState } from "react";
import { MultipleUploadImage } from "@/assets/svgComp/General";
import { PlusIcon, XCircleIcon } from "lucide-react";

type UploadProps = {
  onFileChange: (files: File[], name: string) => void;
  name: string;
  logo?: string;
  resetImage?: boolean;
  accept?: string;
};

const MultipleFileUpload = ({
  onFileChange,
  name,
  logo,
  resetImage,
  accept = "image/*",
}: UploadProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onFileChange([...files, ...newFiles], name);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileChange(updatedFiles, name);
  };

  const handleClearAll = () => {
    setFiles([]);
    onFileChange([], name);
  };

  useEffect(() => {
    if (resetImage) {
      setFiles([]);
    }
  }, [resetImage]);

  return (
    <div className="mb-4">
      <aside className="flex items-start gap-6">
        <input
          type="file"
          accept={accept}
          multiple
          onChange={handleFileChange}
          className="hidden"
          id={name}
        />

        {/* Upload Button */}
        {accept.startsWith("image/") ? (
          <label className="cursor-pointer" htmlFor={name}>
            {logo && logo !== "undefined" ? (
              <img
                src={logo}
                alt="logo"
                className="rounded-full border p-1 h-[100px] w-[100px]"
              />
            ) : (
              <MultipleUploadImage />
            )}
          </label>
        ) : (
          <label htmlFor={name}>
            <div className="h-[58px] inline-flex text-sm items-center cursor-pointer justify-center w-[126px] hover:bg-slate-900/90 rounded-[56px] text-deepBlue font-medium bg-lightGrey hover:text-white">
              <div className="mr-2">
                <PlusIcon />
              </div>
              Upload Files
            </div>
          </label>
        )}

        {/* Display Files */}
        {files.length > 0 && (
          <div className="mt-3 flex gap-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2">
                {accept.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded border"
                  />
                ) : (
                  <p className="text-sm">{file.name}</p>
                )}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveFile(index)}
                >
                  <XCircleIcon size={18} />
                </button>
              </div>
            ))}

            {/* Remove All Files Button */}
            <button
              type="button"
              className="text-red-600 mt-2 text-sm underline"
              onClick={handleClearAll}
            >
              Remove All
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default MultipleFileUpload;
