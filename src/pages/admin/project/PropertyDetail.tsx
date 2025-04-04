import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import PropertyFeature from "@/components/projects/properties/PropertyFeature";

import { Button } from "@/components/ui/button";
import clientBook from "@/assets/images/clientBook.png";
import WebAvatar from "@/assets/images/WebAvatar.png";
import ButtonComp from "@/components/general/ButtonComp";
import ReusableDialog from "@/components/general/ReuseableDialog";
import { useState } from "react";
import ClientDetailModal from "@/components/clientDetail/ClientDetailModal";
import PropertyGallery from "@/components/projects/properties/PropertyGallery";
import gall1 from "@/assets/images/gallery/gall1.png";
// import gall2 from "@/assets/images/gallery/gall2.png";
// import gall3 from "@/assets/images/ProjectHouse1.png";
import PaymentDetailModal from "@/components/clientDetail/PaymentDetailModal";
// import AddClient from "../clientDetail/AddClient";
import CreateProperty from "@/components/projects/properties/CreateProperty";
import {
  Amenity,
  PropertyType,
} from "@/hooks/api/queries/projects/property/getProperty";
import useGetSingleProperty from "@/hooks/api/queries/projects/property/getSingleProperty";
import { useParams } from "react-router-dom";
import AddPropertyClient from "@/components/projects/properties/AddPropertyClient";
import { ClientType } from "@/hooks/api/queries/clients/getClients";
import usegetProjectById from "@/hooks/api/queries/projects/getProjectById";

const PropertyDetail = () => {
  // const client: boolean = true;

  const { id2 } = useParams<{ id2: string }>();

  const [clientDetail, setClientDetail] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState(false);
  const [addClient, setAddClient] = useState(false);

  const { data: propertySingle, isPending } = useGetSingleProperty(id2 ?? "");


  const { data: project } = usegetProjectById(id2 ?? "");

  console.log(propertySingle, "propertySingle");

  const [editProp, setEditProp] = useState(false);
  const [editProperty, setEditProperty] = useState<PropertyType | null>(null);

  const handleModalClose = () => {
    setEditProperty(null);
    setEditProp(false);
  };

  const handleEdit = (property: PropertyType) => {
    setEditProperty(property);
    setEditProp(true);
  };

  if (isPending) {
    return <div className="text-center my-5">Loading...</div>;
  }
  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo={`${project?.name}`}
        routeThree="Properties"
      />
      <Container className="my-5">
        <div className="h-full">
          <PropertyGallery
            id={` 1`}
            allImageSets={[
              {
                images: propertySingle?.photos
                  ? propertySingle?.photos
                  : [gall1, gall1, gall1, gall1, gall1, gall1, gall1],
                // images: [gall1, gall2, gall3, gall1, gall2],
              },
            ]}
            isNotStarLot={true}
            backoffice={false}
            showNavigation={false}
            dynamicHeight={false}
          />
        </div>
        <section className="md:flex justify-between my-5">
          <div className="md:w-[54%] ">
            <aside className="flex justify-between items-center my-4">
              <h1 className="text-xl font-bold">{propertySingle?.name}</h1>
              <Button
                onClick={() => propertySingle && handleEdit(propertySingle)}
                className="bg-white border rounded-[8px] text-black"
              >
                Edit Detail
              </Button>
            </aside>
            <section>
              <h2 className="font-semibold my-2">Property Description</h2>
              <h3 className="text-darkGrey text-sm my-2">
                {propertySingle?.description}
              </h3>
              <h2 className="font-semibold my-2">Amenities</h2>
              <div className="flex flex-wrap gap-x-8 items-center">
                {propertySingle?.amenities?.map((amenity: Amenity) => {
                  return (
                    <PropertyFeature
                      amenity={amenity}
                      title={amenity.amenityId?.name}
                    />
                  );
                })}
                {/* <PropertyFeature title="4 Bedroom" />
                <PropertyFeature title="2 S/Pool" />
                <PropertyFeature title="2 Bathrooms" />
                <PropertyFeature title="3 Car Parking" />
                <PropertyFeature title="2 Living Room" /> */}
              </div>
              <h2 className="font-semibold my-2">Dwelling Type</h2>
              <p className="text-darkGrey text-sm ">
                {propertySingle?.dwellingType
                  ? propertySingle?.dwellingType?.split("_").join(" ")
                  : ""}
              </p>
            </section>
          </div>

          {/* {client section} */}
          <div className="md:w-[44%] mt-4 md:mt-0 bg-[#F7F8FA] rounded-[8px] p-3">
            <h3 className="font-semibold"> Client Details</h3>
            {propertySingle?.clientId ? (
              <section>
                <div className="flex items-center gap-6 my-5">
                  <img src={WebAvatar} alt="WebAvatar" />
                  <aside>
                    <h5 className="font-semibold">
                      {propertySingle?.clientId?.firstName}
                    </h5>
                    <p className="font-semibold text-darkGrey">
                      {propertySingle?.clientId?.email}
                    </p>
                  </aside>
                </div>
                <div className="sm:flex gap-6 items-center">
                  <ButtonComp
                    onClick={() => setPaymentDetail(true)}
                    text="View Payments"
                    className="w-fit"
                  />
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
                <ButtonComp
                  onClick={() => setAddClient(true)}
                  text="Add Client"
                />
              </div>
            )}
          </div>
        </section>
      </Container>
      {
        <ReusableDialog
          title="Add Client"
          open={addClient}
          onOpenChange={setAddClient}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddPropertyClient
              propertySingleId={propertySingle?._id ?? ""}
              handleModalClose={() => {
                setAddClient(false);
              }}
            />
          </div>
        </ReusableDialog>
      }
      {
        <ReusableDialog
          title="Client Information"
          open={clientDetail}
          onOpenChange={setClientDetail}
          className="sm:max-w-[60vw]"
        >
          <div>
            <ClientDetailModal
              clientInfo={propertySingle?.clientId as ClientType}
            />
          </div>
        </ReusableDialog>
      }
      {
        <ReusableDialog
          title="Payment Information"
          open={paymentDetail}
          onOpenChange={setPaymentDetail}
          className="sm:max-w-[60vw]"
        >
          <div>
            <PaymentDetailModal
              clientId={propertySingle?.clientId?._id ?? ""}
            />
          </div>
        </ReusableDialog>
      }
      {
        <ReusableDialog
          title="Edit New Property"
          // title={editProperty ? "Edit Property" : "Create new Property"}
          open={editProp}
          onOpenChange={setEditProp}
          className="sm:max-w-[60vw]"
        >
          <div>
            <CreateProperty
              defaultValues={editProperty || undefined}
              isEditMode={!!editProperty}
              handleModalClose={handleModalClose}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default PropertyDetail;
