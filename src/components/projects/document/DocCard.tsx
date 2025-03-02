import Filetypeicon from "@/assets/images/Filetypeicon.png";
import { ThreeDotsHorizontal } from "@/assets/svgComp/General";
const DocCard = () => {
  return (
    <div className="border relative p-3 rounded-[4px]">
      <div className="absolute top-2 right-3 gap-2">
        <button className="rotate-180">
          <ThreeDotsHorizontal />
        </button>
      </div>
      <div className="h-[140px] w-[160px] bg-[#F7F8FA] rounded-[4px] flex justify-center items-center">
        <img src={Filetypeicon} alt="Filetypeicon" />
      </div>
      <h3 className="text-sm font-semibold my-2">A legal Document</h3>
      <p className="text-xs">12/12/2025</p>
    </div>
  );
};

export default DocCard;
