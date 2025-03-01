import { BedroomIcon } from "@/assets/svgComp/PropertyIcon";
import React from "react";

const PropertyFeature = ({
  icon = <BedroomIcon />,
  title = "Title",
}: {
  icon?: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex gap-1 items-center">
      {icon}
      <p className="text-xs">{title}</p>
    </div>
  );
};

export default PropertyFeature;
