import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import useMultipleFileUpload from "@/hooks/api/mutation/imageUploads/useMultipleFileUpload";
import useCreatePaymentSchedule from "@/hooks/api/mutation/project/paymentSchedules/useCreatePaymentSchedule";
import useUpdatePaymentSchedule from "@/hooks/api/mutation/project/paymentSchedules/useUpdatePaymentSchedule";
import useGetContractor from "@/hooks/api/queries/contractor/getContractor";
import {
  PaymentScheduleType,
  QUERY_KEY_PAYMENTSCHEDULE,
} from "@/hooks/api/queries/projects/paymentSchedule/getPaymentSchedule";
import { useAuthStore } from "@/store/authStore";
import { paymentMethod, paymentType, scheduleType } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface FormData {
  contractor: string;
  description: string;
  amountDue: number;
  dateDue: Date | null;
  paymentSchedule: string;
  amountPaid: number;
  actualDate: Date | null;
  paymentMethod: string;
  paymentPlan: string;
  expenseType: string;
  file: File | null;
  // note: string;
}
const NewPaymentModal = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: {
  handleModalClose: () => void;
  defaultValues?: PaymentScheduleType;
  isEditMode?: boolean;
}) => {
  const { id } = useParams<{ id: string }>();

  const { currentUser } = useAuthStore();
  const [formData, setFormData] = useState<FormData>({
    contractor: defaultValues?.contractorId?._id || "",
    description: defaultValues?.description || "",
    amountDue: defaultValues?.amount || 0,
    dateDue: defaultValues?.datePaid ? new Date(defaultValues.datePaid) : null,
    paymentSchedule: "",
    amountPaid: 0,
    actualDate: null,
    paymentMethod: defaultValues?.paymentMethod || "",
    paymentPlan: defaultValues?.paymentType || "",
    expenseType: "",
    file: null,
    // note: "This is just a sample note that can be anything like comment/payments",
  });

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { data: contractor, isPending } = useGetContractor(
    currentUser?.companyId ?? ""
  );
  const { mutate: uploadImage } = useMultipleFileUpload();

  const handleFileChange = (file: File | null, name: string) => {
    console.log("Uploaded file for", name, ":", file);
    setFormData((prev) => ({ ...prev, [name]: file }));

    // Upload new file
    const formData = new FormData();
    if (file) {
      formData.append("files", file);
    }
    uploadImage(
      { formData },
      {
        onSuccess: (response: any) => {
          setFormData((prevFiles: any) => ({
            ...prevFiles,
            [name]: response?.data?.urls[0],
          }));
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
  const { mutate: createPaymentSchedule, isPending: isCreating } =
    useCreatePaymentSchedule();

  const { mutate: updateAction, isPending: isUpdating } =
    useUpdatePaymentSchedule();

  const handleSave = () => {
    const payload = {
      projectId: id ?? "",
      contractorId: formData?.contractor,
      amountPaid: formData.amountPaid,
      amount: formData.amountDue,
      datePaid: formData?.actualDate?.toISOString(),
      paymentSchedule: formData?.paymentSchedule,
      paymentMethod: formData?.paymentMethod,
      paymentType: formData?.paymentPlan,
      paymentFLow: "out_bound",
      expenseType: formData?.expenseType,
      paymentProof: formData?.file,
      dateDue: formData?.dateDue,
      description: formData.description,
    };

    if (isEditMode && defaultValues?._id) {
      updateAction(
        { ...payload, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_PAYMENTSCHEDULE],
            });
            handleModalClose();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Error updating payment schedule"
            );
          },
        }
      );
    } else {
      createPaymentSchedule(payload, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "payment schedule added successfully"
          );
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_PAYMENTSCHEDULE],
          });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating payment schedule"
          );
        },
      });
    }
  };

  if (isPending) {
    return <div className="h-[70vh] text-center">Loading...</div>;
  }

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-grey">Contractor/Vendor</p>
        <ReusableSelect
          className="my-4"
          placeholder="Contractor/Vendor"
          onValueChange={(value) => handleInputChange("contractor", value)}
          // options={contractor?.data?.map((item) => ({
          //   label: item?.firstName,
          //   value: item?._id,
          // }))}
          defaultValue={formData?.contractor}
          options={contractor?.data?.map((item) => ({
            label: item.firstName,
            value: item._id,
          }))}
        />
      </div>
      <TextAreaField
        label="Description of Work or Material"
        name="description"
        rows={2}
        placeholder="Type in description"
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="number"
          label="Amount for Payment Due"
          name="amountDue"
          placeholder="amount"
          value={formData.amountDue}
          onChange={(e) =>
            handleInputChange("amountDue", Number(e.target.value))
          }
        />
        <InputField
          type="date"
          label="Due Date for Payment"
          name="dateDue"
          placeholder="Due date"
          value={
            formData.dateDue ? formData.dateDue.toISOString().split("T")[0] : ""
          }
          onChange={(e) =>
            handleInputChange("dateDue", new Date(e.target.value))
          }
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">
          Type of Payment Schedule
        </p>
        <ReusableSelect
          className="my-4"
          placeholder="Type of Payment Schedule"
          onValueChange={(value) => handleInputChange("paymentSchedule", value)}
          options={[
            { label: scheduleType.completion, value: scheduleType.completion },
            { label: scheduleType.progress, value: scheduleType?.progress },
            { label: scheduleType.time_based, value: scheduleType?.time_based },
          ]}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Type of Payment</p>
        <ReusableSelect
          className="my-4"
          placeholder="Type of Payment plan"
          onValueChange={(value) => handleInputChange("paymentPlan", value)}
          options={[
            { label: paymentType.one_off, value: paymentType.one_off },
            { label: paymentType.installment, value: paymentType?.installment },
          ]}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="number"
          label="Amount Paid"
          name="amountPaid"
          placeholder="amount"
          value={formData.amountPaid}
          onChange={(e) =>
            handleInputChange("amountPaid", Number(e.target.value))
          }
        />
        <InputField
          type="date"
          label="Actual Payment Date"
          name="actualDate"
          placeholder="Actual Date"
          value={
            formData.actualDate
              ? formData.actualDate.toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            handleInputChange("actualDate", new Date(e.target.value))
          }
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <div>
          <p className="text-sm font-semibold text-grey">Payment Method</p>
          <ReusableSelect
            className="my-4"
            defaultValue={formData?.paymentMethod}
            placeholder="Payment Method"
            onValueChange={(value) => handleInputChange("paymentMethod", value)}
            options={[
              { label: paymentMethod.bank, value: paymentMethod.bank },
              { label: paymentMethod.card, value: paymentMethod?.card },
              { label: paymentMethod.transfer, value: paymentMethod?.transfer },
            ]}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-grey">Expense Type</p>
          <ReusableSelect
            className="my-4"
            placeholder="Expense Type"
            onValueChange={(value) => handleInputChange("expenseType", value)}
            options={[
              { label: "material", value: "material" },
              { label: "labor", value: "labor" },
            ]}
          />
        </div>
      </div>
      <UploadImg
        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        name="file"
        onFileChange={(file) => handleFileChange(file, "file")}
      />
      {/* <TextAreaField
        label="Note"
        readOnly
        name="note"
        rows={2}
        value={formData.note}
      /> */}
      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp
          text={
            isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update"
              : isCreating
              ? "saving..."
              : "Save"
          }
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default NewPaymentModal;
