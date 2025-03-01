import ButtonComp from "@/components/general/ButtonComp";
import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import { useState } from "react";

const AddAmenitiesSettings = () => {
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
      <InputField
        type="text"
        label="New Amenities"
        name="amenities"
        placeholder="add amenities"
      />
      <UploadImg name="amenityIcon" onFileChange={handleFileChange}/>
      <div className="flex gap-3 items-center justify-center mt-4">
        <ButtonComp text="Save" className=""/>
      </div>
    </div>
  );
};

export default AddAmenitiesSettings;
