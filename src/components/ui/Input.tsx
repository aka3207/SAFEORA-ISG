import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 
            border border-slate-200 dark:border-slate-800
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
            outline-none transition-all duration-200
            placeholder:text-slate-400 dark:placeholder:text-slate-600
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-xs font-medium text-red-500 ml-1 mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
