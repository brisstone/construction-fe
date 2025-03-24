import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";
import useCreateLabor from "@/hooks/api/mutation/settings/labor/useCreateLabor";
import useUpdateLabor from "@/hooks/api/mutation/settings/labor/useUpdateLabor";
import {
  LaborType,
  QUERY_KEY_LABOR,
} from "@/hooks/api/queries/settings/labor/getLabor";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type LaborTypeProps = {
  handleModalClose: () => void;
  defaultValues?: LaborType;
  isEditMode?: boolean;
};

const AddLaborSettings = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: LaborTypeProps) => {
  const [laborName, setLaborName] = useState(defaultValues?.name || "");

  const { mutate: createLabor, isPending: isCreating } = useCreateLabor();
  const { mutate: updateLabor, isPending: isUpdating } = useUpdateLabor();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    const data = {
      name: laborName,
    };

    if (isEditMode && defaultValues?._id) {
      updateLabor(
        { ...data, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_LABOR] });
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
      createLabor(data, {
        onSuccess: (response: any) => {
          toast.success(response?.data?.message || "labor added successfully");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_LABOR] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Error creating labor");
        },
      });
    }
  };

  return (
    <div>
      <InputField
        type="text"
        value={laborName}
        onChange={(e) => setLaborName(e.target.value)}
        label="Add labor"
        name="labor"
        placeholder="add labor"
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

export default AddLaborSettings;
