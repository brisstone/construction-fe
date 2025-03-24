import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import SearchableSelect from "@/components/general/SearchableSelect";
import InputField from "@/components/input/InputField";
import useCreateProjectMaterial from "@/hooks/api/mutation/project/budget/workStage/projectMaterial/useCreateProjectMat";
import useUpdateProjectMaterial from "@/hooks/api/mutation/project/budget/workStage/projectMaterial/useUpdateProjectMat";
import { ProjectMaterialType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
import { QUERY_KEY_WORKSTAGEBYID } from "@/hooks/api/queries/projects/budget/workStage/useGetWorkStageById";
import useGetMaterial from "@/hooks/api/queries/settings/material/getMaterial";
import useGetUnit from "@/hooks/api/queries/settings/unit/getUnit";
import { useAuthStore } from "@/store/authStore";
import { materialTypes } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type TypeProps = {
  budgetId: string;
  projectId: string;
  handleModalClose: () => void;
  defaultValues?: ProjectMaterialType;
  isEditMode?: boolean;
};

const AddNewMaterial = ({
  handleModalClose,
  defaultValues,
  budgetId,
  projectId,
  isEditMode,
}: TypeProps) => {
  const { id } = useParams<{ id: string }>();

  const [selectUnit, setSelectUnit] = useState(
    defaultValues?.unitId?._id || ""
  );
  const [selectMaterialType, setSelectMaterialType] = useState(defaultValues?.materialType || "");
  const [selectMaterial, setSelectMaterial] = useState(
    defaultValues?.materialId?._id || ""
  );
  const [qty, setQty] = useState(defaultValues?.quantity || 1);
  const [price, setPrice] = useState(defaultValues?.rate || 0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(qty * price);
  }, [qty, price]);

  const { currentUser } = useAuthStore();

  const { data: materialData, isPending } = useGetMaterial(
    currentUser?.companyId || ""
  );

  const materialTypeOptions = materialTypes.map((material) => ({
    value: material.toLowerCase().replace(/\s+/g, "-"),
    label: material,
  }));

  const { data: unit, isPending: unitPend } = useGetUnit(
    currentUser?.companyId || ""
  );

  const queryClient = useQueryClient();
  const { mutate: createProjectMat, isPending: MatPending } =
    useCreateProjectMaterial();

  const { mutate: updateProjectMat, isPending: isUpdating } =
    useUpdateProjectMaterial();

  const handleSubmit = () => {
    const payload = {
      workStageId: id,
      projectId,
      budgetId,
      materialId: selectMaterial,
      unitId: selectUnit,
      materialType: selectMaterialType,
      quantity: qty,
      rate: price,
    };

    if (isEditMode && defaultValues?._id) {
      updateProjectMat(
        { ...payload, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_WORKSTAGEBYID],
            });
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
      createProjectMat(payload, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "project material added successfully"
          );
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_WORKSTAGEBYID],
          });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating project material "
          );
        },
      });
    }
  };

  if (isPending || unitPend) {
    return <p className="text-center my-3">Loading...</p>;
  }

  return (
    <section>
      <div>
        <p className="text-sm font-semibold text-grey">Material</p>
        <ReusableSelect
          className="my-4"
          placeholder="Material"
          defaultValue={selectMaterial}
          onValueChange={setSelectMaterial}
          options={materialData?.data?.map((item) => ({
            label: item.name,
            value: item._id,
          }))}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Material Type</p>
        <SearchableSelect
          className="my-3 "
          placeholder="Material Type"
          options={materialTypeOptions}
          defaultValue={selectMaterialType}
          onValueChange={(value) => setSelectMaterialType(value || "")}
        />
        {/* <ReusableSelect
          className="my-4"
          placeholder="Material Type"
          onValueChange={setSelectMaterial}
          options={[
            { label: "Y20MM", value: "Y20MM" },
            { label: "111mm", value: "111mm" },
          ]}
        /> */}
      </div>
      <InputField
        type="number"
        label="Total Quantity"
        name="qty"
        placeholder="qty"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <div>
        <p className="text-sm font-semibold text-grey">Material Unit</p>
        <ReusableSelect
          className="my-4"
          placeholder="Material Unit"
          defaultValue={selectUnit}
          onValueChange={setSelectUnit}
          options={
            unit?.data?.map((item) => ({
              label: item.name,
              value: item._id,
            })) || []
          }
        />
      </div>
      <InputField
        type="number"
        label="Market Price"
        name="price"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <aside className="flex border justify-between w-1/2 mx-auto p-4 rounded-[4px]">
        <h3 className="font-bold">Total Cost (₦): </h3>
        <p>{totalCost}</p>
      </aside>
      <div className="flex gap-3 items-center justify-center mt-4">
        <ButtonComp
          onClick={handleSubmit}
          text={
            isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update"
              : MatPending
              ? "saving..."
              : "Save"
          }
        />
      </div>
    </section>
  );
};

export default AddNewMaterial;
