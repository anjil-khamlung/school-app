import { FiSearch } from "react-icons/fi";
interface SearchInputProps{
    placeholder: string,
    value: string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
}

const SearchInput = ({
    placeholder,value,onChange
}:SearchInputProps) => {
  return (
    <div className="mt-8 max-w-md  ">
      <label className="input bg-white rounded-xl text-slate-400 border border-slate-200">
        <FiSearch size={18} />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="placeholder:text-slate-900"
        />
      </label>
    </div>
  );
}

export default SearchInput