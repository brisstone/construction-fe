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
import clientBook from "@/assets/images/clientBook.png";
import WebAvatar from "@/assets/images/WebAvatar.png";
import ButtonComp from "@/components/general/ButtonComp";
import ReusableDialog from "@/components/general/ReuseableDialog";
import { useState } from "react";
import ClientDetailModal from "@/components/clientDetail/ClientDetailModal";
import PropertyGallery from "@/components/projects/properties/PropertyGallery";
import gall1 from "@/assets/images/gallery/gall1.png";
import gall2 from "@/assets/images/gallery/gall2.png";
import gall3 from "@/assets/images/ProjectHouse1.png";



const PropertyDetail = () => {
  const client: boolean = true;

  const [clientDetail, setClientDetail] = useState(false);
  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Properties"
      />
      <Container className="my-5">
        <div >
          <PropertyGallery
            id={` 1`}
            allImageSets={[
              {
                images: [gall1, gall2, gall3, gall1, gall2]
              },
            ]}
            isNotStarLot={false}
            backoffice={true}
            showNavigation={true}
            dynamicHeight={true}
          />
        </div>
        <section className="md:flex justify-between my-5">
          <div className="md:w-[54%] ">
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

          {/* {client section} */}
          <div className="md:w-[44%] mt-4 md:mt-0 bg-[#F7F8FA] rounded-[8px] p-3">
            <h3 className="font-semibold"> Client Details</h3>
            {client ? (
              <section>
                <div className="flex items-center gap-6 my-5">
                  <img src={WebAvatar} alt="WebAvatar" />
                  <aside>
                    <h5 className="font-semibold">Engr. Joseph Labar</h5>
                    <p className="font-semibold text-darkGrey">
                      jlabar@gmail.com
                    </p>
                  </aside>
                </div>
                <div className="sm:flex gap-6 items-center">
                  <ButtonComp text="View Payments" className="w-fit" />
                  <Button
                    onClick={() => setClientDetail(true)}
                    className="bg-transparent border rounded-[4px] mt-2 sm:mt-0 text-black hover:text-white"
                  >
                    Clients/Sales Details
                  </Button>
                </div>
              </section>
            ) : (
              <div className="flex flex-col justify-center mt-5 items-center gap-5">
                <img src={clientBook} alt="clientBook" />
                <ButtonComp text="Add Client" />
              </div>
            )}
          </div>
        </section>
      </Container>
      {
        <ReusableDialog
          title="Client Information"
          open={clientDetail}
          onOpenChange={setClientDetail}
          className="sm:max-w-[60vw]"
        >
          <div>
            <ClientDetailModal />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default PropertyDetail;
