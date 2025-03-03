import StatCard, { StatCardProps } from "@/components/dashboard/StatCard";
import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import SearchInputComp from "@/components/input/SearchInputComp";
import Container from "@/components/layout/Container";
import CreateProperty from "@/components/projects/properties/CreateProperty";
import PropertyCard from "@/components/projects/properties/PropertyCard";
import TopHeader from "@/components/ui/TopHeader";
import { PageTypes } from "@/utils";
import { useState } from "react";

const StatData: StatCardProps[] = [
  {
    label: "Total Properties",
    value: "2",
  },
  {
    label: "Property Sold",
    value: "2",
  },
  {
    label: "Available Property",
    value: "2",
  },
  {
    label: "Total Expected Amount (₦)",
    value: "440m",
  },
  {
    label: "Total Amount Paid (₦)",
    value: "16m",
  },
  {
    label: "Total Expected Balance (₦)",
    value: "27m",
  },
];

const Properties = () => {
  const [createProperty, setCreateProperty] = useState(false);

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
            onClick={() => setCreateProperty(true)}
            showIcon
          />
          <SearchInputComp pageKey={PageTypes?.PROJECTS} />
          <section className="my-10 grid gap-6 md:grid-cols-3 grid-cols-1">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </section>

          {
            <ReusableDialog
              title="Create New Property"
              open={createProperty}
              onOpenChange={setCreateProperty}
              className="sm:max-w-[60vw]"
            >
              <div>
                <CreateProperty />
              </div>
            </ReusableDialog>
          }
        </Container>
      </main>
    </div>
  );
};

export default Properties;
