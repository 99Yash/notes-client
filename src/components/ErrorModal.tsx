import React, { useState } from 'react';

interface ErrorModalProps {
  error: Error;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="max-w-90vw max-h-90vh bg-white rounded-md overflow-auto p-4 shadow-md">
            <h2 className="text-xl font-semibold">Error</h2>
            <p>{error.message}</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorModal;
