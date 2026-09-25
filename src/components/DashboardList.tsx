import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type {   User } from "../type/type";
import type { IconType } from "react-icons";
import type { Assignment } from "../type/AssignmentType";
import type { Class } from "../type/classType";

interface DashboardListProps{
    title: string,
    description: string,
    items: (User|Class|Assignment)[],
    viewAllPath: string,
    icon: IconType,
    iconBg?: string,
    iconColor?: string,
    emptyMessage?: string,
    
}

const DashboardList = ({
  title,
  description,
  items ,
  viewAllPath,
  icon: Icon,
  iconBg = "bg-teal-50",
  iconColor = "text-teal-600",
  emptyMessage = "No data available.",
}:DashboardListProps) => {
  const navigate = useNavigate();
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden ">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>

          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <button
          onClick={() => navigate(viewAllPath)}
          className={`flex cursor-pointer items-center gap-1 text-sm font-semibold ${iconColor} `}
        >
          View all
          <FiArrowRight size={15} />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-100">
        {items.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 px-6 py-5 transition hover:bg-slate-50 "
          >
            {/* Icon */}
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
            >
              <Icon size={20} />
            </div>

            {/* Content */}
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900">
                {/* If item has title, use item.title; otherwise if it has name,
                use item.name; otherwise use item.id. */}
                {"title" in item && ` ${item.title}`}
                {"subject" in item
                  ? `${item.subject} `
                  : "email" in item
                    ? item.email
                    : ""}

                {"section" in item && `-${item.section}`}
              </h3>

              <p className="mt-1 text-sm  text-slate-500">
            
                {"teacherName" in item && `  ${item.teacherName}`}
                {"teacher" in item && `  ${item.teacher}`}
              </p>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-slate-500">
            {emptyMessage}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardList;
