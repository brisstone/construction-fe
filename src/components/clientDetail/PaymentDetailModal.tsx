import { ReminderIcon } from "@/assets/svgComp/PropertyIcon";
import ButtonComp from "../general/ButtonComp";
import PaymentTable from "./PaymentTable";
import Pagination from "../general/Pagination";
import ReusableDialog from "../general/ReuseableDialog";
import AddPayment from "./AddPayment";
import { useState } from "react";

const PaymentDetailModal = () => {
  const [addPay, setAddPay] = useState(false);

  return (
    <div>
      <section className="bg-[#F7F8FA] p-6 rounded-[12px]">
        <aside className="flex justify-between items-center">
          <div className="w-1/2">
            <h3 className="font-semibold text-sm">Payment Amount:</h3>
            <p className="text-xs text-darkGrey">₦ 55,000,000.00</p>
          </div>
          <div className="w-1/2">
            <h3 className="font-semibold text-sm ">Payment Due Date:</h3>
            <p className="text-xs text-darkGrey">23/06/2026</p>
          </div>
        </aside>
        <aside className="flex justify-between items-center mt-5">
          <div className="w-1/2">
            <h3 className="font-semibold text-sm">Total Paid: </h3>
            <p className="text-xs text-darkGrey">₦ 20,000,000.00</p>
          </div>
          <div className="w-1/2">
            <h3 className="font-semibold text-sm ">Balance:</h3>
            <p className="text-xs text-textRed"> ₦ 35,000,000.00 </p>
          </div>
        </aside>
      </section>

      <main>
        <div className="flex justify-self-end gap-4 items-center my-5 ">
          <ButtonComp
            text="Set Reminder"
            icon={<ReminderIcon />}
            className="w-fit bg-transparent border text-black hover:text-white"
          />
          <ButtonComp
            onClick={() => setAddPay(true)}
            text="Add Payment"
            className="w-fit"
          />
        </div>
        <PaymentTable />
        <Pagination />
      </main>
      {
        <ReusableDialog
          title="Add New Payment "
          open={addPay}
          onOpenChange={setAddPay}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddPayment />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default PaymentDetailModal;
