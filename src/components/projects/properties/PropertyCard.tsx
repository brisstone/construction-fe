import PropertyHouse from "@/assets/images/PropertyHouse.png";
import PropertyFeature from "./PropertyFeature";
import {
  BathroomIcon,
  BedroomIcon,
  CarIcon,
  LivingRoomIcon,
  PoolIcon,
} from "@/assets/svgComp/PropertyIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThreeDotsVertical } from "@/assets/svgComp/General";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Amenity,
  PropertyType,
} from "@/hooks/api/queries/projects/property/getProperty";

const PropertyCard = ({ propertyItem }: { propertyItem: PropertyType }) => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  console.log(propertyItem, "propertyItem");
  return (
    <section
      // to={`/admin/project/${id}/properties/${propertyItem?._id}`}
      onClick={() => {
        navigate(`/admin/project/${id}/properties/${propertyItem?._id}`);
      }}
      className="relative group"
    >
      <div className="absolute top-2 right-2 group-hover:flex gap-2">
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
              <p className="cursor-pointer">Edit</p>
              <p
                // onClick={() => handleDelete(project?._id)}
                className="cursor-pointer"
              >
                Delete
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="">
        <img
          src={propertyItem?.photos[0]}
          alt="Project"
          className="w-full h-auto"
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
  );
};

// <PropertyFeature icon={<BedroomIcon />} title="4 Bedroom" />
// <PropertyFeature icon={<PoolIcon />} title="2 S/Pool" />
// <PropertyFeature icon={<BathroomIcon />} title="2 Bathrooms" />
// <PropertyFeature icon={<CarIcon />} title="3 Car Parking" />
// <PropertyFeature icon={<LivingRoomIcon />} title="2 Living Room" />

export default PropertyCard;
