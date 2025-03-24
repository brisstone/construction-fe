import ProjectBoxCard from "@/components/projects/ProjectBoxCard"
import { DetailItemType } from "../project/ProjectDetails";
import houseicon from "@/assets/images/houseicon.svg";
import tasksIcon from "@/assets/images/tasksIcon.svg";
import materialIcon from "@/assets/images/materialIcon.svg";
import Container from "@/components/layout/Container";


const Setting = () => {
    const settingsItems: DetailItemType[] = [
       
    { title: "Materials", image: materialIcon, link: "/admin/settings/materials" },
    { title: "Amenities", image: houseicon, link: "/admin/settings/amenities" },
    { title: "Units", image: tasksIcon, link: "/admin/settings/units" },
    { title: "Labor", image: tasksIcon, link: "/admin/settings/labor" },
      ];
  return (
    <Container><section className="w-10/12 mx-auto my-10 grid grid-cols-2 gap-y-12 md:grid-cols-4">
    {settingsItems?.map((item, index) => (
      <ProjectBoxCard key={index} items={item} />
    ))}
  </section></Container>
  )
}

export default Setting