import { ReminderIcon } from "@/assets/svgComp/PropertyIcon";
import ButtonComp from "../general/ButtonComp";
import PaymentTable from "./PaymentTable";
import Pagination from "../general/Pagination";
import ReusableDialog from "../general/ReuseableDialog";
import AddPayment from "./AddPayment";
import { useState } from "react";
import useGetPaymentProperty, {
  PaymentPropertyData,
} from "@/hooks/api/queries/projects/property/getPaymentProperty";
import { useParams } from "react-router-dom";
import { formatNumberWithCommaDecimal } from "@/utils";
import { format } from "date-fns";

const PaymentDetailModal = ({ clientId }: { clientId: string }) => {
  const [addPay, setAddPay] = useState(false);

  const [editPay, setEditPay] = useState<PaymentPropertyData | null>(null);

  const { id, id2 } = useParams();

  const { data: paymentData, isPending } = useGetPaymentProperty(
    id ?? "",
    id2 ?? ""
  );

  console.log(paymentData, "paymentData__paymentData");

  const paymentDataLoad = paymentData?.data;

  const handleModalClose = () => {
    setAddPay(false);
    setEditPay(null);
  };

  const handleEdit = (property: PaymentPropertyData) => {
    setEditPay(property);
    setAddPay(true);
  };

  if (isPending) {
    return <div className="text-center">loading....</div>;
  }
  return (
    <div>
      <section className="bg-[#F7F8FA] p-6 rounded-[12px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-5 gap-x-6">
          <div>
            <h3 className="font-semibold text-sm">Payment Amount:</h3>
            <p className="text-xs text-darkGrey">
              {formatNumberWithCommaDecimal(paymentData?.property?.amount ?? 0)}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Payment Due Date:</h3>
            <p className="text-xs text-darkGrey">
              {" "}
              {paymentData?.property?.dueDate
                ? format(
                    new Date(paymentData?.property?.dueDate),
                    "MMM d, yyyy"
                  )
                : "N/A"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Total Paid:</h3>
            <p className="text-xs text-darkGrey">
              {formatNumberWithCommaDecimal(paymentData?.totalAmountPaid)}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Balance:</h3>
            <p className="text-xs text-textRed">
              {formatNumberWithCommaDecimal(paymentData?.balanceRemaining)}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Agent Type:</h3>
            <p className="text-xs text-darkGrey">
              {paymentData?.property?.agentType}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Agent:</h3>
            <p className="text-xs text-darkGrey">
              {paymentData?.property?.agentId?.firstName}{" "}
              {paymentData?.property?.agentId?.lastName}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Payment Frequency:</h3>
            <p className="text-xs text-darkGrey">
              {paymentData?.property?.paymentFrequency ?? "N/A"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Agent Commission:</h3>
            <p className="text-xs text-darkGrey">
              {paymentData?.property?.agentCommission}%
            </p>
          </div>
        </div>
      </section>

      {/* <section className="bg-[#F7F8FA] p-6 rounded-[12px]">
        <aside className="flex justify-between items-center">
          <div className="w-1/2">
            <h3 className="font-semibold text-sm">Agent Type:</h3>
            <p className="text-xs text-darkGrey">
              {paymentData?.property?.agentType}
            </p>
          </div>
          <div className="w-1/2">
            <h3 className="font-semibold text-sm ">Agent:</h3>
            <p className="text-xs text-darkGrey">{paymentData?.property?.agentId?.firstName} {paymentData?.property?.agentId?.lastName}</p>
          </div>
        </aside>
        <aside className="flex justify-between items-center mt-5">
          <div className="w-1/2">
            <h3 className="font-semibold text-sm">paymentFrequency:</h3>
            <p className="text-xs text-darkGrey">
              {paymentData?.property?.paymentFrequency}
            </p>
          </div>
          <div className="w-1/2">
            <h3 className="font-semibold text-sm ">Agent Commission:</h3>
            <p className="text-xs text-textRed">
              {" "}
              {formatNumberWithCommaDecimal(paymentData?.property?.agentCommission)}{" "}
            </p>
          </div>
        </aside>
      </section> */}

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
        <PaymentTable
          paymentDataLoad={paymentDataLoad ?? []}
          onEdit={handleEdit}
        />
        <Pagination />
      </main>
      {
        <ReusableDialog
          title={editPay ? "Edit New Payment" : "Add New Payment"}
          open={addPay}
          onOpenChange={setAddPay}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddPayment
              handleModalClose={handleModalClose}
              projectId={id ?? ""}
              propertyId={id2 ?? ""}
              clientId={clientId}
              balance={paymentData?.balanceRemaining}
              defaultValues={editPay || undefined}
              isEditMode={!!editPay}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default PaymentDetailModal;
