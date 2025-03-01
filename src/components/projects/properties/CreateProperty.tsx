import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import { useState } from "react";

const CreateProperty = () => {
  const [files, setFiles] = useState<any>({
    amenityIcon: null,
  });

  console.log(files, "files");

  const handleFileChange = (file: File | null, name: string) => {
    console.log("File received:", file, "for", name);

    setFiles((prevFiles: any) => ({ ...prevFiles, [name]: file }));
  };

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-grey">Upload Property Photo</p>
        <UploadImg name="clientIcon" onFileChange={handleFileChange} />
      </div>
      <InputField
        type="text"
        label="Property Name/Number"
        name="propertyName"
        placeholder="Mabushi Project Phase 1/A05"
      />
      <TextAreaField
        label="Property Description"
        name="description"
        rows={2}
        placeholder="5 Bedroom Stand-alone Duplex with BQ (House A05)"
      />
      <div>
        <p className="text-sm font-semibold text-grey mb-2">Dwelling Type:</p>
        <aside className="flex gap-3 items-center">
          <div className="flex gap-3 items-center">
            <input className="h-4 w-4" type="radio" name="single" id="single" />
            <label htmlFor="single">Single</label>
          </div>
          <div className="flex gap-3 items-center">
            <input className="h-4 w-4" type="radio" name="multi" id="multi" />
            <label htmlFor="multi">Multi-Storey</label>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CreateProperty;
