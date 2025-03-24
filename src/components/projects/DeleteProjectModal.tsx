import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import ButtonComp from "../general/ButtonComp";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEY_PROJECT } from "@/hooks/api/queries/projects/getProject";
import useDeleteProject from "@/hooks/api/mutation/project/useDeleteProject";

const DeleteProjectModal = ({
  setDeleteProject,
  selectedProject,
}: {
  setDeleteProject: (value: boolean) => void;
  selectedProject: string;
}) => {
  const { mutate: DeleteProj, isPending } = useDeleteProject();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteProj(
      { id: selectedProject },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted projects");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROJECT] });
          setDeleteProject(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting projects"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete projects Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteProject(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete Project"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteProjectModal;
