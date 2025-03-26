import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import useCreateProjectActivity from "@/hooks/api/mutation/project/budget/workStage/projectActivity/useCreateProjectActivity";
import useUpdateProjectActivity from "@/hooks/api/mutation/project/budget/workStage/projectActivity/useUpdateProjectActivity";
import {
  ProjectActType,
  QUERY_KEY_PROJACTIVITY,
} from "@/hooks/api/queries/projects/budget/workStage/projectActivity/getProjectActivity";


import { useIdStore } from "@/store/IdStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type TypeProps = {
  handleModalClose: () => void;
  defaultValues?: ProjectActType;
  isEditMode?: boolean;
};
const AddNewProjectActivity = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: TypeProps) => {
  const { id } = useParams<{ id: string }>();

  const { budgetId, projectId } = useIdStore();
  const [title, setTitle] = useState(defaultValues?.name || "");
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );
  const [startDate, setStartDate] = useState<Date | null>(
    defaultValues?.startDate ? new Date(defaultValues.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    defaultValues?.endDate ? new Date(defaultValues.endDate) : null
  );

  const queryClient = useQueryClient();
  const { mutate: createProjectActivity, isPending: ActivityPending } =
    useCreateProjectActivity();

  const { mutate: updateProjectActivity, isPending: isUpdating } =
    useUpdateProjectActivity();

  const handleSubmit = () => {
    const payload = {
      workStageId: id,
      projectId,
      budgetId,
      name: title,
      description,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };

    if (isEditMode && defaultValues?._id) {
      updateProjectActivity(
        { ...payload, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_PROJACTIVITY],
            });
            handleModalClose();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Error updating activity"
            );
          },
        }
      );
    } else {
      createProjectActivity(payload, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "project activity added successfully"
          );
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_PROJACTIVITY],
          });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating project activity "
          );
        },
      });
    }
  };

  return (
    <section>
      <InputField
        type="text"
        label="Activity Title"
        name="activityTitle"
        placeholder="Type the Activity title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextAreaField
        label="Activity Description"
        name="description"
        rows={2}
        placeholder="Type in description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        <InputField
          type="date"
          label="Start Date"
          name="startDate"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        <InputField
          type="date"
          label="End Date"
          name="endDate"
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
      </div>
      <div className="flex gap-3 items-center justify-center mt-4">
        <ButtonComp
          onClick={handleSubmit}
          // text={ActivityPending ? "saving.." : "Save"}
          text={
            isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update"
              : ActivityPending
              ? "saving..."
              : "Save"
          }
        />
      </div>
    </section>
  );
};

export default AddNewProjectActivity;
