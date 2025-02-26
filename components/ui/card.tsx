import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`p-4 border rounded-md shadow-sm ${className}`}>{children}</div>
);

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="pb-4 border-b">{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="pt-4">{children}</div>
);
