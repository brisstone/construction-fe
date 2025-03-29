import { ReminderIcon } from "@/assets/svgComp/PropertyIcon";
import ButtonComp from "../general/ButtonComp";
import PaymentTable from "./PaymentTable";
import Pagination from "../general/Pagination";
import ReusableDialog from "../general/ReuseableDialog";
import AddPayment from "./AddPayment";
import { useState } from "react";
import useGetPaymentProperty from "@/hooks/api/queries/projects/property/getPaymentProperty";
import { useParams } from "react-router-dom";
import { formatNumberWithCommaDecimal } from "@/utils";

const PaymentDetailModal = ({ clientId }: { clientId: string }) => {
  const [addPay, setAddPay] = useState(false);

  const { id, id2 } = useParams();

  const { data: paymentData, isPending } = useGetPaymentProperty(
    id ?? "",
    id2 ?? ""
  );

  console.log(paymentData, "paymentData__paymentData");

  const paymentDataLoad = paymentData?.data;

  if (isPending) {
    return <div className="text-center">loading....</div>;
  }
  return (
    <div>
      <section className="bg-[#F7F8FA] p-6 rounded-[12px]">
        <aside className="flex justify-between items-center">
          <div className="w-1/2">
            <h3 className="font-semibold text-sm">Payment Amount:</h3>
            <p className="text-xs text-darkGrey">
              {formatNumberWithCommaDecimal(paymentData?.property?.amount ?? 0)}
            </p>
          </div>
          <div className="w-1/2">
            <h3 className="font-semibold text-sm ">Payment Due Date:</h3>
            <p className="text-xs text-darkGrey">23/06/2026</p>
          </div>
        </aside>
        <aside className="flex justify-between items-center mt-5">
          <div className="w-1/2">
            <h3 className="font-semibold text-sm">Total Paid: </h3>
            <p className="text-xs text-darkGrey">
              {formatNumberWithCommaDecimal(paymentData?.totalAmountPaid)}
            </p>
          </div>
          <div className="w-1/2">
            <h3 className="font-semibold text-sm ">Balance:</h3>
            <p className="text-xs text-textRed">
              {" "}
              {formatNumberWithCommaDecimal(paymentData?.balanceRemaining)}{" "}
            </p>
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
            // onClick={() => setAddPay(true)}
            onClick={() => {
              if (paymentData?.property?.paymentCompleted) return;
              setAddPay(true);
            }}
            text={
              paymentData?.property?.paymentCompleted
                ? "Payment completed"
                : "Add Payment"
            }
            className="w-fit"
          />
        </div>
        <PaymentTable paymentDataLoad={paymentDataLoad ?? []} />
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
            <AddPayment
              handleModalClose={() => setAddPay(false)}
              projectId={id ?? ""}
              propertyId={id2 ?? ""}
              clientId={clientId}
              balance={paymentData?.balanceRemaining}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default PaymentDetailModal;
