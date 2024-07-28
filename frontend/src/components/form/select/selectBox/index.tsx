import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CustomSelect({
  options,
  selectedOptions,
  setSelectedOptions,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((item) => item !== option)
        : [...prevSelectedOptions, option]
    );
  };

  const getLabel = (value: string) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="relative w-full">
      <label htmlFor="services" className="block text-sm font-bold mb-2">
        Serviços
      </label>
      <div
        className="bg-[#222] text-white py-4 px-3 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0
          ? selectedOptions.map((value) => getLabel(value)).join(", ")
          : "Escolha os serviços"}
      </div>
      {isOpen && (
        <div className="absolute bg-[#222] max-h-36 w-full space-y-1 border border-gray-500 py-1 mt-1 overflow-y-auto z-30">
          {options.map((option) => (
            <label
              key={option.value}
              className="block pl-3 hover:bg-blue-600 cursor-pointer"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="mr-2 cursor-pointer"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
