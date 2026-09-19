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
}

const SelectField = ({ label, value, options, onChange }: SelectFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-sm font-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10">
            <span className="capitalize">{value}</span>
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
                <span className="capitalize">{option}</span>

                <FiCheck
                  size={17}
                  className="invisible text-teal-600 group-data-selected:visible"
                />
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectField;
