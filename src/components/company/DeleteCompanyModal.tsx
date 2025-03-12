import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import ButtonComp from "../general/ButtonComp";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEY_COMPANY } from "@/hooks/api/queries/company/getCompany";
import useDeleteCompany from "@/hooks/api/mutation/company/useDeleteCompany";

const DeleteCompanyModal = ({
  setDeleteCompany,
  selectedCompany,
}: {
  setDeleteCompany: (value: boolean) => void;
  selectedCompany: string;
}) => {
  const { mutate: DeleteComp, isPending } = useDeleteCompany();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteComp(
      { id: selectedCompany },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted Company");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_COMPANY] });
          setDeleteCompany(false);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Error deleting Company");
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Company Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteCompany(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete Company"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteCompanyModal;
