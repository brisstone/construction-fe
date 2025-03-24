import React from "react";
import Select, { SingleValue } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  className?: string;
  placeholder: string;
  options: Option[];
  defaultValue?: string;
  onValueChange: (value: string | null) => void;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  className,
  placeholder,
  options,
  defaultValue,
  onValueChange,
}) => {
  // Find the default option object based on value
  const findDefaultOption = () => {
    if (!defaultValue) return null;
    return options.find((option) => option.value === defaultValue) || null;
  };

  // Handle change and pass only the value to the parent component
  const handleChange = (selectedOption: SingleValue<Option>) => {
    onValueChange(selectedOption ? selectedOption.value : null);
  };


  return (
    <Select
      className={className}
      classNamePrefix="react-select"
      placeholder={placeholder}
      options={options}
      value={findDefaultOption()}
      onChange={handleChange}
      isSearchable={true}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderColor: "#e4e7ec",
          height: "50px",
          borderRadius: "8px",
          color: "#3d3d3d",
          background: "transparent",
          fontSize: "12px",
        }),
      }}
    />
  );
};

export default SearchableSelect;
