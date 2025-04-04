import ButtonComp from "@/components/general/ButtonComp";
import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import NewPaymentModal from "@/components/projects/paymentSchedule/NewPaymentModal";
import PaymentTable from "@/components/projects/paymentSchedule/PaymentTable";
import usegetProjectById from "@/hooks/api/queries/projects/getProjectById";
import useGetPaymentSchedule, {
  PaymentScheduleType,
} from "@/hooks/api/queries/projects/paymentSchedule/getPaymentSchedule";
import { formatNumberWithCommaDecimal, PageTypes } from "@/utils";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const PaymentExpense = () => {
  const pageKey = PageTypes.PROJECTS;
  const { id } = useParams();
  const { data: project } = usegetProjectById(id ?? "");

  const [openSchedule, setOpenSchedule] = useState(false);

  const [editSchedule, setEditSchedule] = useState<PaymentScheduleType | null>(
    null
  );

  const { data: paymentSchedule } = useGetPaymentSchedule(id ?? "");

  const handleModalClose = () => {
    setOpenSchedule(false);
    setEditSchedule(null);
  };

  const handleEdit = (property: PaymentScheduleType) => {
    setEditSchedule(property);
    setOpenSchedule(true);
  };

  return (
    <div>
      <div className="flex justify-between">
        <RouteChain
          routeOne="Projects"
          routeTwo={`${project?.name}`}
          routeThree="Payment Schedule"
        />
      </div>
      <Container className="my-5">
        <aside className="sm:flex items-center justify-between">
          <p className="font-medium sm:text-lg text-sm text-textShade">
            Expense Report
          </p>
        </aside>
        <FilterLayout pageKey={pageKey} />
        <PaymentTable
          onEdit={handleEdit}
          paymentSchedule={paymentSchedule?.data ?? []}
        />
        <Pagination />

        <div className="p-4 mt-4 flex justify-between">
          <p className="font-semibold">Total</p>
          <p></p>
          <p className="font-semibold -ml-4">
            {formatNumberWithCommaDecimal(800)}
          </p>
        </div>

        <div className="flex gap-8 justify-between">
          <div className=" w-full">
            <ButtonComp
              onClick={() => toast.success("done")}
              text="Save as pdf"
              className="w-full mt-1 sm:mt-0 h-[50px]"
            />
          </div>
          <div className=" w-full">
            <ButtonComp
              onClick={() => toast.success("done")}
              text="Print Report"
              className="w-full mt-1 sm:mt-0 h-[50px]"
            />
          </div>
        </div>
        {
          <ReusableDialog
            title={
              editSchedule
                ? "Edit Payment Schedule"
                : "Add New Payment Schedule"
            }
            open={openSchedule}
            onOpenChange={setOpenSchedule}
            className="sm:max-w-[60vw]"
          >
            <div>
              <NewPaymentModal
                defaultValues={editSchedule || undefined}
                isEditMode={!!editSchedule}
                handleModalClose={handleModalClose}
              />
            </div>
          </ReusableDialog>
        }
      </Container>
    </div>
  );
};

export default PaymentExpense;
