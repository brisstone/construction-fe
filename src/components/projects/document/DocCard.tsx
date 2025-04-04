import Filetypeicon from "@/assets/images/Filetypeicon.png";
import { ThreeDotsHorizontal } from "@/assets/svgComp/General";
import { DocumentType } from "@/hooks/api/queries/document/getProjectDocument";
import { format } from "date-fns";
const DocCard = ({ documentItem }: { documentItem: DocumentType }) => {
  return (
    <div
      className="border relative p-3 rounded-[4px] cursor-pointer"
      onClick={() => {
        if (documentItem?.url) {
          window.open(documentItem.url, "_blank");
        }
      }}
    >
      <div className="absolute top-2 right-3 gap-2">
        <button className="rotate-180">
          <ThreeDotsHorizontal />
        </button>
      </div>
      <div className="h-[140px] w-[160px] bg-[#F7F8FA] rounded-[4px] flex justify-center items-center">
        <img
          src={
            documentItem?.type?.startsWith("application")
              ? Filetypeicon
              : documentItem?.url
          }
          alt="Filetypeicon"
          className="w-fit h-fit"
        />
      </div>
      <h3 className="text-sm font-semibold my-2">
        {" "}
        {documentItem?.type?.startsWith("application")
          ? "A Document"
          : "Image"}
      </h3>
      <p className="text-xs">
        {documentItem?.createdAt
          ? format(new Date(documentItem.createdAt), "MM/dd/yy")
          : ""}
      </p>
    </div>
  );
};

export default DocCard;

{
  /* <a href={documentItem.url} target="_blank" rel="noopener noreferrer">
  Open Document
</a>; */
}
