import { Icon } from "../Icon";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="w-[100dvw] h-[100dvh] main-bg fixed top-0 left-0 z-50 ">
      <div className="w-full h-full flex justify-center items-center relative p-12">
        <Icon
          name={"close"}
          className="absolute top-4 right-4 text-white cursor-pointer"
          size={32}
          onClick={handleClose}
        />
        {children}
      </div>
    </div>
  );
};
