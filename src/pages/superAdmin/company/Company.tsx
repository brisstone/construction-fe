import AddCompany from "@/components/company/AddCompany";
import CompanyTable from "@/components/company/CompanyTable";
import ButtonComp from "@/components/general/ButtonComp";
import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import useGetCompany, {
  CompanyType,
} from "@/hooks/api/queries/company/getCompany";
import { PageTypes } from "@/utils";
import { useState } from "react";

const Company = () => {
  const [addCompany, setAddCompany] = useState(false);

  const [editCompany, setEditCompany] = useState<CompanyType | null>(null);
  const { data: company, isPending, refetch } = useGetCompany();

  const companyData = company?.data;

  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = companyData?.length || 0;
  const entriesPerPage = 7;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = companyData?.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (company: CompanyType) => {
    setEditCompany(company);
    setAddCompany(true);
  };

  const handleModalClose = () => {
    setAddCompany(false);
    setEditCompany(null);
    refetch();
  };

  return (
    <div>
      <section className="flex justify-between items-center mb-5">
        <h3 className="text-grey font-extrabold sm:text-2xl text-lg">
          Dashboard
        </h3>
        <ButtonComp
          onClick={() => {
            setEditCompany(null);
            setAddCompany(true);
          }}
          text="Add Company"
          showIcon
          className="w-fit"
        />
      </section>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <main className="border border-borderColor rounded-xl ">
          <div className=" p-3">
            <FilterLayout pageKey={PageTypes?.CLIENTS} />
          </div>

          <CompanyTable companyData={paginatedData ?? []} onEdit={handleEdit} />
          <Pagination
            currentPage={currentPage}
            totalEntries={totalEntries}
            entriesPerPage={entriesPerPage}
            onPageChange={handlePageChange}
          />
        </main>
      )}
      <ReusableDialog
        title={editCompany ? "Edit Company" : "Add Company"}
        open={addCompany}
        onOpenChange={setAddCompany}
        className="max-w-xl"
      >
        <AddCompany
          setAddCompany={setAddCompany}
          handleModalClose={handleModalClose}
          defaultValues={editCompany || undefined}
          isEditMode={!!editCompany}
        />
      </ReusableDialog>
    </div>
  );
};

export default Company;
