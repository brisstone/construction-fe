import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import Container from "@/components/layout/Container";
import TopHeader from "@/components/ui/TopHeader";
import { PageTypes } from "@/utils";
import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from "./AddEmployee";
import useGetCompanyUser from "@/hooks/api/queries/user/getCompanyUser";
import { useAuthStore } from "@/store/authStore";

const Employee = () => {
  const [addEmployee, setAddEmployee] = useState(false);

  const { currentUser } = useAuthStore();

  const { data: CompanyUser } = useGetCompanyUser(currentUser?.companyId ?? "");

  const CompanyUserData = CompanyUser?.data;

  return (
    <Container>
      <TopHeader
        className="my-5"
        title="Employees Details"
        text="Add Employee"
        onClick={() => setAddEmployee(true)}
      />
      <FilterLayout pageKey={PageTypes?.USERS} />
      <EmployeeTable CompanyUserData={CompanyUserData ?? []} />
      <Pagination />
      {
        <ReusableDialog
          title="Enter New Employee Information"
          open={addEmployee}
          onOpenChange={setAddEmployee}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddEmployee handleModalClose={() => setAddEmployee(false)} />
          </div>
        </ReusableDialog>
      }
    </Container>
  );
};

export default Employee;
