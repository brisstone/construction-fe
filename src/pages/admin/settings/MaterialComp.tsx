import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import AddMaterialSettings from "@/components/settings/material/AddMaterialSettings";
import SettingsMaterialTable from "@/components/settings/material/SettingsMaterialTable";
import TopHeader from "@/components/ui/TopHeader";
import { useState } from "react";

const MaterialComp = () => {
  const [addSettingMat, setAddSettingMat] = useState(false);
  return (
    <div>
      <RouteChain routeOne="Settings" routeTwo="Materials" />
      <TopHeader
        className="my-5"
        title="Material Details"
        text="Add Material"
        onClick={() => setAddSettingMat(true)}
      />
      <SettingsMaterialTable />
      {
        <ReusableDialog
          title="Add MATERIAL"
          open={addSettingMat}
          onOpenChange={setAddSettingMat}
          className="sm:max-w-[40vw]"
        >
          <div>
            <AddMaterialSettings />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default MaterialComp;
