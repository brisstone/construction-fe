import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import useGetSinglePaymentSchedule from "@/hooks/api/queries/projects/paymentSchedule/getSinglePaymentSchedule";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import ButtonComp from "@/components/general/ButtonComp";
import ReusableDialog from "@/components/general/ReuseableDialog";
import AddPayment from "@/components/clientDetail/AddPayment";
import { useState } from "react";
import PaymentTable from "@/components/clientDetail/PaymentTable";
import useGetSchedulePayments from "@/hooks/api/queries/projects/paymentSchedule/getPaymentProject";
import { formatNumberWithCommaDecimal } from "@/utils";

const PaymentScheduleDetail = () => {
  const { id } = useParams();

  const [addPay, setAddPay] = useState(false);
  const { data: singlePaymentSchedule, isPending } =
    useGetSinglePaymentSchedule(id ?? "", {});

  const singlePaymentScheduleLoad = singlePaymentSchedule;

  const { data: paymentData, isPending: payProjPend } = useGetSchedulePayments(
    id ?? ""
  );

  const paymentDataLoad = paymentData?.data;

  const clientDetails = [
    {
      title: "Contractor/Vendor:",
      content: singlePaymentScheduleLoad?.contractorId?.firstName,
    },
    {
      title: "Generated Date",
      content: singlePaymentScheduleLoad?.updatedAt
        ? format(new Date(singlePaymentScheduleLoad.updatedAt), "MMM, dd, yyyy")
        : "",
    },
    {
      title: "Amount of Payment Due:",
      content: formatNumberWithCommaDecimal(singlePaymentScheduleLoad?.amount),
    },
    {
      title: "Amount Paid:",
      content: formatNumberWithCommaDecimal(
        singlePaymentScheduleLoad?.totalAmountPaid
      ),
    },
    {
      title: "Due Date For Payment:",
      content: singlePaymentScheduleLoad?.dateDue
        ? format(new Date(singlePaymentScheduleLoad.dateDue), "MMM, dd, yyyy")
        : "",
    },
    {
      title: "Actual Payment Date:",
      content: singlePaymentScheduleLoad?.datePaid
        ? format(new Date(singlePaymentScheduleLoad.datePaid), "MMM, dd, yyyy")
        : "",
    },
    { title: "Type of Payment Schedule:", content: "not updated" },
    {
      title: "Payment Method:",
      content: singlePaymentScheduleLoad?.paymentMethod,
    },
    { title: "Expense Type:", content: singlePaymentScheduleLoad?.expenseType },
    {
      title: "Balance:",
      content: formatNumberWithCommaDecimal(
        singlePaymentScheduleLoad?.balanceRemaining
      ),
    },
    { title: "Payment Type:", content: singlePaymentScheduleLoad?.paymentType },
  ];

  if (isPending || payProjPend) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div>
      <RouteChain routeOne="Projects" routeTwo="Schedule View" />
      <Container className="my-5">
        <aside className="sm:flex items-center justify-between">
          <p className="font-medium sm:text-lg text-sm text-textShade">
            View Payment Schedule
          </p>
          <ButtonComp
            onClick={() => {
              if (singlePaymentScheduleLoad?.paymentCompleted) return;
              setAddPay(true);
            }}
            text={
              singlePaymentScheduleLoad?.paymentCompleted
                ? "Payment completed"
                : "Make Payment"
            }
            className="w-fit mt-1 sm:mt-0"
          />
        </aside>
        <section className="my-4 py-3 border-y">
          <div className="grid grid-cols-2 gap-3 my-5">
            {clientDetails.map((item, index) => (
              <div key={index} className="text-sm">
                <span className="font-semibold mr-3">{item.title}: </span>
                <span className="text-xs text-darkGrey">{item.content}</span>
              </div>
            ))}
          </div>
          <div className="my-3">
            {/* <h3 className="font-medium">Description of Work or Material:</h3>
            <p className="w-1/2 text-xs text-textShade">
              Supply of 200 Bags of Cement
            </p> */}
          </div>
        </section>
        <section className="">
          {/* <div>
            <h3 className="font-bold text-lg mb-3">Receipt of Payment</h3>
            <img
              src={singlePaymentScheduleLoad?.paymentProof}
              alt="samplepassport"
            />
          </div> */}
          <aside className="border my-5 flex items-center gap-5 p-5 rounded-[14px]">
            <h3 className="text-lg font-semibold">Notes:</h3>
            <p>{singlePaymentScheduleLoad?.description}</p>
          </aside>
        </section>
        <section className="border-y">
          <PaymentTable paymentDataLoad={paymentDataLoad ?? []} />
        </section>
      </Container>

      {
        <ReusableDialog
          title="Add New Payment in Schedule "
          open={addPay}
          onOpenChange={setAddPay}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddPayment
              handleModalClose={() => setAddPay(false)}
              projectId={singlePaymentScheduleLoad?.projectId ?? ""}
              contractorId={singlePaymentScheduleLoad?.contractorId?._id ?? ""}
              schedulePay={true}
              scheduleId={id}
              params={{}}
              balance={singlePaymentScheduleLoad?.balanceRemaining}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default PaymentScheduleDetail;
