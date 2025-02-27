import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import { useState } from "react";

const NewPaymentModal = () => {
  const [, setSelectContractor] = useState("");

  const [files, setFiles] = useState<any>({
    companyLogo: null,
  });

  console.log(files, "files");

  const handleFileChange = (file: File | null, name: string) => {
    console.log("File received:", file, "for", name);

    setFiles((prevFiles: any) => ({ ...prevFiles, [name]: file }));
  };

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-grey">Contractor/Vendor</p>
        <ReusableSelect
          className="my-4"
          placeholder="Contactor/Vendor"
          onValueChange={setSelectContractor}
          options={[
            { label: "Berger", value: "berger" },
            { label: "Julius", value: "julius" },
          ]}
        />
      </div>
      <TextAreaField
        label="Description of Work or Material"
        name="description"
        rows={2}
        placeholder="Type in description"
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="number"
          label="Amount for Payment Due"
          name="amountDue"
          placeholder="amount"
        />
        <InputField
          type="date"
          label="Due Date for Payment"
          name="dateDue"
          placeholder="Due date"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">
          Type of Payment Schedule
        </p>
        <ReusableSelect
          className="my-4"
          placeholder="Type of Payment Schedule"
          onValueChange={setSelectContractor}
          options={[
            { label: "Deposit", value: "Deposit" },
            { label: "Completion", value: "Completion" },
          ]}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="number"
          label="Amount Paid"
          name="amountpaid"
          placeholder="amount"
        />
        <InputField
          type="date"
          label="Actual Payment  Date"
          name="actualDate"
          placeholder="Actual Date"
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <div>
          <p className="text-sm font-semibold text-grey">Payment Method</p>
          <ReusableSelect
            className="my-4"
            placeholder="Payment Method"
            onValueChange={setSelectContractor}
            options={[
              { label: "Transfer", value: "Transfer" },
              { label: "Cash", value: "Cash" },
            ]}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-grey">Expense Type</p>
          <ReusableSelect
            className="my-4"
            placeholder="Expense Type"
            onValueChange={setSelectContractor}
            options={[
              { label: "Bal Payment", value: "Bal Payment" },
              { label: "Miscellanous", value: "Miscellanous" },
            ]}
          />
        </div>
      </div>
      <UploadImg  accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" name="file" onFileChange={handleFileChange} />
      <TextAreaField
        label="Note"
        readOnly
        name="note"
        rows={2}
        value={
          "This isi just a sample not that can be anything liek comment/ payments"
        }
      />
      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp text="Save" />
      </div>
    </div>
  );
};

export default NewPaymentModal;
