import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import Container from "@/components/layout/Container";
import TopHeader from "@/components/ui/TopHeader";
import { PageTypes } from "@/utils";
import { useState } from "react";
import AffiliateTable from "./AffiliateTable";
import AddAffiliate from "./AddAffiliate";
import { useAuthStore } from "@/store/authStore";
import useGetCompanyUser from "@/hooks/api/queries/user/getCompanyUser";

const Affiliate = () => {
  const [addAffiliate, setAddAffiliate] = useState(false);

  const { currentUser } = useAuthStore();

  const { data: CompanyUser, isPending } = useGetCompanyUser(
    currentUser?.companyId ?? "",
    { accountType: "affiliate" }
  );

  const CompanyUserData = CompanyUser?.data;

  if (isPending) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Container>
      <TopHeader
        className="my-5"
        title="Affiliate Details"
        text="Add Affiliate"
        onClick={() => setAddAffiliate(true)}
      />
      <FilterLayout pageKey={PageTypes?.USERS} />
      <AffiliateTable CompanyUserData={CompanyUserData ?? []} />
      <Pagination />
      {
        <ReusableDialog
          title="Enter New Affiliate Information"
          open={addAffiliate}
          onOpenChange={setAddAffiliate}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddAffiliate handleModalClose={() => setAddAffiliate(false)} />
          </div>
        </ReusableDialog>
      }
    </Container>
  );
};

export default Affiliate;
