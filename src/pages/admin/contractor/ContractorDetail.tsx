
import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import Container from "@/components/layout/Container";
import TopHeader from "@/components/ui/TopHeader";
import { PageTypes } from "@/utils";
import { useState } from "react";

import { useAuthStore } from "@/store/authStore";
import AddContractor from "./AddContractor";
import useGetContractor, {
  ContractorType,
} from "@/hooks/api/queries/contractor/getContractor";
import ContractorTable from "@/components/contractor/ContractorTable";

const ContractorDetail = () => {
  const [openContractor, setOpenContractor] = useState(false);

  const [editContractor, setEditContractor] = useState<ContractorType | null>(null);

  const { currentUser } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 7;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const params: Record<string, string | number> = {
    limit: entriesPerPage,
    page: currentPage,
  };
  const { data: contractor, isPending } = useGetContractor(
    currentUser?.companyId || "",
    params
  );

  const contractorData = contractor?.data;

  const totalEntries = contractorData?.length || 0;
  const paginatedData = contractorData?.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (contractor: ContractorType) => {
    setEditContractor(contractor);
    setOpenContractor(true);
  };

  const handleModalClose = () => {
    setOpenContractor(false);
    setEditContractor(null);
  };

  return (
    <Container>
      <TopHeader
        className="my-5"
        title="Contractor Details"
        text="Add New Contractor"
        onClick={() => {
          setEditContractor(null);
          setOpenContractor(true);
        }}
      />
      {isPending ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <FilterLayout pageKey={PageTypes?.CLIENTS} />
          <ContractorTable onEdit={handleEdit} contractorData={paginatedData ?? []} />
          <Pagination
            currentPage={currentPage}
            totalEntries={totalEntries}
            entriesPerPage={entriesPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {
        <ReusableDialog
          title={
            editContractor
              ? "Edit Contractor Information"
              : "Enter New Contractor Information"
          }
          open={openContractor}
          onOpenChange={setOpenContractor}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddContractor
              handleModalClose={handleModalClose}
              defaultValues={editContractor || undefined}
              isEditMode={!!editContractor}
            />
          </div>
        </ReusableDialog>
      }
    </Container>
  );
};

export default ContractorDetail;
