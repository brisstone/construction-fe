import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import PropertyFeature from "@/components/projects/properties/PropertyFeature";
import {
  BathroomIcon,
  BedroomIcon,
  CarIcon,
  LivingRoomIcon,
  PoolIcon,
} from "@/assets/svgComp/PropertyIcon";
import { Button } from "@/components/ui/button";
const PropertyDetail = () => {
  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Properties"
      />
      <Container className="my-5">
        <div className="h-48 w-full rounded-[4px] flex bg-teal-400 justify-center items-center">
          Gallery
        </div>
        <section className="flex justify-between">
          <div className="w-[54%] ">
            <aside className="flex justify-between items-center my-4">
              <h1 className="text-xl font-bold">Mabushi Project Phase 1/A05</h1>
              <Button className="bg-white border rounded-[8px] text-black">
                Edit Detail
              </Button>
            </aside>
            <section>
              <h2 className="font-semibold my-2">Property Description</h2>
              <h3 className="text-darkGrey text-sm my-2">
                5 Bedroom Stand-alone Duplex with BQ (House A01)
              </h3>
              <h2 className="font-semibold my-2">Amenities</h2>
              <div className="flex flex-wrap gap-x-8 items-center">
                <PropertyFeature icon={<BedroomIcon />} title="4 Bedroom" />
                <PropertyFeature icon={<PoolIcon />} title="2 S/Pool" />
                <PropertyFeature icon={<BathroomIcon />} title="2 Bathrooms" />
                <PropertyFeature icon={<CarIcon />} title="3 Car Parking" />
                <PropertyFeature
                  icon={<LivingRoomIcon />}
                  title="2 Living Room"
                />
              </div>
              <h2 className="font-semibold my-2">Dwelling Type</h2>
              <p className="text-darkGrey text-sm ">Single</p>
            </section>
          </div>
          <div className="w-[44%] h-1 bg-red-500"></div>
        </section>
      </Container>
    </div>
  );
};

export default PropertyDetail;
