import { AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEY_PROPERTY } from "@/hooks/api/queries/projects/property/getProperty";
import useDeleteProperty from "@/hooks/api/mutation/project/property/useDeleteProperty";
import { Button } from "@/components/ui/button";
import ButtonComp from "@/components/general/ButtonComp";

const DeletePropertyModal = ({
  setDeleteProperty,
  selectedProperty,
}: {
  setDeleteProperty: (value: boolean) => void;
  selectedProperty: string;
}) => {
  const { mutate: DeleteProperty, isPending } = useDeleteProperty();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteProperty(
      { id: selectedProperty },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted property");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROPERTY] });
          setDeleteProperty(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting property"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Propertys Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteProperty(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete Property"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeletePropertyModal;
