import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import Container from "@/components/layout/Container";
import { PageTypes } from "@/utils";
import MatReqTable from "./MatReqTable";

const MatRequest = () => {
  return (
    <Container>
      <section className="flex justify-between items-center mb-5">
        <h3 className="font-medium sm:text-lg text-sm text-textShade">
          Material Request List
        </h3>
      </section>
      <FilterLayout pageKey={PageTypes?.USERS} />
      <MatReqTable />
      <Pagination />
    </Container>
  );
};

export default MatRequest;
