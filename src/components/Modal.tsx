import { ReactNode, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTransitionEnd = () => {
    // Set `isAnimating` to `false` once the animation ends
    setIsAnimating(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed z-10 top-0 left-0 w-full h-full bg-black opacity-50 transition-opacity ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        } ${isAnimating ? 'duration-300 ease-in-out' : ''}`}
        onClick={onClose}
        onTransitionEnd={handleTransitionEnd}
      />
      {/* Modal */}
      <div
        className={`fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md shadow-lg overflow-hidden transition-all ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } ${isAnimating ? 'duration-300 ease-in-out' : ''}`}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
          {/* <h3 className="text-lg font-medium text-gray-900">Edit Note</h3> */}
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default Modal;
