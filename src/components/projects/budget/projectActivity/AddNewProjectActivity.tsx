import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import useCreateProjectActivity from "@/hooks/api/mutation/project/budget/workStage/projectActivity/useCreateProjectActivity";

import { QUERY_KEY_WORKSTAGEBYID } from "@/hooks/api/queries/projects/budget/workStage/useGetWorkStageById";

import { useIdStore } from "@/store/IdStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type TypeProps = {
  handleModalClose: () => void;
  defaultValues?: any;
  isEditMode?: boolean;
};
const AddNewProjectActivity = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: TypeProps) => {
  const { id } = useParams<{ id: string }>();

  const { budgetId, projectId } = useIdStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState("");

  const queryClient = useQueryClient();
  const { mutate: createProjectActivity, isPending: ActivityPending } =
    useCreateProjectActivity();

  // const { mutate: updateProjectLabor, isPending: isUpdating } =
  //   useUpdateProjectLabor();

  const handleSubmit = () => {
    const payload = {
      workStageId: id,
      projectId,
      budgetId,
      name: title,
      description,
      startDate: startDate?.toISOString(),
      endDate: new Date(endDate).toISOString(),
    };

    // if (isEditMode && defaultValues?._id) {
    //   updateProjectLabor(
    //     { ...payload, id: defaultValues._id },
    //     {
    //       onSuccess: (response: any) => {
    //         toast.success(response?.data?.message || "edited successfully");
    //         queryClient.invalidateQueries({
    //           queryKey: [QUERY_KEY_WORKSTAGEBYID],
    //         });
    //         handleModalClose();
    //       },
    //       onError: (error: any) => {
    //         toast.error(
    //           error?.response?.data?.message || "Error updating labor"
    //         );
    //       },
    //     }
    //   );
    // } else {
    createProjectActivity(payload, {
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
    // }
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
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="flex gap-3 items-center justify-center mt-4">
        <ButtonComp
          onClick={handleSubmit}
          text={ActivityPending ? "saving.." : "Save"}
          // text={
          //   isEditMode
          //     ? isUpdating
          //       ? "Updating..."
          //       : "Update"
          //     : laborPending
          //     ? "saving..."
          //     : "Save"
          // }
        />
      </div>
    </section>
  );
};

export default AddNewProjectActivity;
