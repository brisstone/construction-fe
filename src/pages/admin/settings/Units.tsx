import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import AddAmenitiesSettings from "@/components/settings/amenities/AddAmenitiesSettings";
import AmenityTable from "@/components/settings/amenities/AmenityTable";
import AddUnit from "@/components/settings/units/AddUnit";
import UnitTable from "@/components/settings/units/UnitTable";
import TopHeader from "@/components/ui/TopHeader";
import { useState } from "react";

const Units = () => {
  const [addSettingUnits, setAddSettingUnits] = useState(false);
  return (
    <div>
      {" "}
      <RouteChain routeOne="Settings" routeTwo="Units" />
      <TopHeader
        className="my-5"
        title="Units Details"
        text="Add Units"
        onClick={() => setAddSettingUnits(true)}
      />
      <UnitTable />
      {
        <ReusableDialog
          title="Add Units"
          open={addSettingUnits}
          onOpenChange={setAddSettingUnits}
          className="sm:max-w-[40vw]"
        >
          <div>
            <AddUnit />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default Units;
