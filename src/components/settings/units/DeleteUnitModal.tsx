import { AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ButtonComp from "@/components/general/ButtonComp";
import useDeleteUnit from "@/hooks/api/mutation/settings/unit/useDeleteUnit";
import { QUERY_KEY_UNIT } from "@/hooks/api/queries/settings/unit/getUnit";

const DeleteUnitModal = ({
  setDeleteUnit,
  selectedUnit,
}: {
  setDeleteUnit: (value: boolean) => void;
  selectedUnit: string;
}) => {
  const { mutate: DeleteUnit, isPending } = useDeleteUnit();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteUnit(
      { id: selectedUnit },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted Units");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_UNIT] });
          setDeleteUnit(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting Units"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Unit Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteUnit(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete Unit"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteUnitModal;
