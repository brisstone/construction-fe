import { AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ButtonComp from "@/components/general/ButtonComp";
import useDeleteProjectActivity from "@/hooks/api/mutation/project/budget/workStage/projectActivity/useDeleteProjectActivity";
import { QUERY_KEY_PROJACTIVITY } from "@/hooks/api/queries/projects/budget/workStage/projectActivity/getProjectActivity";

const DeleteProjectActivityModal = ({
  setDeleteProjectActivity,
  selectedProjectActivity,
}: {
  setDeleteProjectActivity: (value: boolean) => void;
  selectedProjectActivity: string;
}) => {
  const { mutate: DeleteProjectActivity, isPending } =
    useDeleteProjectActivity();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteProjectActivity(
      { id: selectedProjectActivity },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted  Project Activity");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_PROJACTIVITY],
          });
          setDeleteProjectActivity(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting  Project Activity"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Project Activity Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteProjectActivity(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete  Project Activity"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteProjectActivityModal;
