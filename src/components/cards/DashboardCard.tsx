import type { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";

interface DashboardCardProps{
    title: string,
    value: number,
    icon: IconType,
    iconStyle?: string,
    textStyle?: string,
    buttonText?:string,
    onClick?:()=>void,
}

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  iconStyle,
  textStyle,
  onClick,
  buttonText,
}:DashboardCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconStyle}`}
        >
          {Icon && <Icon size={20} />}
        </div>
      </div>

      {/* Optional button */}
      {buttonText && (
        <button
          type="button"
          onClick={onClick}
          className={`mt-5 flex cursor-pointer items-center gap-1 text-sm font-semibold ${textStyle}`}
        >
          {buttonText}
          <FiArrowRight size={15} />
        </button>
      )}
    </div>
  );
};

export default DashboardCard;
