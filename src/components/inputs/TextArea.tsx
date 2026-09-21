interface TextAreaProps<T>{
    label: string,
    name: string,
    setFormData: React.Dispatch<React.SetStateAction<T>>,
    placeholder: string,
    rows: number,
  value: string,
  error?:string,
}
const TextArea =<T,> ({
  label,
  name,
  setFormData,
  placeholder,
  rows = 4,
  value,
  error,
}:TextAreaProps<T>) => {
  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="sm:col-span-2 ">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
      />
      {/* Error message */}
      {error && <p className=" ml-2 text-sm  text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;
