import ButtonComp from "@/components/general/ButtonComp";
import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import PaymentTable from "@/components/projects/paymentSchedule/PaymentTable";
import { PageTypes } from "@/utils";

const PaymentSchedule = () => {
  const pageKey = PageTypes.PROJECTS;
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
            Mabushi project payment schedule
          </p>
          <ButtonComp text="Add New Schedule" className="w-fit mt-1 sm:mt-0" />
        </aside>
        <FilterLayout pageKey={pageKey} />
        <PaymentTable />
        <Pagination/>
      </Container>
    </div>
  );
};

export default PaymentSchedule;
