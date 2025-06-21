// components/Layout.tsx
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {children}
    </div>
  );
};

export default Layout;
