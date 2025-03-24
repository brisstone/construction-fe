import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import AddLaborSettings from "@/components/settings/labor/AddLaborSettings";
import SettingsLaborTable from "@/components/settings/labor/SettingsLaborTable";
import TopHeader from "@/components/ui/TopHeader";
import useGetLabor, { LaborType } from "@/hooks/api/queries/settings/labor/getLabor";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

const LaborComp = () => {
  const [addSettingMat, setAddSettingMat] = useState(false);

  const [editLabor, setEditLabor] = useState<LaborType | null>(null);

  const { currentUser } = useAuthStore();

  const { data: Labor, isPending } = useGetLabor(
    currentUser?.companyId || ""
  );

  const LaborData = Labor?.data;

  const handleEdit = (lab: LaborType) => {
    setEditLabor(lab);
    setAddSettingMat(true);
  };

  const handleModalClose = () => {
    setAddSettingMat(false);
    setEditLabor(null);
  };

  return (
    <div>
      <RouteChain routeOne="Settings" routeTwo="Labor" />
      <TopHeader
        className="my-5"
        title="Labor Details"
        text="Add Labor"
        onClick={() => {
          setEditLabor(null);
          setAddSettingMat(true);
        }}
      />
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <SettingsLaborTable
          onEdit={handleEdit}
          LaborData={LaborData ?? []}
        />
      )}
      {
        <ReusableDialog
          title={editLabor ? "Edit Labor" : "Add Labor"}
          open={addSettingMat}
          onOpenChange={setAddSettingMat}
          className="sm:max-w-[40vw]"
        >
          <div>
            <AddLaborSettings
              handleModalClose={handleModalClose}
              defaultValues={editLabor || undefined}
              isEditMode={!!editLabor}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default LaborComp;
