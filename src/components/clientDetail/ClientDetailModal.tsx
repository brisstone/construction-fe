import WebAvatar from "@/assets/images/WebAvatar.png";
import samplepassport from "@/assets/images/samplepassport.png";

const ClientDetailModal = () => {
  const clientDetails = [
    { title: "Name", content: "Engr. Joseph Labar" },
    { title: "Email ", content: "jlabar@gmail.com" },
    { title: "Address", content: "2 Julius Berger Estate" },
    { title: "Phone No", content: "08031234567" },
    { title: "Client Type", content: "Individual" },
    { title: "Occupation", content: "Engineer" },
    { title: "Birth Date", content: "14/04/1982" },
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
