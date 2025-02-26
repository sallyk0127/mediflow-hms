import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => (
  <button
    {...props}
    className={clsx(
      'px-4 py-2 rounded-md transition-all',
      className
    )}
  />
);
