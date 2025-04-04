import { useState } from "react";
import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import FileUpload from "../general/FileDrags";
import useMultipleFileUpload from "@/hooks/api/mutation/imageUploads/useMultipleFileUpload";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useCreatePaymentProperty from "@/hooks/api/mutation/project/property/useCreatePaymentProperty";
import {
  PaymentPropertyData,
  QUERY_KEY_PAYMENTPROPERTY,
} from "@/hooks/api/queries/projects/property/getPaymentProperty";
import { QUERY_KEY_PAYMENTPROJECT } from "@/hooks/api/queries/projects/paymentSchedule/getPaymentProject";
import { QUERY_KEY_SINGLEPAYMENTSCHEDULE } from "@/hooks/api/queries/projects/paymentSchedule/getSinglePaymentSchedule";
import useUpdatePaymentProperty from "@/hooks/api/mutation/project/property/useUpdatePaymentProperty";

type TypeProps = {
  handleModalClose: () => void;
  projectId?: string;
  propertyId?: string;
  clientId?: string;
  contractorId?: string;
  schedulePay?: boolean;
  scheduleId?: string;
  params?: Record<string, any>;
  balance?: number;
  defaultValues?: PaymentPropertyData;
  isEditMode?: boolean;
};

const AddPayment = ({
  handleModalClose,
  defaultValues,
  projectId,
  isEditMode,
  propertyId,
  clientId,
  contractorId,
  schedulePay = false,
  scheduleId,
  params,
  balance,
}: TypeProps) => {
  const [paymentTitle, setPaymentTitle] = useState(defaultValues?.name || "");
  const [amountPaid, setAmountPaid] = useState(
    defaultValues?.amount || balance
  );
  const [payDate, setPayDate] = useState<Date | null>(
    defaultValues?.datePaid ? new Date(defaultValues.datePaid) : null
  );
  const [paymentMethod, setPaymentMethod] = useState(
    defaultValues?.paymentMethod || ""
  );
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);

  const { mutate: uploadImage } = useMultipleFileUpload();

  const handleFileChange = (file: File) => {
    setProofOfPayment(file);

    // Upload new file
    const formData = new FormData();
    if (file) {
      formData.append("files", file);
    }
    uploadImage(
      { formData },
      {
        onSuccess: (response: any) => {
          setProofOfPayment(response?.data?.urls[0]);
          toast.success("Image uploaded successfully");
          // Handle the response, e.g., save the URL to state
        },
        onError: (error: any) => {
          toast.error(error?.data?.message || "No Uploaded file");
        },
      }
    );
  };

  const queryClient = useQueryClient();
  const { mutate: createPaymentProperty, isPending: isCreating } =
    useCreatePaymentProperty();

  const { mutate: updatePaymentProperty, isPending: isUpdating } =
    useUpdatePaymentProperty();

  const handleSave = () => {
    const payload = schedulePay
      ? {
          name: paymentTitle,
          projectId,
          contractorId,
          amount: amountPaid,
          datePaid: payDate?.toISOString(),
          paymentMethod,
          paymentFLow: "out_bound",
          paymentProof: proofOfPayment,
          paymentScheduleId: scheduleId,
        }
      : {
          name: paymentTitle,
          projectId,
          propertyId,
          clientId,
          amount: amountPaid,
          datePaid: payDate?.toISOString(),
          paymentMethod,
          paymentFLow: "in_bound",
          paymentProof: proofOfPayment,
        };

    if (isEditMode && defaultValues?._id) {
      updatePaymentProperty(
        { ...payload, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_PAYMENTPROPERTY],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_PAYMENTPROJECT],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_PAYMENTPROJECT, params, scheduleId],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_SINGLEPAYMENTSCHEDULE, params, scheduleId],
            });
            handleModalClose();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message ||
                "Error updating payment property"
            );
          },
        }
      );
    } else {
      createPaymentProperty(payload, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "property payment added successfully"
          );
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_PAYMENTPROPERTY],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_PAYMENTPROJECT],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_PAYMENTPROJECT, params, scheduleId],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_SINGLEPAYMENTSCHEDULE, params, scheduleId],
          });

          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating property payment"
          );
        },
      });
    }
  };

  return (
    <div>
      <InputField
        type="text"
        label="Payment Name"
        name="paymentTitle"
        placeholder="payment title"
        value={paymentTitle}
        onChange={(e) => setPaymentTitle(e.target.value)}
      />
      <InputField
        type="text"
        label="Amount Paid"
        name="amountPaid"
        placeholder="N"
        value={amountPaid}
        onChange={(e) => setAmountPaid(Number(e.target.value))}
      />
      <InputField
        type="date"
        label="Payment Date"
        name="payDate"
        value={payDate ? payDate.toISOString().split("T")[0] : ""}
        onChange={(e) => setPayDate(new Date(e.target.value))}
      />
      <div>
        <p className="text-sm font-semibold text-grey">Type of Payment</p>
        <ReusableSelect
          className="my-4"
          placeholder="Payment Method"
          options={[
            { label: "bank", value: "bank" },
            { label: "card", value: "card" },
            { label: "transfer", value: "transfer" },
          ]}
          defaultValue={paymentMethod}
          onValueChange={setPaymentMethod}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey mb-2">Proof of Payment</p>
        <FileUpload onFileUpload={(file) => handleFileChange(file)} />
      </div>

      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp
          text={
            isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update"
              : isCreating
              ? "saving..."
              : "Save Property"
          }
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default AddPayment;
