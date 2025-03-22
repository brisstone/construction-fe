import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import AddAmenitiesSettings from "@/components/settings/amenities/AddAmenitiesSettings";
import AmenityTable from "@/components/settings/amenities/AmenityTable";
import TopHeader from "@/components/ui/TopHeader";
import useGetAmenity from "@/hooks/api/queries/settings/amenity/getAmenity";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

const Amenities = () => {
  const [addSettingMAmenities, setAddSettingAmenities] = useState(false);

  const { currentUser } = useAuthStore();

  const { data: amenity, isPending } = useGetAmenity(
    currentUser?.companyId || ""
  );

  const amenityData = amenity?.data;

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
        <AmenityTable amenityData={amenityData ?? []} />
      )}
      {
        <ReusableDialog
          title="Add Amenities"
          open={addSettingMAmenities}
          onOpenChange={setAddSettingAmenities}
          className="sm:max-w-[40vw]"
        >
          <div>
            <AddAmenitiesSettings />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default Amenities;
