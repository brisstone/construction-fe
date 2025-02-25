import BillTable from "./BillTable";

const BillComp = () => {
  return (
    <div className="my-5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg text-textShade">Summary</p>
      </div>
      <section>
        <BillTable />
      </section>
    </div>
  );
};

export default BillComp;
