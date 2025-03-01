import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import { useState } from "react";

const AddClient = () => {
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
      <UploadImg name="clientIcon" onFileChange={handleFileChange} />
      <InputField
        type="text"
        label="Client Name"
        name="ClientName"
        placeholder="Add Client Name"
      />
      <InputField
        type="text"
        label="Client Address"
        name="ClientAddress"
        placeholder="Add Client Address"
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="text"
          label="Phone Number"
          name="phone"
          placeholder="Add Phone Number "
        />
        <InputField
          type="email"
          label="Email Address"
          name="Email"
          placeholder="Add Email Address"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Client Type</p>
        <ReusableSelect
          className="my-4"
          placeholder="Client Type"
          options={[
            { label: "individual", value: "individual" },
            { label: "company", value: "company" },
          ]}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField type="date" label="Birth date" name="Birth" />
        <InputField
          type="text"
          label="Occupation"
          name="Occupation"
          placeholder="Add Occupation"
        />
      </div>
      <InputField type="date" label="Date of Entry" name="dateOfEntry" />
      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp text="Save" />
      </div>
    </div>
  );
};

export default AddClient;
