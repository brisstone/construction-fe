import ButtonComp from "@/components/general/ButtonComp";
import FileUpload from "@/components/general/FileDrags";
import useCreateDocument from "@/hooks/api/mutation/document/useCreateDocument";
import useMultipleFileUpload from "@/hooks/api/mutation/imageUploads/useMultipleFileUpload";
import { QUERY_KEY_PROJDOC } from "@/hooks/api/queries/document/getProjectDocument";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type props = {
  handleModalClose: () => void;
};
const AddDocument = ({ handleModalClose }: props) => {
  const { id } = useParams();
  const [document, setDocument] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const { mutate: uploadImage } =
    useMultipleFileUpload();

  const handleFileChange = (file: File) => {
    setDocument(file);
    setFileType(file.type); // Set the file type in the state

    // Upload new file
    const formData = new FormData();
    if (file) {
      formData.append("files", file);
    }
    uploadImage(
      { formData },
      {
        onSuccess: (response: any) => {
          setDocument(response?.data?.urls[0]);
          toast.success("Image uploaded successfully");
        },
        onError: (error: any) => {
          toast.error(error?.data?.message || "No Uploaded file");
        },
      }
    );
  };

  const queryClient = useQueryClient();

  const { mutate: createDoc, isPending: isCreating } = useCreateDocument();

  const onSubmit = () => {
    const data = { type: fileType ?? "", projectId: id ?? "", url: document };

    createDoc(data, {
      onSuccess: (response: any) => {
        toast.success(response?.data?.message || "doc added successfully");
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROJDOC] });
        handleModalClose();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Error creating doc");
      },
    });
  };

  return (
    <section>
      <div>
        <p className="text-sm font-semibold text-grey my-5">Document Upload</p>
        <FileUpload onFileUpload={(file) => handleFileChange(file)} />
      </div>
      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp
          onClick={onSubmit}
          text={isCreating ? "Uploading..." : "Upload"}
          // text={isCreating ? "creating" : "Create"}
        />
      </div>
    </section>
  );
};

export default AddDocument;
