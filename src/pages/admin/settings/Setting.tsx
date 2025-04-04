import ProjectBoxCard from "@/components/projects/ProjectBoxCard";
import { DetailItemType } from "../project/ProjectDetails";
// import Container from "@/components/layout/Container";
import {
  materialIcon,
  propertyIcon,
  taskIcon,
  unitIcon,
} from "@/components/ui/ColoredIcon";

const Setting = () => {
  const settingsItems: DetailItemType[] = [
    {
      title: "Materials",
      image: materialIcon,
      link: "/admin/settings/materials",
    },
    {
      title: "Amenities",
      image: propertyIcon,
      link: "/admin/settings/amenities",
    },
    { title: "Units", image: unitIcon, link: "/admin/settings/units" },
    { title: "Labor", image: taskIcon, link: "/admin/settings/labor" },
  ];
  return (
    // <Container>
      <section className="w-10/12 mx-auto my-10 flex flex flex-wrap gap-2 justify-between gap-4">
        {settingsItems?.map((item, index) => (
          <ProjectBoxCard key={index} items={item} />
        ))}
      </section>
    // </Container>
  );
};

export default Setting;
