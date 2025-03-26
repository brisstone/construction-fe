import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import ButtonComp from "../general/ButtonComp";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEY_CONTRACTOR } from "@/hooks/api/queries/contractor/getContractor";
import useDeleteContractor from "@/hooks/api/mutation/contractor/useDeleteContractor";

const DeleteContractorModal = ({
  setDeleteContractor,
  selectedContractor,
}: {
  setDeleteContractor: (value: boolean) => void;
  selectedContractor: string;
}) => {
  const { mutate: DeleteContractor, isPending } = useDeleteContractor();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteContractor(
      { id: selectedContractor },
      {
        onSuccess: (response: any) => {
          toast.success(response?.data?.message || "Deleted Contractor");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CONTRACTOR] });
          setDeleteContractor(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting Contractor"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Contractor Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteContractor(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete Contractor"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteContractorModal;
