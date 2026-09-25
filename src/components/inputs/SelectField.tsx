import { Listbox } from "@headlessui/react";
import { FiCheck, FiChevronDown } from "react-icons/fi";

type SelectOption = string | { value: string; label: string };

interface SelectFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  options: SelectOption[];
  error?: string;
  onChange: (value: string) => void;
}

const SelectField = ({
  label,
  placeholder,
  value,
  options,
  error,
  onChange,
}: SelectFieldProps) => {
  // Find the currently selected option
  const selectedOption = options.find((option) =>
    typeof option === "string" ? option === value : option.value === value,
  );

  // Get the text to display in the button
  const selectedLabel =
    typeof selectedOption === "string" ? selectedOption : selectedOption?.label;

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={`flex w-full cursor-pointer items-center justify-between rounded-xl border bg-slate-50 px-4 py-3.5 text-left text-sm outline-none transition ${
              error
                ? "border-red-400 focus:border-red-500"
                : "border-slate-200 hover:border-slate-300 focus:border-teal-500"
            }`}
          >
            <span
              className={selectedLabel ? "text-slate-900" : "text-slate-400"}
            >
              {selectedLabel || placeholder}
            </span>

            <FiChevronDown className="text-slate-400" size={18} />
          </Listbox.Button>

          <Listbox.Options
            anchor="bottom"
            className="z-50 mt-2 w-(--button-width) rounded-xl border border-slate-200 bg-white p-1 shadow-xl outline-none"
          >
            {options.map((option) => {
              const optionValue =
                typeof option === "string" ? option : option.value;

              const optionLabel =
                typeof option === "string" ? option : option.label;

              return (
                <Listbox.Option
                  key={optionValue}
                  value={optionValue}
                  className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-700 data-focus:bg-teal-50 data-focus:text-teal-700"
                >
                  <span>{optionLabel}</span>

                  <FiCheck
                    size={17}
                    className="invisible text-teal-600 group-data-selected:visible"
                  />
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>

      {error && <p className="mt-1.5 ml-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;
