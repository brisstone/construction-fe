import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import ButtonComp from "../general/ButtonComp";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useDeleteClient from "@/hooks/api/mutation/clients/useDeleteClient";
import { QUERY_KEY_CLIENTS } from "@/hooks/api/queries/clients/getClients";

const DeleteClientModal = ({
  setDeleteClient,
  selectedClient,
}: {
  setDeleteClient: (value: boolean) => void;
  selectedClient: string;
}) => {
  const { mutate: DeleteClient, isPending } = useDeleteClient();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteClient(
      { id: selectedClient },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted clients");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CLIENTS] });
          setDeleteClient(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting clients"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Client Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteClient(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete Client"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteClientModal;
