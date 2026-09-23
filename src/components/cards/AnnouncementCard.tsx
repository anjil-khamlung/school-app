import { FiBell, FiCalendar, FiEdit2, FiTrash2 } from "react-icons/fi";

import type { Announcement } from "../../type/AnnouncementType";

interface AnnouncementCardProps {
  announcement: Announcement;
    isAdmin: boolean;
    handleEdit:(AnnouncementId:string)=>void
  handleDelete: (announcementId: string) => void;
}

const AnnouncementCard = ({
  announcement,
    isAdmin,
  handleEdit,
  handleDelete,
}: AnnouncementCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          <FiBell size={20} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">{announcement.title}</h2>

              <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                <FiCalendar size={13} />

                <span>
                  {new Date(announcement.date).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>

                {announcement.createdBy && (
                  <>
                    <span>•</span>
                    <span>By {announcement.createdBy}</span>
                  </>
                )}
              </div>
            </div>

            {/* Admin can delete */}
            {isAdmin && (
              <div className="flex items-center gap-2">
                {/* Edit */}
                <button
                  type="button"
                  onClick={() => handleEdit(announcement.id)}
                  className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-orange-500 transition hover:bg-orange-50"
                >
                  <FiEdit2 size={14} />
                  Edit
                </button>

                {/* Delete */}
                <button
                  type="button"
                  popoverTarget="delete-modal"
                  popoverTargetAction="show"
                  onClick={() => handleDelete(announcement.id)}
                  className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {announcement.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
