
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  className,
  variant = 'primary',
  size = 'default',
  children,
  ...props
}) => {
  const baseClasses = {
    'primary': 'btn-primary',
    'secondary': 'btn-secondary',
    'icon': 'btn-icon'
  };

  const sizeClasses = {
    'default': '',
    'sm': 'text-sm py-1.5 px-4',
    'lg': 'text-lg py-3 px-8'
  };

  return (
    <Button 
      className={cn(
        baseClasses[variant],
        sizeClasses[size],
        className
      )} 
      {...props}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
