import { SearchIcon } from "@/assets/svgComp/General";
import { createPageState, useFilterState } from "@/store/FilterStore";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  icon?: React.ReactNode;
  value?: string;
  pageKey: string;
}

const SearchInputComp = ({
  placeholder = "Search...",
  // onChange,
  onClick,
  className,
  pageKey,
  icon,
  inputClassName,
  value,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(value || "");
  const { setSearch } = useFilterState((state) => state[pageKey] || {});

  // Sync local state with the prop `value` from the global store (useEffect)
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
      createPageState(pageKey);
    }, [pageKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update local state
  };

  const handleSearchClick = () => {
    setSearch(inputValue);
  };

  // Handle clear icon click (clear input field and reset search state)
  const handleClearSearch = () => {
    setInputValue("");
    setSearch("");
  };

  return (
    <div
      className={`flex items-center text-[#9295AB] bg-[#F5F6FA] rounded-[6px] p-4 h-[38px] w-[388px] focus-within:border-[#D5D5D5] focus-within:outline-none focus-within:border ${className}`}
    >
      {icon && <div className="ml-2">{icon}</div>}

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputValue}
        onClick={onClick}
        className={`flex-grow bg-transparent outline-none placeholder-[#252C58] text-[#202224] text-sm font-light w-full ${inputClassName}`}
      />

      {/* Search Icon */}
      {!icon && (
        <div onClick={handleSearchClick} className="ml-2 cursor-pointer">
          <SearchIcon />
        </div>
      )}

      {inputValue && (
        <div
          onClick={handleClearSearch}
          className="ml-2 cursor-pointer text-[#9295AB]"
        >
          <X />
        </div>
      )}
    </div>
  );
};

export default SearchInputComp;
