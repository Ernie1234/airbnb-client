import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../shared/Heading";
import { categoriesData } from "@/lib/contants";
import CategoryInput from "../nav/CategoryInput";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const rentModal = useRentModal();

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const actionlabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of this best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categoriesData.map((category) => (
          <div className="col-span-1" key={category.label}>
            <CategoryInput
              onClick={() => {}}
              selected={false}
              label={category.label}
              icon={category.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionlabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handlePreviousStep}
      secondaryActionLabel={secondaryActionLabel}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};
