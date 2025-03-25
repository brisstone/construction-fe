import { AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ButtonComp from "@/components/general/ButtonComp";
import { QUERY_KEY_WORKSTAGEBYID } from "@/hooks/api/queries/projects/budget/workStage/useGetWorkStageById";
import useDeleteProjectLabor from "@/hooks/api/mutation/project/budget/workStage/projectLabor/useDeleteProjectLabor";

const DeleteProjectLaborModal = ({
  setDeleteProjectLabor,
  selectedProjectLabor,
}: {
  setDeleteProjectLabor: (value: boolean) => void;
  selectedProjectLabor: string;
}) => {
  const { mutate: DeleteProjectLabor, isPending } = useDeleteProjectLabor();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteProjectLabor(
      { id: selectedProjectLabor },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted  Project Labor");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_WORKSTAGEBYID],
          });
          setDeleteProjectLabor(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting  Project Labor"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Project Labor Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteProjectLabor(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete  Project Labor"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteProjectLaborModal;
