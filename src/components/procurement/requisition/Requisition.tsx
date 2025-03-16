import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import Container from "@/components/layout/Container";
import TopHeader from "@/components/ui/TopHeader";
import { PageTypes } from "@/utils";
import MainReqTable from "./MainReqTable";
import { useNavigate } from "react-router-dom";

const Requisition = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <TopHeader
        className=""
        title="Requisition Items"
        text="New Requisition"
        showIcon
        onClick={() => navigate("/admin/add-requistion")}
      />
      <FilterLayout pageKey={PageTypes?.USERS} />
      <MainReqTable />
      <Pagination />
    </Container>
  );
};

export default Requisition;
