import React from "react";
interface Option {
  value: string;
  label: string;
}
interface SelectProps {
  options: Option[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function Select({
  options,
  selectedOption,
  setSelectedOption,
}: SelectProps) {
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="relative w-full">
      <label htmlFor="services" className="block text-sm font-bold mb-2">
        Barbeiro
      </label>
      <select
        className="bg-[#222] w-full text-white py-4 px-3 rounded cursor-pointer"
        value={selectedOption}
        onChange={(e) => handleOptionClick(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            className={`p-3 hover:bg-gray-700 cursor-pointer ${
              selectedOption === option.value ? "bg-gray-700" : ""
            }`}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="text-white text-sm text-red-600 font-bold bottom-20 z-50">
        { options.length === 0 && "Nenhum barbeiro encontrado" }
      </div>
    </div>
  );
}
