import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import useCreateProjectLabor from "@/hooks/api/mutation/project/budget/workStage/projectLabor/useCreateProjectLabor";
import useUpdateProjectLabor from "@/hooks/api/mutation/project/budget/workStage/projectLabor/useUpdateProjectLabor";
import { ProjectLaborType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
import { QUERY_KEY_WORKSTAGEBYID } from "@/hooks/api/queries/projects/budget/workStage/useGetWorkStageById";
import useGetLabor from "@/hooks/api/queries/settings/labor/getLabor";
import useGetUnit from "@/hooks/api/queries/settings/unit/getUnit";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type TypeProps = {
  budgetId: string;
  projectId: string;
  handleModalClose: () => void;
  defaultValues?: ProjectLaborType;
  isEditMode?: boolean;
};
const AddNewLabour = ({
  handleModalClose,
  defaultValues,
  budgetId,
  projectId,
  isEditMode,
}: TypeProps) => {
  const { id } = useParams<{ id: string }>();
  const [selectLabour, setSelectLabour] = useState(
    defaultValues?.laborId?._id || ""
  );
  const [selectUnit, setSelectUnit] = useState(
    defaultValues?.unitId?._id || ""
  );
  const [qty, setQty] = useState(defaultValues?.quantity || 1);
  const [price, setPrice] = useState(defaultValues?.rate || 0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(qty * price);
  }, [qty, price]);

  const { currentUser } = useAuthStore();

  const { data: Labor, isPending } = useGetLabor(currentUser?.companyId || "");

  const { data: unit, isPending: unitPend } = useGetUnit(
    currentUser?.companyId || ""
  );

  const queryClient = useQueryClient();
  const { mutate: createProjectLabor, isPending: laborPending } =
    useCreateProjectLabor();

  const { mutate: updateProjectLabor, isPending: isUpdating } =
    useUpdateProjectLabor();

  const handleSubmit = () => {
    const payload = {
      workStageId: id,
      projectId,
      budgetId,
      laborId: selectLabour,
      unitId: selectUnit,
      quantity: qty,
      rate: price,
    };

    if (isEditMode && defaultValues?._id) {
      updateProjectLabor(
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
              error?.response?.data?.message || "Error updating labor"
            );
          },
        }
      );
    } else {
      createProjectLabor(payload, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "project labor added successfully"
          );
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_WORKSTAGEBYID],
          });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating project labor "
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
        <p className="text-sm font-semibold text-grey">Labour Activity</p>
        <ReusableSelect
          className="my-4"
          defaultValue={selectLabour}
          placeholder="Labour Activity"
          onValueChange={setSelectLabour}
          options={
            Labor?.data?.map((item) => ({
              label: item.name,
              value: item._id,
            })) || []
          }
        />
      </div>
      <InputField
        type="number"
        label="Quantity"
        name="qty"
        placeholder="qty"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />

      <div>
        <p className="text-sm font-semibold text-grey"> Unit</p>
        <ReusableSelect
          className="my-4"
          placeholder="Unit"
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
        label="Rate (₦)"
        name="price"
        placeholder="rate"
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
              : laborPending
              ? "saving..."
              : "Save"
          }
        />
      </div>
    </section>
  );
};

export default AddNewLabour;
