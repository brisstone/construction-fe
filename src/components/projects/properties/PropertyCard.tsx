import PropertyFeature from "./PropertyFeature";
import ProjectHouse1 from "@/assets/images/ProjectHouse1.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThreeDotsVertical } from "@/assets/svgComp/General";
import { useNavigate, useParams } from "react-router-dom";
import {
  Amenity,
  PropertyType,
} from "@/hooks/api/queries/projects/property/getProperty";
import ReusableDialog from "@/components/general/ReuseableDialog";
import DeletePropertyModal from "./DeletePropertyModal";
import { useState } from "react";

const PropertyCard = ({
  propertyItem,
  onEdit,
}: {
  propertyItem: PropertyType;
  onEdit: (property: PropertyType) => void;
}) => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  console.log(propertyItem, "propertyItem");

  const [deleteProperty, setDeleteProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedProperty(id);
    setDeleteProperty(true);
  };

  return (
    <>
      <section
        // to={`/admin/project/${id}/properties/${propertyItem?._id}`}
        onClick={() => {
          navigate(`/admin/project/${id}/properties/${propertyItem?._id}`);
        }}
        className="relative group"
      >
        <div className="absolute z-10 top-2 right-2 group-hover:flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className=" bg-white rounded-full shadow-md"
              >
                <ThreeDotsVertical />
              </button>
            </PopoverTrigger>
            <PopoverContent
              onClick={(e) => e.stopPropagation()}
              className="w-[100px] rounded-[4px]"
            >
              <div onClick={(e) => e.stopPropagation()}>
                <p
                  onClick={() => onEdit(propertyItem)}
                  className="cursor-pointer"
                >
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(propertyItem?._id)}
                  className="cursor-pointer"
                >
                  Delete
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full h-[190px] relative ">
          <img
            src={propertyItem?.photos[0] || ProjectHouse1}
            alt="property"
            className="absolute w-full h-full inset-0 object-cover rounded-[16px]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = ProjectHouse1;
            }}
          />
        </div>
        <section>
          <h3 className="font-bold text-sm my-2">{propertyItem?.name}</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {propertyItem?.amenities?.map((amenity: Amenity) => {
              return (
                <PropertyFeature
                  amenity={amenity}
                  title={amenity.amenityId?.name}
                />
              );
            })}
          </div>
        </section>
      </section>
      {
        <ReusableDialog
          title={"Delete Property"}
          open={deleteProperty}
          onOpenChange={setDeleteProperty}
          className="max-w-xl"
        >
          <DeletePropertyModal
            setDeleteProperty={setDeleteProperty}
            selectedProperty={selectedProperty || ""}
          />
        </ReusableDialog>
      }
    </>
  );
};

// <PropertyFeature icon={<BedroomIcon />} title="4 Bedroom" />
// <PropertyFeature icon={<PoolIcon />} title="2 S/Pool" />
// <PropertyFeature icon={<BathroomIcon />} title="2 Bathrooms" />
// <PropertyFeature icon={<CarIcon />} title="3 Car Parking" />
// <PropertyFeature icon={<LivingRoomIcon />} title="2 Living Room" />

export default PropertyCard;
