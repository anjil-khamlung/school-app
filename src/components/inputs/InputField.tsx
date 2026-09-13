
import { Field, Input, Label } from "@headlessui/react";

interface InputFieldProps<T> {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  //React.Dispatch : describes the function that receives that state update
  //<React.SetStateAction<T>> : what you can give to <T>.
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  name: string;
  style?: string;
  minLength?: number;
  // This prop can contain a React component
  icon?: React.ElementType;
}

const InputField =<T,> ({
  label,
  type,
  placeholder,
  value,
  setFormData,
  name,
  style,
  minLength,
  icon: Icon,
}: InputFieldProps<T>) => {
  // e is a change event coming from an <input> element.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Field>
      <Label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </Label>

      <div className="relative">
        {Icon && (
          <Icon
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleChange}
          required
          minLength={minLength}
          className={`w-full ${
            style || "pl-4"
          } rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10`}
        />
      </div>
    </Field>
  );
};

export default InputField;
