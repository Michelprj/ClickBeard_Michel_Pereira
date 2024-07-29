'use client';

import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options: Option[];
  control: Control<T>;
  error?: string;
}

export default function CustomSelectRegisterBarber<T extends FieldValues>({
  label,
  name,
  options,
  control,
  error,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (
    value: string,
    selectedValues: string[],
    setValue: (value: string[]) => void
  ) => {
    if (selectedValues.includes(value)) {
      setValue(selectedValues.filter((item) => item !== value));
    } else {
      setValue([...selectedValues, value]);
    }
  };

  const getLabel = (value: string) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="relative w-full">
      <label htmlFor={name} className="block text-sm font-bold mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <div
              className={`bg-[#222] ${
                value.length === 0 ? "text-[#999999]" : "text-white"
              } py-2.5 px-3 rounded cursor-pointer text-sm ${
                error ? 'border border-white' : ''
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {value.length > 0
                ? value.map((val: string) => getLabel(val)).join(", ")
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
                      checked={value.includes(option.value)}
                      onChange={() =>
                        handleCheckboxChange(option.value, value, onChange)
                      }
                      className="mr-2 cursor-pointer"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          </>
        )}
      />
      <span className="text-[#999999] text-sm h-4 mt-1">
        {error ? error : "\u00A0"}
      </span>
    </div>
  );
}
