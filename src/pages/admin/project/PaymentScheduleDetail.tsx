import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import samplepassport from "@/assets/images/samplepassport.png";

const PaymentScheduleDetail = () => {
  const clientDetails = [
    { title: "Contractor/Vendor:", content: "Dangote Cement." },
    { title: "Generated Date", content: "01/11/2022" },
    { title: "Amount of Payment Due:", content: "₦ 1,800,000.00" },
    { title: "Amount Paid:", content: "₦ 1,800,000.00" },
    { title: "Due Date For Payment:", content: "30/10/22" },
    { title: "Actual Payment Date:", content: "01/11/2022" },
    { title: "Type of Payment Schedule:", content: "Completion" },
    { title: "Payment Method:", content: "Transfer" },
    { title: "Expense Type:", content: "Dangote Cement." },
    { title: "Balance:", content: "₦ 0.00" },
    { title: "Payment Status:", content: "Complete" },
  ];

  return (
    <div>
      <RouteChain routeOne="Projects" routeTwo="Schedule View" />
      <Container className="my-5">
        <aside className="sm:flex items-center justify-between">
          <p className="font-medium sm:text-lg text-sm text-textShade">
            View Payment Schedule
          </p>
          {/* <ButtonComp text="" className="w-fit mt-1 sm:mt-0" /> */}
        </aside>
        <section className="my-4 py-3 border-y">
          <div className="grid grid-cols-2 gap-3 my-5">
            {clientDetails.map((item, index) => (
              <div key={index} className="text-sm">
                <span className="font-semibold mr-3">{item.title}: </span>
                <span className="text-xs text-darkGrey">{item.content}</span>
              </div>
            ))}
          </div>
          <div className="my-3">
            <h3 className="font-medium">Description of Work or Material:</h3>
            <p className="w-1/2 text-xs text-textShade">
              Supply of 200 Bags of Cement
            </p>
          </div>
        </section>
        <section className="">
          <div>
            <h3 className="font-bold text-lg mb-3">Receipt of Payment</h3>
            <img src={samplepassport} alt="samplepassport" />
          </div>
          <aside className="border my-5 flex items-center gap-5 p-5 rounded-[14px]">
            <h3 className="text-lg font-semibold">Notes:</h3>
            <p>
              This is just a sample note that can be anything like comments on
              the payment, supplieror materials supplied.
            </p>
          </aside>
        </section>
      </Container>
    </div>
  );
};

export default PaymentScheduleDetail;
