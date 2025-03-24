import { AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ButtonComp from "@/components/general/ButtonComp";
import { QUERY_KEY_LABOR } from "@/hooks/api/queries/settings/labor/getLabor";
import useDeleteLabor from "@/hooks/api/mutation/settings/labor/useDeleteLabor";

const DeleteLaborModal = ({
  setDeleteLabor,
  selectedLabor,
}: {
  setDeleteLabor: (value: boolean) => void;
  selectedLabor: string;
}) => {
  const { mutate: DeleteLabor, isPending } = useDeleteLabor();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteLabor(
      { id: selectedLabor },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted Labors");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_LABOR] });
          setDeleteLabor(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting Labors"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Labor Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteLabor(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete Labor"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteLaborModal;
