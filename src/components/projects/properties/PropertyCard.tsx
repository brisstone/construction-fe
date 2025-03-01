import PropertyHouse from "@/assets/images/PropertyHouse.png";
import PropertyFeature from "./PropertyFeature";
import {
  BathroomIcon,
  BedroomIcon,
  CarIcon,
  LivingRoomIcon,
  PoolIcon,
} from "@/assets/svgComp/PropertyIcon";
import { ThreeDotsVertical } from "@/assets/svgComp/General";

const PropertyCard = () => {
  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
        <button className=" bg-white rounded-full shadow-md">
          <ThreeDotsVertical />
        </button>
      </div>
      <div className="">
        <img src={PropertyHouse} alt="Project" className="w-full h-auto" />
      </div>
      <section>
        <h3 className="font-bold text-sm my-2">
          5 Bedroom Stand-alone Duplex with BQ (House A01)
        </h3>
        <div className="flex flex-wrap gap-2 items-center">
          <PropertyFeature icon={<BedroomIcon />} title="4 Bedroom" />
          <PropertyFeature icon={<PoolIcon />} title="2 S/Pool" />
          <PropertyFeature icon={<BathroomIcon />} title="2 Bathrooms" />
          <PropertyFeature icon={<CarIcon />} title="3 Car Parking" />
          <PropertyFeature icon={<LivingRoomIcon />} title="2 Living Room" />
        </div>
      </section>
    </div>
  );
};

export default PropertyCard;
