import pdfIcon from "@/assets/images/pdfImage.png";
import { DownloadIcon } from "@/assets/svgComp/General";

const PdfDownload = ({ download }: { download?: boolean }) => {
  return (
    <div className="flex justify-between items-center">
      <aside className="flex items-center gap-4">
        <img src={pdfIcon} alt="odfIcon" />
        <div>
          <h3 className="font-medium text-xs">Mabushi site report</h3>
          <p className="text-[9px] text-textNude">Created on 12/10/2022 </p>
        </div>
      </aside>
      {download ? (
        <DownloadIcon className="cursor-pointer" />
      ) : (
        <p className="font-medium text-xs">Tc#523-wo</p>
      )}
    </div>
  );
};

export default PdfDownload;
