import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import Container from "@/components/layout/Container";
import TopHeader from "@/components/ui/TopHeader";
import { PageTypes } from "@/utils";
import MainInventoryTable from "./MainInventoryTable";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <TopHeader
        className=""
        title="Stock Request List"
        text="Request Stock"
        showIcon
        onClick={() => navigate("/admin/add-stock")}
      />
      <FilterLayout pageKey={PageTypes?.USERS} />
      <MainInventoryTable />
      <Pagination />
    </Container>
  );
};

export default Inventory;
