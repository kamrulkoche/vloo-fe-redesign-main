const StepperComponent = ({ steps, activeStep }) => {
  return (
    <div className="relative flex w-full">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex w-full flex-1 flex-col ${
            index === 0
              ? "items-start"
              : index === steps.length - 1
                ? "items-end"
                : "items-center"
          }`}
        >
          <div className="relative flex w-full items-center">
            {/* Left line */}
            {index === 0 ? (
              <div
                className={`absolute left-10 right-1/2 h-[3px] ${index < activeStep ? "bg-[#006988]" : "bg-[#DEDEDE]"}`}
              />
            ) : (
              <div
                className={`absolute left-[-50%] right-1/2 h-[3px] ${index <= activeStep ? "bg-[#006988]" : "bg-[#DEDEDE]"}`}
              />
            )}

            {/* Dot container with proper positioning */}
            <div
              className={`relative ${index === 0 ? "left-10" : index === 1 ? "left-0" : "-left-10"} z-[5] flex ${
                index === 0
                  ? "justify-start"
                  : index === steps.length - 1
                    ? "w-full justify-end"
                    : "w-full justify-center"
              }`}
            >
              <div
                className={`h-3 w-3 rounded-full ${
                  index <= activeStep ? "bg-[#006988]" : "bg-[#868686]"
                }`}
              />
            </div>

            {/* Right line */}
            {index === steps.length - 1 ? (
              <div
                className={`absolute left-1/2 right-10 h-[3px] ${index <= activeStep ? "bg-[#006988]" : "bg-[#DEDEDE]"}`}
              />
            ) : (
              <div
                className={`absolute left-1/2 right-[-50%] h-[3px] ${index < activeStep ? "bg-[#006988]" : "bg-[#DEDEDE]"}`}
              />
            )}
          </div>
          <span
            className={`mt-3 text-[16px] font-[500] leading-[22px] ${
              index <= activeStep ? "text-white" : "text-[#868686]"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepperComponent;
