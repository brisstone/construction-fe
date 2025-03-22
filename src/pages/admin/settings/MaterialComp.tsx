import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import AddMaterialSettings from "@/components/settings/material/AddMaterialSettings";
import SettingsMaterialTable from "@/components/settings/material/SettingsMaterialTable";
import TopHeader from "@/components/ui/TopHeader";
import useGetMaterial, {
  MaterialType,
} from "@/hooks/api/queries/settings/material/getMaterial";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

const MaterialComp = () => {
  const [addSettingMat, setAddSettingMat] = useState(false);

  const [editMaterial, setEditMaterial] = useState<MaterialType | null>(null);

  const { currentUser } = useAuthStore();

  const { data: material, isPending } = useGetMaterial(
    currentUser?.companyId || ""
  );

  const MaterialData = material?.data;

  const handleEdit = (mat: MaterialType) => {
    setEditMaterial(mat);
    setAddSettingMat(true);
  };

  const handleModalClose = () => {
    setAddSettingMat(false);
    setEditMaterial(null);
  };

  return (
    <div>
      <RouteChain routeOne="Settings" routeTwo="Materials" />
      <TopHeader
        className="my-5"
        title="Material Details"
        text="Add Material"
        onClick={() => {
          setEditMaterial(null);
          setAddSettingMat(true);
        }}
      />
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <SettingsMaterialTable
          onEdit={handleEdit}
          MaterialData={MaterialData ?? []}
        />
      )}
      {
        <ReusableDialog
          title={editMaterial ? "Edit MATERIAL" : "Add MATERIAL"}
          open={addSettingMat}
          onOpenChange={setAddSettingMat}
          className="sm:max-w-[40vw]"
        >
          <div>
            <AddMaterialSettings
              handleModalClose={handleModalClose}
              defaultValues={editMaterial || undefined}
              isEditMode={!!editMaterial}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default MaterialComp;
