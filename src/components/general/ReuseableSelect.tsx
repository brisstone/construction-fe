import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SelectProps {
  options?: { label: string; value: string }[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  onChange?: string;
  placeholder?: string;
}

const ReusableSelect: React.FC<SelectProps> = ({
  options = [],
  defaultValue,
  onValueChange,
  className = "",
  placeholder = "Select an option",
}) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger
        className={`text-grey rounded-[8px] w-full placeholder:text-placeholderColor bg-transparent border border-borderColor h-[50px] ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.length > 0 ? (
          options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <p>No options available</p>
        )}
      </SelectContent>
    </Select>
  );
};

export default ReusableSelect;
