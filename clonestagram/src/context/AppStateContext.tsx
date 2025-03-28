import React, { createContext, useContext, useState } from "react";

interface AppStateContextProps {
  showUpload: boolean;
  isSearchOpen: boolean;
  isCompact: boolean;
  setShowUpload: (value: boolean) => void;
  setIsSearchOpen: (value: boolean) => void;
  setIsCompact: (value: boolean) => void;
  resetAppState: () => void;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("AppStateContext 안에서 사용해야 합니다.");
  return context;
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const resetAppState = () => {
    setShowUpload(false);
    setIsSearchOpen(false);
    setIsCompact(false);
  };

  return (
    <AppStateContext.Provider
      value={{
        showUpload,
        isSearchOpen,
        isCompact,
        setShowUpload,
        setIsSearchOpen,
        setIsCompact,
        resetAppState,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
