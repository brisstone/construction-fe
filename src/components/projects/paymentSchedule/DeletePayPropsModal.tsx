import { AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ButtonComp from "@/components/general/ButtonComp";
import useDeletePaymentSchedule from "@/hooks/api/mutation/project/paymentSchedules/useDeletePaymentSchedule";
import { QUERY_KEY_PAYMENTSCHEDULE } from "@/hooks/api/queries/projects/paymentSchedule/getPaymentSchedule";

const DeletePayPropsModal = ({
  setDeletePayProps,
  selectedPayProps,
}: {
  setDeletePayProps: (value: boolean) => void;
  selectedPayProps: string;
}) => {
  const { mutate: DeleteAction, isPending } = useDeletePaymentSchedule();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    DeleteAction(
      { id: selectedPayProps },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.data?.message || "Deleted payment");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_PAYMENTSCHEDULE],
          });
          setDeletePayProps(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error deleting payment"
          );
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Payment Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <Button
          onClick={() => setDeletePayProps(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </Button>
        <ButtonComp
          onClick={onSubmit}
          text={isPending ? "Deleting..." : "Delete payment"}
          className="bg-red-700 w-fit"
        />
      </div>
    </div>
  );
};

export default DeletePayPropsModal;
