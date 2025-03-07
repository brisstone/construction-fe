import { DownloadProof } from "@/assets/svgComp/PropertyIcon";
import { XCircleIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept?: Accept;
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload,
  accept = {
    "image/png": [],
    "image/jpeg": [],
    "image/gif": [],
    "image/svg+xml": [],
    "application/pdf": [],
    "application/msword": [],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      [],
  },
  maxSize = 2 * 1024 * 1024,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const removeFile = () => {
    setSelectedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center bg-[#F7F8FA] px-6 py-12 border-2 border-dashed border-[#D0D5DD] rounded-[16px] cursor-pointer hover:border-blue-500 transition"
    >
      <input {...getInputProps()} />
      <div className="text-center">
        {!selectedFile ? (
          <>
            <div className="h-10 w-10 rounded-full mx-auto bg-white flex items-center justify-center mb-2">
              <DownloadProof />
            </div>
            {isDragActive ? (
              <p className="text-deepBlue">Drop the file here...</p>
            ) : (
              <p className="text-sm">
                <span className="text-deepBlue font-medium text-sm">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
            )}
            <p className="text-darkGrey text-sm">
              SVG, PNG, JPG or GIF (max: {maxSize / 1024 / 1024}MB)
            </p>
          </>
        ) : (
          <div className="mt-4 w-full flex flex-col items-center">
            {selectedFile.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{selectedFile.name}</p>
            )}
            <button
              onClick={removeFile}
              className="mt-2 text-red-500 flex items-center space-x-1"
            >
              <XCircleIcon className="w-5 h-5" />
              <span>Remove</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
