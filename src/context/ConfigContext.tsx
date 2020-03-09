import React, { createContext, useState } from 'react';

const ConfigContext = createContext({
  language: '',
  setLanguage: (_: string) => {}
});

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('en');

  return (
    <ConfigContext.Provider value={{ language, setLanguage }}>{children}</ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
