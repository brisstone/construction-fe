import ButtonComp from "@/components/general/ButtonComp";
import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import RoundLoader from "@/components/general/RoundLoader";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import NewPaymentModal from "@/components/projects/paymentSchedule/NewPaymentModal";
import PaymentTable from "@/components/projects/paymentSchedule/PaymentTable";
import useGetPaymentSchedule, {
  PaymentScheduleType,
} from "@/hooks/api/queries/projects/paymentSchedule/getPaymentSchedule";
import { PageTypes } from "@/utils";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PaymentSchedule = () => {
  const pageKey = PageTypes.PROJECTS;
  const { id } = useParams();

  const [openSchedule, setOpenSchedule] = useState(false);

  const [editSchedule, setEditSchedule] = useState<PaymentScheduleType | null>(
    null
  );

  const { data: paymentSchedule, isPending } = useGetPaymentSchedule(id ?? "");

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
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Payment Schedule"
      />
      <Container className="my-5">
        <aside className="sm:flex items-center justify-between">
          <p className="font-medium sm:text-lg text-sm text-textShade">
            Project payment schedule
          </p>
          <ButtonComp
            onClick={() => setOpenSchedule(true)}
            text="Add New Schedule"
            className="w-fit mt-1 sm:mt-0"
          />
        </aside>
        {isPending ? (
          <RoundLoader />
        ) : (
          <>
            <FilterLayout pageKey={pageKey} />
            <PaymentTable
              onEdit={handleEdit}
              paymentSchedule={paymentSchedule?.data ?? []}
            />
            <Pagination />
          </>
        )}
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

export default PaymentSchedule;
