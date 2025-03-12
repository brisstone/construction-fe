
import ButtonComp from "../general/ButtonComp";
import InputField from "../input/InputField";
import { Button } from "../ui/button";

const AddCompany = ({
  setAddCompany,
  
}: {
  setAddCompany: (value: boolean) => void;
 
}) => {


 

  return (
    <div>
      <section className="my-3">
        <InputField
        
          label="Company Name"
          name="name"
          placeholder="Enter Company Name"
         
        />
        <InputField
          
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter email address"
          
        />
{/* 
        <div className="mb-4">
          <p className="text-sm font-semibold text-grey mb-2">
            Company Address
          </p>
          <div>
            <GooglePlacesInput
              defaultValue={defaultValues?.locationId?.geometry?.address}
              apiKey={import.meta.env.VITE_GOOGLE_APIKEY}
              onSelect={handleAddressSelect}
            />
          </div>
        </div> */}

        <div className="flex gap-3 items-center justify-self-end mt-4">
          <Button
            onClick={() => {
              setAddCompany(false);
            }}
            className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black"
          >
            Cancel
          </Button>
          <ButtonComp
           
            text={"Add Company" }
            className="w-fit"
          />
        </div>
      </section>
    </div>
  );
};

export default AddCompany;
