import React, { useState } from "react";
import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import FileUpload from "../general/FileDrags";
import useMultipleFileUpload from "@/hooks/api/mutation/imageUploads/useMultipleFileUpload";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useCreatePaymentProperty from "@/hooks/api/mutation/project/property/useCreatePaymentProperty";
import { QUERY_KEY_PAYMENTPROPERTY } from "@/hooks/api/queries/projects/property/getPaymentProperty";

type TypeProps = {
  handleModalClose: () => void;
  projectId: string;
  propertyId: string;
  clientId: string;
};

const AddPayment = ({
  handleModalClose,
  projectId,
  propertyId,
  clientId,
}: TypeProps) => {
  const [paymentTitle, setPaymentTitle] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const [payDate, setPayDate] = useState<Date | null>(null);
  const [paymentType, setPaymentType] = useState("");
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

  // console.log(proofOfPayment, "dddddproof")

  const queryClient = useQueryClient();
  const { mutate: createPaymentProperty, isPending: isCreating } =
    useCreatePaymentProperty();

  const handleSave = () => {
    const payload = {
      name: paymentTitle,
      projectId,
      propertyId,
      clientId,
      amount: amountPaid,
      datePaid: payDate?.toISOString(),
      paymentType,
      paymentFLow: "in_bound",
      paymentProof: proofOfPayment,
    };

    createPaymentProperty(payload, {
      onSuccess: (response: any) => {
        toast.success(
          response?.data?.message || "property payment added successfully"
        );
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_PAYMENTPROPERTY],
        });
        handleModalClose();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Error creating property payment"
        );
      },
    });
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
          placeholder="Type of Payment"
          options={[
            { label: "one_off", value: "one_off" },
            { label: "installment", value: "installment" },
          ]}
          defaultValue={paymentType}
          onValueChange={setPaymentType}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey mb-2">Proof of Payment</p>
        <FileUpload onFileUpload={(file) => handleFileChange(file)} />
      </div>

      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp
          text={isCreating ? "saving.." : "Save"}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default AddPayment;
