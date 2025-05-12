"use client";

import StepperComponent from "@/components/CustomComponents/StepperComponent";
import useSpaceShow from "@/hooks/QueryHooks/Host/SpaceManager/Space/useSpaceShow";
import useSpaceStepMutate from "@/hooks/QueryHooks/Host/SpaceManager/useSpaceStepMutate";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const AddSpaceStepper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const urlStep = searchParams.get("step");

  const [activeStep, setActiveStep] = useState(0);
  const [spaceId, setSpaceId] = useState(null);
  const [spaceUuid, setSpaceUuid] = useState(null);
  const [spaceData, setSpaceData] = useState(null);

  const steps = ["Space detail", "Workspace detail", "Availability"];

  const {
    data: spaceDetails,
    refetch,
    isPending: ShowPending,
  } = useSpaceShow(uuid);
  const { mutate: updateStep } = useSpaceStepMutate();

  // Update URL while preserving the base path
  const updateURL = (newStep) => {
    if (uuid) {
      router.push(
        `/pro/portal/space-manager/add-space?uuid=${uuid}&step=${newStep + 1}`,
      );
    }
  };

  // Set initial step based on URL and API data
  useEffect(() => {
    if (urlStep && spaceDetails?.data) {
      const stepNumber = parseInt(urlStep) - 1;
      if (stepNumber >= 0 && stepNumber < steps.length) {
        setActiveStep(stepNumber);
        setSpaceId(spaceDetails.data.id);
        setSpaceUuid(spaceDetails.data.uuid);
        setSpaceData(spaceDetails.data);
      }
    }
  }, [urlStep, spaceDetails]);

  const handleStepUpdate = (stepNumber) => {
    if (uuid) {
      updateStep(
        { uuid, step: stepNumber.toString() },
        {
          onSuccess: () => {
            updateURL(stepNumber - 1);
            refetch();
          },
          onError: (error) => {
            console.error("Error updating step:", error);
          },
        },
      );
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
    updateURL(step);
  };

  const handleSpaceCreated = (id, uuid, data) => {
    setSpaceId(id);
    setSpaceUuid(uuid);
    setSpaceData(data);
    setActiveStep(1);
    handleStepUpdate(2); // Update to step 2
  };

  const handleWorkspaceCreated = () => {
    setActiveStep(2);
    handleStepUpdate(3); // Update to step 3
  };

  const handleBack = (step) => {
    handleStepChange(step);
    handleStepUpdate(step + 1); // Update to previous step
  };

  return (
    <div>
      <div className="pb-4 sm:pb-[53px]">
        <StepperComponent steps={steps} activeStep={activeStep} />
      </div>

      {activeStep === 0 && (
        <Step1
          onComplete={handleSpaceCreated}
          initialData={spaceData}
          showSpace={spaceDetails}
          ShowPending={ShowPending}
          uuid={uuid}
        />
      )}

      {activeStep === 1 && spaceId && (
        <Step2
          spaceId={spaceId}
          spaceUuid={spaceUuid}
          onBack={() => handleBack(0)}
          onComplete={handleWorkspaceCreated}
          initialWorkspaces={spaceDetails?.data?.work_space}
        />
      )}

      {activeStep === 2 && spaceId && (
        <Step3
          spaceId={spaceId}
          onBack={() => handleBack(1)}
          spaceUuid={uuid}
          initialAvailability={spaceDetails?.data?.space_available_date?.[0]}
        />
      )}
    </div>
  );
};

export default AddSpaceStepper;
