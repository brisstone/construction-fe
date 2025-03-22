import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import AddAmenitiesSettings from "@/components/settings/amenities/AddAmenitiesSettings";
import AmenityTable from "@/components/settings/amenities/AmenityTable";
import TopHeader from "@/components/ui/TopHeader";
import useGetAmenity, {
  AmenityType,
} from "@/hooks/api/queries/settings/amenity/getAmenity";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

const Amenities = () => {
  const [addSettingMAmenities, setAddSettingAmenities] = useState(false);

  const [editAmenity, setEditAmenity] = useState<AmenityType | null>(null);

  const { currentUser } = useAuthStore();

  const { data: amenity, isPending } = useGetAmenity(
    currentUser?.companyId || ""
  );

  const amenityData = amenity?.data;

  const handleEdit = (amenity: AmenityType) => {
    setEditAmenity(amenity);
    setAddSettingAmenities(true);
  };

  const handleModalClose = () => {
    setAddSettingAmenities(false);
    setEditAmenity(null);
  };

  return (
    <div>
      {" "}
      <RouteChain routeOne="Settings" routeTwo="Amenities" />
      <TopHeader
        className="my-5"
        title="Amenities Details"
        text="Add Amenities"
        onClick={() => setAddSettingAmenities(true)}
      />
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <AmenityTable onEdit={handleEdit} amenityData={amenityData ?? []} />
      )}
      {
        <ReusableDialog
          title={editAmenity ? "Edit Amenities" : "Add Amenities"}
          open={addSettingMAmenities}
          onOpenChange={setAddSettingAmenities}
          className="sm:max-w-[40vw]"
        >
          <div>
            <AddAmenitiesSettings
              handleModalClose={handleModalClose}
              defaultValues={editAmenity || undefined}
              isEditMode={!!editAmenity}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default Amenities;
