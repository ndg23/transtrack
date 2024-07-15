// ModalContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface ModalContextType {
  showModal: (type: 'success' | 'error', message: string) => void;
  hideModal: () => void;
  modalState: {
    visible: boolean;
    type: 'success' | 'error';
    message: string;
  };
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC = ({ children }) => {
  const [modalState, setModalState] = useState({
    visible: false,
    type: 'success' as const,
    message: '',
  });

  const showModal = (type: 'success' | 'error', message: string) => {
    setModalState({ visible: true, type, message });
  };

  const hideModal = () => {
    setModalState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalState }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};