import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";
import useCreateUnit from "@/hooks/api/mutation/settings/unit/useCreateUnit";
import useUpdateUnit from "@/hooks/api/mutation/settings/unit/useUpdateUnit";
import {
  QUERY_KEY_UNIT,
  UnitType,
} from "@/hooks/api/queries/settings/unit/getUnit";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type UnitTypeProps = {
  handleModalClose: () => void;
  defaultValues?: UnitType;
  isEditMode?: boolean;
};

const AddUnit = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: UnitTypeProps) => {
  const [unitName, setUnitName] = useState(defaultValues?.name || "");

  const { mutate: createUnit, isPending: isCreating } = useCreateUnit();
  const { mutate: updateUnit, isPending: isUpdating } = useUpdateUnit();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    const data = {
      name: unitName,
    };

    if (isEditMode && defaultValues?._id) {
      updateUnit(
        { ...data, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_UNIT] });
            handleModalClose();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Error updating unit"
            );
          },
        }
      );
    } else {
      createUnit(data, {
        onSuccess: (response: any) => {
          toast.success(response?.data?.message || "unit added successfully");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_UNIT] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Error creating unit");
        },
      });
    }
  };

  return (
    <div>
      <InputField
        type="text"
        onChange={(e) => setUnitName(e.target.value)}
        value={unitName}
        label="New Units"
        name="Units"
        placeholder="add Units"
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
              : "Save"
          }
          className=""
        />
      </div>
    </div>
  );
};

export default AddUnit;
