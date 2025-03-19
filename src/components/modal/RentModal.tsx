import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";

export const RentModal = () => {
  const rentModal = useRentModal();

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel="Submit"
      title="Airbnb your home"
    />
  );
};
