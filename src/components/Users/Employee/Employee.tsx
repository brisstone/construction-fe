import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import Container from "@/components/layout/Container";
import TopHeader from "@/components/ui/TopHeader";
import { PageTypes } from "@/utils";
import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from "./AddEmployee";

const Employee = () => {
  const [addEmployee, setAddEmployee] = useState(false);

  return (
    <Container>
      <TopHeader
        className="my-5"
        title="Employees Details"
        text="Add Employee"
        onClick={() => setAddEmployee(true)}
      />
      <FilterLayout pageKey={PageTypes?.USERS} />
      <EmployeeTable />
      <Pagination />
      {
        <ReusableDialog
          title="Enter New Employee Information"
          open={addEmployee}
          onOpenChange={setAddEmployee}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddEmployee />
          </div>
        </ReusableDialog>
      }
    </Container>
  );
};

export default Employee;
