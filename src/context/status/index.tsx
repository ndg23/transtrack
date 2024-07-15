// src/contexts/StatusContext.js
import React, { createContext, useState, useContext } from 'react';
import StatusPopup from '../../components/StatusPopup';

const StatusContext = createContext(null);

export const StatusProvider = ({ children }) => {
  const [popup, setPopup] = useState({ visible: false, type: '', message: '' });

  const showStatus = (type, message) => {
    setPopup({ visible: true, type, message });
  };

  const hideStatus = () => {
    setPopup({ visible: false, type: '', message: '' });
  };

  return (
    <StatusContext.Provider value={{ showStatus }}>
      {children}
      <StatusPopup
        visible={popup.visible}
        type={popup.type}
        message={popup.message}
        onHide={hideStatus}
      />
    </StatusContext.Provider>
  );
};

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};