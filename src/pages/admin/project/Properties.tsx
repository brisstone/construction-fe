import StatCard, { StatCardProps } from "@/components/dashboard/StatCard";
import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import SearchInputComp from "@/components/input/SearchInputComp";
import Container from "@/components/layout/Container";
import CreateProperty from "@/components/projects/properties/CreateProperty";
import PropertyCard from "@/components/projects/properties/PropertyCard";
import TopHeader from "@/components/ui/TopHeader";
import useGetProperty, {
  PropertyType,
} from "@/hooks/api/queries/projects/property/getProperty";
import useGetPropertyMetrics from "@/hooks/api/queries/projects/property/getPropertyMetrics";
import { formatNumberWithCommaDecimal, PageTypes } from "@/utils";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Properties = () => {
  const [createProperty, setCreateProperty] = useState(false);

  const [editProperty, setEditProperty] = useState<PropertyType | null>(null);

  const { id } = useParams<{ id: string }>();

  const { data: property, isPending } = useGetProperty(id ?? "");

  const { data: propertyMetrics, isPending: isLoading } = useGetPropertyMetrics(
    id ?? ""
  );

  console.log(isLoading, "isLoading");

  const StatData: StatCardProps[] = [
    {
      label: "Total Properties",
      value: `${propertyMetrics?.data?.totalProperties ?? 0}`,
    },
    {
      label: "Property Sold",
      value: `${propertyMetrics?.data?.soldProperties ?? 0}`,
    },
    {
      label: "Available Property",
      value: `${propertyMetrics?.data?.availableProperties ?? 0}`,
    },
    {
      label: "Total Expected Amount (₦)",
      value: `${formatNumberWithCommaDecimal(propertyMetrics?.data?.totalExpectedAmount ?? 0)}`,
    },
    {
      label: "Total Amount Paid (₦)",
      value: `${formatNumberWithCommaDecimal(propertyMetrics?.data?.totalAmountPaid ?? 0)}`,
    },
    {
      label: "Total Expected Balance (₦)",
      value: `${formatNumberWithCommaDecimal(
        propertyMetrics?.data?.totalExpectedBalance ?? 0
      )}`,
    },
  ];

  const propertyData = property?.data;

  const handleModalClose = () => {
    setCreateProperty(false);
    setEditProperty(null);
  };

  const handleEdit = (property: PropertyType) => {
    setEditProperty(property);
    setCreateProperty(true);
  };

  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Properties"
      />
      <main>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 my-4">
          {StatData?.map((item: StatCardProps) => {
            return <StatCard StatData={item} />;
          })}
        </div>

        <div className="p-5 rounded-xl bg-white">
          <p className="font-bold ">Properties Description</p>
          <h3 className="text-2SM  text-darkGrey my-2">
            5 Bedroom Stand-alone Duplex with BQ (House A05)
          </h3>
        </div>

        <Container className="mt-5">
          <TopHeader
            className="my-5"
            title="Property List"
            text="Add Property"
            onClick={() => {
              setEditProperty(null);
              setCreateProperty(true);
            }}
            showIcon
          />
          <SearchInputComp pageKey={PageTypes?.PROJECTS} />

          <section className="my-10 grid gap-6 md:grid-cols-3 grid-cols-1">
            {isPending ? (
              <div>Loading...</div>
            ) : propertyData?.length !== 0 ? (
              propertyData?.map((propertyItem) => (
                <PropertyCard onEdit={handleEdit} propertyItem={propertyItem} />
              ))
            ) : (
              <div>No projects found</div>
            )}
            {/* <PropertyCard />
            <PropertyCard />
            <PropertyCard /> */}
          </section>

          {
            <ReusableDialog
              title={editProperty ? "Edit Property" : "Create new Property"}
              open={createProperty}
              onOpenChange={setCreateProperty}
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
        </Container>
      </main>
    </div>
  );
};

export default Properties;
