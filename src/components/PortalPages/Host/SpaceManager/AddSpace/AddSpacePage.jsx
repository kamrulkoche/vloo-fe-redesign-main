import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import AddSpaceStepper from "./AddSpaceStepper";

const AddSpacePage = () => {
  return (
    <div>
      <PortalBackButton title="Add Space" />

      <div className="rounded-[20px] bg-[#0A2A3C] p-4 sm:p-8">
        <AddSpaceStepper />
      </div>
    </div>
  );
};

export default AddSpacePage;
