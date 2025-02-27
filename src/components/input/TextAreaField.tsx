import React, { forwardRef } from "react";

interface InputProps {
  label?: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  textAreaClassname?: string;
  error?: string;
  readOnly?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const TextAreaField = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    name,
    readOnly,
    placeholder,
    rows = 5,
    className,
    textAreaClassname,
    error,
    value,
    onBlur,
    onChange,
    disabled,
    ...rest
  }) => {
    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label htmlFor={name} className="text-sm font-semibold text-grey">
            {label}
          </label>
        )}
        <textarea
          rows={rows}
          id={name}
          name={name}
          readOnly={readOnly}
          value={value}
          placeholder={placeholder}
          {...rest}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          className={`${textAreaClassname}  bg-transparent border border-[#D0D5DD] rounded-[20px] w-full my-5 p-5  focus:ring-1 focus:ring-borderColor focus:outline-none`}
        />

        {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

export default TextAreaField;
