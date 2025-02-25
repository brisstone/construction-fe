import { HidePassword, TogglePassword } from "@/assets/svgComp/General";
import React, { forwardRef, useState } from "react";

interface InputProps {
  label?: string;
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  passswordClassname?: string;
  readOnly?: boolean;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      placeholder,
      className,
      error,
      passswordClassname,
      onBlur,
      value,
      onChange,
      readOnly,
      ...rest
    },
    ref
  ) => {
    const [inputType, setInputType] = useState("password");

    const togglePassword = () => {
      setInputType((prevInputType) =>
        prevInputType === "password" ? "text" : "password"
      );
    };

    return (
      <div className={`${className}`}>
        {label && (
          <label htmlFor={name} className="text-sm font-semibold  text-grey">
            {label}
          </label>
        )}

        <div
          className={`mt-2 flex p-4 rounded-[6px] bg-white border border-borderColor ${passswordClassname} `}
        >
          <input
            id={name}
            name={name}
            type={inputType}
            onBlur={onBlur}
            readOnly={readOnly}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            className={` w-full placeholder:text-placeholderColor bg-white focus:outline-none text-sm `}
          />
          {inputType === "password" ? (
            <div onClick={togglePassword}>
              <HidePassword />
            </div>
          ) : (
            <div onClick={togglePassword}>
              <TogglePassword />
            </div>
          )}
        </div>
        {error && (
          <span className="text-sm text-blowSecondary mt-1">{error}</span>
        )}
      </div>
    );
  }
);

export default PasswordInput;
