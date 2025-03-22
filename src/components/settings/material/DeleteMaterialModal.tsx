import { AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEY_CLIENTS } from "@/hooks/api/queries/clients/getClients";
import { Button } from "@/components/ui/button";
import ButtonComp from "@/components/general/ButtonComp";
import useDeleteMaterial from "@/hooks/api/mutation/settings/material/useDeleteMaterial";
import { QUERY_KEY_MATERIAL } from "@/hooks/api/queries/settings/material/getMaterial";

const DeleteMaterialModal = ({
  setDeleteMaterial,
  selectedMaterial,
}: {
  setDeleteMaterial: (value: boolean) => void;
  selectedMaterial: string;
}) => {
  const { mutate: DeleteMaterial, isPending } = useDeleteMaterial();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteMaterial(
      { id: selectedMaterial },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted Materials");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_MATERIAL] });
          setDeleteMaterial(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting Materials"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Material Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteMaterial(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete Material"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteMaterialModal;
