import * as React from "react";
import clsx from "clsx";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, children, className }: TabsProps) {
  return (
    <div className={clsx("w-full", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabsListProps>(child)) {
          return React.cloneElement(child, {});
        }
      })}
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabsContentProps>(child) && child.props.value === value) {
          return child;
        }
      })}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return <div className={clsx("flex border-b", className)}>{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export function TabsTrigger({ children, onClick, isActive, className }: TabsTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-2 border-b-2 transition-colors",
        isActive ? "text-blue-600 border-blue-500" : "text-gray-600 border-transparent hover:text-gray-900",
        className
      )}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ children, className }: TabsContentProps) {
  return <div className={clsx("p-4", className)}>{children}</div>;
}
