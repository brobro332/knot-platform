'use client';

import React, { createContext, useContext } from 'react';
import { useKnotApp, KnotAppHookResult } from '../../application/hooks/useKnotApp';

const KnotContext = createContext<KnotAppHookResult | undefined>(undefined);

export const KnotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const knotApp = useKnotApp();

  return (
    <KnotContext.Provider value={knotApp}>
      {children}
    </KnotContext.Provider>
  );
};

export const useKnot = (): KnotAppHookResult => {
  const context = useContext(KnotContext);
  if (!context) {
    throw new Error('useKnot must be used within a KnotProvider');
  }
  return context;
};
