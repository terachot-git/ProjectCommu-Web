import React from 'react';
import Modal from 'react-modal';
import { LoaderCircle } from 'lucide-react';

const LoadingModal = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      contentLabel="Loading Process" 
      ariaHideApp={false} 
      overlayClassName="fixed  backdrop-blur-md inset-0   flex justify-center items-center z-50"
      className="bg-transparent border-none outline-none "
    >
      <LoaderCircle className="w-32 h-32 text-white animate-spin" />
    </Modal>
  );
};

export default LoadingModal;