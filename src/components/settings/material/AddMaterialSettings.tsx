import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";
import useCreatematerials from "@/hooks/api/mutation/settings/material/useCreateMaterial";
import useUpdateMaterial from "@/hooks/api/mutation/settings/material/useUpdateMaterial";
import {
  MaterialType,
  QUERY_KEY_MATERIAL,
} from "@/hooks/api/queries/settings/material/getMaterial";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type MaterialTypeProps = {
  handleModalClose: () => void;
  defaultValues?: MaterialType;
  isEditMode?: boolean;
};

const AddMaterialSettings = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: MaterialTypeProps) => {
  const [materialName, setMaterialName] = useState(defaultValues?.name || "");

  const { mutate: createMat, isPending: isCreating } = useCreatematerials();
  const { mutate: updateMat, isPending: isUpdating } = useUpdateMaterial();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    const data = {
      name: materialName,
    };

    if (isEditMode && defaultValues?._id) {
      updateMat(
        { ...data, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_MATERIAL] });
            handleModalClose();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Error updating material"
            );
          },
        }
      );
    } else {
      createMat(data, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "material added successfully"
          );
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_MATERIAL] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating material"
          );
        },
      });
    }
  };

  return (
    <div>
      <InputField
        type="text"
        value={materialName}
        onChange={(e) => setMaterialName(e.target.value)}
        label="Add material"
        name="material"
        placeholder="add material"
      />
      <div className="flex gap-3 items-center justify-center mt-4">
        <ButtonComp
          onClick={onSubmit}
          text={
            isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update"
              : isCreating
              ? "saving..."
              : "Create"
          }
          // text="Save"
          className=""
        />
      </div>
    </div>
  );
};

export default AddMaterialSettings;
