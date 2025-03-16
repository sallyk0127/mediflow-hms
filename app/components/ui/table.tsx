import React from "react";
import clsx from "clsx";

export const TableContainer = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={clsx("overflow-x-auto", className)} {...props}>
      {children}
    </div>
  );
};

export const Table = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <table className={clsx("w-full border-collapse border border-gray-300", className)} {...props}>
      {children}
    </table>
  );
};

export const TableHead = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <thead className={clsx("bg-gray-200 text-left", className)} {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <tbody className={clsx(className)} {...props}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <tr className={clsx("border-b border-gray-300", className)} {...props}>
      {children}
    </tr>
  );
};

export const TableCell = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => {
  return (
    <td className={clsx("p-2 border border-gray-300", className)} {...props}>
      {children}
    </td>
  );
};