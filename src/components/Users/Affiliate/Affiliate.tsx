import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import Container from "@/components/layout/Container";
import TopHeader from "@/components/ui/TopHeader";
import { PageTypes } from "@/utils";
import { useState } from "react";
import AffiliateTable from "./AffiliateTable";
import AddAffiliate from "./AddAffiliate";

const Affiliate = () => {
  const [addAffiliate, setAddAffiliate] = useState(false);

  return (
    <Container>
      <TopHeader
        className="my-5"
        title="Affiliate Details"
        text="Add Affiliate"
        onClick={() => setAddAffiliate(true)}
      />
      <FilterLayout pageKey={PageTypes?.USERS} />
      <AffiliateTable />
      <Pagination />
      {
        <ReusableDialog
          title="Enter New Affiliate Information"
          open={addAffiliate}
          onOpenChange={setAddAffiliate}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddAffiliate />
          </div>
        </ReusableDialog>
      }
    </Container>
  );
};

export default Affiliate;
