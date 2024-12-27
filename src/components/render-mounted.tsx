'use client';

import React, { ReactNode, useEffect, useState } from 'react';

export const RenderMounted: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return <>{children}</>;
};