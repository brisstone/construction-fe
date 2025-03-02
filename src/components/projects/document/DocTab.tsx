import FilterLayout from "@/components/general/FilterLayout";
import { PageTypes } from "@/utils";
import DocCard from "./DocCard";

const DocTab = () => {
  return (
    <div>
      <FilterLayout pageKey={PageTypes?.PROJECTS} />
      <section className="grid grid-cols-5 gap-4">
        <DocCard />
        <DocCard />
        <DocCard />
        <DocCard />
        <DocCard />
      </section>
    </div>
  );
};

export default DocTab;
