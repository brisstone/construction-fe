import { AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ButtonComp from "@/components/general/ButtonComp";
import useDeleteAmenity from "@/hooks/api/mutation/settings/amenity/useDeleteAmenity";
import { QUERY_KEY_AMENITY } from "@/hooks/api/queries/settings/amenity/getAmenity";

const DeleteAmenityModal = ({
  setDeleteAmenity,
  selectedAmenity,
}: {
  setDeleteAmenity: (value: boolean) => void;
  selectedAmenity: string;
}) => {
  const { mutate: DeleteAmenity, isPending } = useDeleteAmenity();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteAmenity(
      { id: selectedAmenity },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted Amenitys");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_AMENITY] });
          setDeleteAmenity(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting Amenitys"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Amenity Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeleteAmenity(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete Amenity"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeleteAmenityModal;
