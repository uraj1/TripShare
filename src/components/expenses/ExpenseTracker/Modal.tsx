import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-yellow-400 hover:text-yellow-300"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;