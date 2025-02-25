import { ReactNode } from "react";

type Header = {
  content: ReactNode;
  align?: "left" | "center" | "right"; 
};

type TableProps<T> = {
  headers: Header[]; 
  data: T[]; 
  renderRow: (item: T, index: number) => ReactNode; 
  className?: string; 
};

const GenericTable = <T,>({
  headers,
  data,
  renderRow,
  className,
}: TableProps<T>) => {
  return (
    <div
      className={`overflow-x-auto  overflow-y-scroll min-h-[20vh] max-h-[50vh] scrollbar-hidden ${className}`}
    >
      <table className="min-w-full table-auto tablingTable bg-borderColor border ">
        <thead className="text-left z-[0] sticky top-0 bg-[#FAFAFA] ">
          <tr className=" h-[40px] text-sm  ">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b text-xs font-semibold text-nowrap"
              >
                {header?.content}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white ">
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
