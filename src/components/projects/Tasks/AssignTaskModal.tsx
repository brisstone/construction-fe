import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import useUpdateProjectActivity from "@/hooks/api/mutation/project/budget/workStage/projectActivity/useUpdateProjectActivity";
import { QUERY_KEY_TASKACTIVITY } from "@/hooks/api/queries/tasks/getTasksActivity";
import useGetCompanyUser from "@/hooks/api/queries/user/getCompanyUser";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const AssignTaskModal = ({
  defaultId,
  handleModalClose,
}: {
  defaultId: string;
  handleModalClose: () => void;
}) => {
  const { id } = useParams<{ id: string }>();
  const [selectStatus, setSelectStatsus] = useState("");
  const [assign, setAssign] = useState("");

  const { currentUser } = useAuthStore();
  const { data: CompanyUser, isPending } = useGetCompanyUser(
    currentUser?.companyId ?? ""
  );

  const CompanyUserData = CompanyUser?.data;

 
  const queryClient = useQueryClient();

  const { mutate: updateTask, isPending: isUpdating } =
    useUpdateProjectActivity();

  const handleSubmit = () => {
    const payload = {
      status: selectStatus,
      assigneeId: assign,
      projectId: id,
    };

    updateTask(
      { ...payload, id: defaultId },
      {
        onSuccess: (response: any) => {
          toast.success(response?.data?.message || "updated");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_TASKACTIVITY],
          });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Error updating task");
        },
      }
    );
  };

   if (isPending) {
     return <div className="h-[40vh] text-center">Loading...</div>;
   }


  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-grey">Select Work Status</p>
        <ReusableSelect
          className="my-4"
          placeholder="Select Work Statsus"
          onValueChange={setSelectStatsus}
          defaultValue={selectStatus}
          options={[
            { label: "In Progress", value: "In Progress" },
            { label: "Completed", value: "Completed" },
          ]}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Assign To</p>
        <ReusableSelect
          className="my-4"
          placeholder="Assign To"
          onValueChange={setAssign}
          defaultValue={assign}
          options={CompanyUserData?.map((item) => ({
            label: item?.firstName,
            value: item?._id,
          }))}
        />
      </div>
      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp
          onClick={handleSubmit}
          text={isUpdating ? "assigning..." : "Assign Task"}
        />
      </div>
    </div>
  );
};

export default AssignTaskModal;
