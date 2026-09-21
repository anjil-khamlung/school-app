import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FiCheck, FiChevronDown } from "react-icons/fi";

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const SelectField = ({
  label,
  value,
  options,
  onChange,
  error,
  placeholder = "Select an option",
}: SelectFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton
            className={`flex w-full cursor-pointer items-center justify-between rounded-xl border bg-slate-50 px-4 py-3.5 text-left text-sm outline-none transition ${
              error
                ? "border-red-400 focus:border-red-500"
                : "border-slate-200 hover:border-slate-300 focus:border-teal-500"
            }`}
          >
            <span className={value ? "text-slate-900" : "text-slate-400"}>
              {value || placeholder}
            </span>

            <FiChevronDown className="text-slate-400" size={18} />
          </ListboxButton>

          <ListboxOptions
            anchor="bottom"
            className="z-50 mt-2 w-(--button-width) rounded-xl border border-slate-200 bg-white p-1 shadow-xl outline-none"
          >
            {options.map((option) => (
              <ListboxOption
                key={option}
                value={option}
                className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-700 data-focus:bg-teal-50 data-focus:text-teal-700"
              >
                <span>{option}</span>

                <FiCheck
                  size={17}
                  className="invisible text-teal-600 group-data-selected:visible"
                />
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {error && <p className="mt-1.5 ml-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField