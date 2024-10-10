import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="px-4 py-2 rounded-md bg-primary text-foreground-light dark:text-foreground-dark"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;