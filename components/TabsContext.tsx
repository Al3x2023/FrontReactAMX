import React, { createContext, useState, useContext } from "react";

// Definición del contexto
type TabsContextType = {
  isTabsVisible: boolean;
  toggleTabs: () => void;
};

const TabsContext = createContext<TabsContextType>({
  isTabsVisible: true,
  toggleTabs: () => {},
});

export const useTabs = () => useContext(TabsContext);

// Componente para envolver la lógica de los tabs
export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTabsVisible, setIsTabsVisible] = useState(true);

  const toggleTabs = () => setIsTabsVisible(!isTabsVisible);

  return (
    <TabsContext.Provider value={{ isTabsVisible, toggleTabs }}>
      {children}
    </TabsContext.Provider>
  );
};
