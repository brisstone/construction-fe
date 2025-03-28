import FilterLayout from "@/components/general/FilterLayout";
import { PageTypes } from "@/utils";
import DocCard from "./DocCard";
import { DocumentType } from "@/hooks/api/queries/document/getProjectDocument";

const DocTab = ({ projDocData }: { projDocData: DocumentType[] }) => {
  return (
    <div>
      <FilterLayout pageKey={PageTypes?.PROJECTS} />
      <section className="grid grid-cols-5 gap-4">
        {projDocData?.map((item) => {
          return (
            <div>
              <DocCard documentItem={item} />
            </div>
          );
        })}

        {/* <DocCard />
        <DocCard />
        <DocCard />
        <DocCard /> */}
      </section>
    </div>
  );
};

export default DocTab;
