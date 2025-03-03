import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import FileUpload from "../general/FileDrags";

const AddPayment = () => {
  return (
    <div>
      <InputField
        type="text"
        label="Amount Paid"
        name="amountPaid"
        placeholder="N"
      />
      <InputField type="date" label="Payment Date" name="payDate" />
      <div>
        <p className="text-sm font-semibold text-grey">Type of Payment</p>
        <ReusableSelect
          className="my-4"
          placeholder="Type of Payment"
          options={[
            { label: "cash", value: "cash" },
            { label: "transfer", value: "transfer" },
          ]}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey mb-2">Proof of Payment</p>
        <FileUpload onFileUpload={(file) => console.log(file)} />
      </div>

      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp text="Save" />
      </div>
    </div>
  );
};

export default AddPayment;
