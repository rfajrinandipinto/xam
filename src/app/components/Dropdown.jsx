// src/components/Dropdown.jsx
import React from "react";

export default function Dropdown({
  id,
  name,
  label,
  options,
  defaultValue,
  onChange,
}) {
  return (
    <div className="w-52 mr-5">
      <label htmlFor={id} className="block font-medium text-gray-900">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
