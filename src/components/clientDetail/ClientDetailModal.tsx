import WebAvatar from "@/assets/images/WebAvatar.png";
import samplepassport from "@/assets/images/samplepassport.png";
import { ClientType } from "@/hooks/api/queries/clients/getClients";
import { format } from "date-fns";

const ClientDetailModal = ({ clientInfo }: { clientInfo: ClientType }) => {
  const clientDetails = [
    { title: "Name", content: `${clientInfo?.firstName} ${clientInfo?.lastName}` },
    { title: "Email", content: clientInfo?.email || "N/A" },
    { title: "Address", content: clientInfo?.geometry?.address || "N/A" },
    { title: "Phone No", content: clientInfo?.phoneNumber || "N/A" },
    { title: "Client Type", content: clientInfo?.type || "N/A" },
    { title: "Occupation", content: clientInfo?.occupation || "N/A" },
    { 
      title: "Birth Date", 
      content: clientInfo?.dob ? format(new Date(clientInfo.dob), "do 'of' MMM, yyyy") : "N/A" 
    },
  ];

  return (
    <div>
      <img src={WebAvatar} alt="WebAvatar" />
      <section>
        <div className="grid grid-cols-2 gap-3 my-5">
          {clientDetails.map((item, index) => (
            <div key={index} className="text-sm">
              <span className="font-semibold mr-3">{item.title}: </span>
              <span className="text-xs text-darkGrey">{item.content}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Proof of Identification</h3>
          <img src={samplepassport} alt="samplepassport" />
        </div>
      </section>
    </div>
  );
};

export default ClientDetailModal;
