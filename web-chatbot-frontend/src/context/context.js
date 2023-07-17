'use client';

import { createContext, useContext, useState } from "react";

const Context = createContext({})

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </Context.Provider>
  )
};

export const useThisContext = () => useContext(Context);