import { Field, Input, Label } from "@headlessui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputFieldProps<T> {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  name: string;
  style?: string;
  icon?: React.ElementType;
  error?: string;

  showPasswordToggle?: boolean;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputField = <T,>({
  label,
  type,
  placeholder,
  value,
  setFormData,
  name,
  style,
  icon: Icon,
  error,
  showPasswordToggle = false,
  showPassword = false,
  setShowPassword,
}: InputFieldProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <Field>
      <Label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </Label>

      <div className="relative">
        {/* Left icon */}
        {Icon && (
          <Icon
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        {/* Password toggle */}
        {showPasswordToggle && setShowPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-teal-600"
          >
            {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
          </button>
        )}

        <Input
          type={inputType}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleChange}
          required
          className={`w-full ${
            style || "pl-4"
          } rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10`}
        />
      </div>

      {error && <p className="ml-2 mt-1 text-sm text-red-500">{error}</p>}
    </Field>
  );
};

export default InputField;
