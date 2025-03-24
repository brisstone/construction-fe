// import { BedroomIcon } from "@/assets/svgComp/PropertyIcon";
import { Amenity } from "@/hooks/api/queries/projects/property/getProperty";
// import React from "react";

const PropertyFeature = ({
  // icon = <BedroomIcon />,
  title = "Title",
  amenity,
}: {
  // icon?: React.ReactNode;
  title: string;
  amenity?: Amenity;
}) => {
  return (
    <div className="flex gap-1 items-center mb-2">
      {/* {icon} */}
      <img src={amenity?.amenityId?.image} width={24} height={24} />
      <p className="text-xs">{title}</p>
    </div>
  );
};

export default PropertyFeature;
