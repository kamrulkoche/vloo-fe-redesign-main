import ConversionReportsChart from "@/components/Charts/ConversionReportsChart";
import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const graphData = [
  0, 150, 180, 250, 180, 300, 250, 280, 400, 250, 300, 200, 100,
];

const ConversionReportsPage = () => {
  return (
    <div>
      <PortalBackButton title="Conversion Reports" />

      <div>
        <p className="mb-5 text-[18px] font-[500] leading-[24px] text-white">
          Space visits
        </p>
        <div className="rounded-[10px] bg-[#032031] px-7 py-5">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-[24px] font-[700] leading-[34px] text-[#006988]">
                1250
              </p>
              <p className="text-[13px] font-[500] leading-[18px] text-[#868686]">
                Total visits this month
              </p>
            </div>
            <div className="flex items-center gap-14">
              <RadioGroup className="flex items-center gap-3" defaultValue="">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="border border-[#868686] text-[#868686]"
                    value="default"
                    id="r1"
                  />
                  <Label className="text-[#868686]" htmlFor="r1">
                    Yearly
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="border border-[#868686] text-[#868686]"
                    value="comfortable"
                    id="r2"
                  />
                  <Label className="text-[#868686]" htmlFor="r2">
                    Monthly
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="border border-[#868686] text-[#868686]"
                    value="compact"
                    id="r3"
                  />
                  <Label className="text-[#868686]" htmlFor="r3">
                    Weekly
                  </Label>
                </div>
              </RadioGroup>

              <div className="flex h-[38px] w-[234px] items-center justify-between rounded-[10px] border border-[#757575] bg-[#0A2A3C] px-5">
                <p className="text-[13px] font-[500] leading-[18px] text-[#868686]">
                  Selected date:
                </p>
                <p className="cursor-pointer text-[13px] font-[500] leading-[18px] text-[#00A481]">
                  Select
                </p>
              </div>
            </div>
          </div>

          <ConversionReportsChart graphData={graphData} />
        </div>
      </div>
    </div>
  );
};

export default ConversionReportsPage;
