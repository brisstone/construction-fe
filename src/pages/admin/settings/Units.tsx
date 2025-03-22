import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import AddUnit from "@/components/settings/units/AddUnit";
import UnitTable from "@/components/settings/units/UnitTable";
import TopHeader from "@/components/ui/TopHeader";
import useGetUnit, {
  UnitType,
} from "@/hooks/api/queries/settings/unit/getUnit";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

const Units = () => {
  const [addSettingUnits, setAddSettingUnits] = useState(false);

  const [editUnit, setEditUnit] = useState<UnitType | null>(null);

  const { currentUser } = useAuthStore();

  const { data: unit, isPending } = useGetUnit(currentUser?.companyId || "");

  const unitData = unit?.data;

  const handleEdit = (unit: UnitType) => {
    setEditUnit(unit);
    setAddSettingUnits(true);
  };

  const handleModalClose = () => {
    setAddSettingUnits(false);
    setEditUnit(null);
  };

  return (
    <div>
      <RouteChain routeOne="Settings" routeTwo="Units" />
      <TopHeader
        className="my-5"
        title="Units Details"
        text="Add Units"
        onClick={() => {
          setEditUnit(null);
          setAddSettingUnits(true);
        }}
      />

      {isPending ? (
        <p>Loading...</p>
      ) : (
        <UnitTable onEdit={handleEdit} unitData={unitData ?? []} />
      )}
      {
        <ReusableDialog
          title={editUnit ? "Edit Units" : "Add Units"}
          open={addSettingUnits}
          onOpenChange={setAddSettingUnits}
          className="sm:max-w-[40vw]"
        >
          <div>
            <AddUnit
              handleModalClose={handleModalClose}
              defaultValues={editUnit || undefined}
              isEditMode={!!editUnit}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default Units;
