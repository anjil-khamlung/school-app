import { FiPlus } from "react-icons/fi";
import SelectField from "../inputs/SelectField";
import type {
  ClassFormData,
  ClassFormErrors,
  CreateClass,
} from "../../type/classType";
import { validateClass } from "../../lib/utils/validateClass";
import { useEffect, useState } from "react";
import { useClasses } from "../../store/useClasses";
import { toast } from "react-toastify";
import type { User } from "../../type/type";

interface ClassModalProps {
  formData: ClassFormData;
  setFormData: React.Dispatch<React.SetStateAction<ClassFormData>>;
  time: string[];
  editingClassId: string | null;
  currentUser: User;
  setEditingClassId: React.Dispatch<React.SetStateAction<string | null>>;
  initial: ClassFormData;
  setSearch: React.Dispatch<React.SetStateAction<string | "">>;
}

const ClassModal = ({
  formData,
  setFormData,
  time,
  editingClassId,
  currentUser,
  setEditingClassId,
  initial,
  setSearch,
}: ClassModalProps) => {
  const { addClass, updateClass,getClass,getClasses ,getSubjects,classes,} = useClasses();
  const [errors, setErrors] = useState<ClassFormErrors>({});
  const [classOptions, setClassOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [subjectOptions, setSubjectOptions] = useState<
    { label: string; value: string }[]
  >([]);

useEffect(() => {
  const loadOptions = async () => {
    const classes = await getClass();
    const subjects = await getSubjects();

    setClassOptions(
      classes.map((item) => ({
        label: item.className,
        value: item.id,
      })),
    );

    setSubjectOptions(
      subjects.map((item) => ({
        label: item.subjectName,
        value: item.id,
      })),
    );
  };

  loadOptions();
  getClasses()
}, [getClass, getSubjects,getClasses]);

const availableSubjectOptions = subjectOptions.filter(
  (subject) =>
    !classes.some(
      (item) =>
        item.classId === formData.classId && item.subjectId === subject.value,
    ),
);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const validationErrors = validateClass(formData);
    setErrors(validationErrors);
    // Stop if there are errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // EDIT
    if (editingClassId !== null) {
      const success = await updateClass(editingClassId, {
        classId: formData.classId,
        subjectId: formData.subjectId,
        time: formData.time,
      });

      if (!success) {
        toast.error("Failed to update class");
        return;
      }

      toast.success("Class updated successfully");

      setEditingClassId(null);
      setFormData(initial);
      setSearch("")

      // Close popover
      const modal = document.getElementById("create-class-modal");

      if (modal instanceof HTMLElement) {
        modal.hidePopover();
      }

      return;
    }

    // CREATE
    const newClass: CreateClass = {
      classId: formData.classId,
      subjectId: formData.subjectId,
      time: formData.time,
      teacherId: currentUser.id,
    };

    const success = await addClass(newClass);

    if (!success) {
      toast.error("Failed to create a class");
      return;
    }
    toast.success("Class created successfully");

    setEditingClassId(null);
    setFormData(initial);

    //Close popover
    const modal = document.getElementById("create-class-modal");

    if (modal instanceof HTMLElement) {
      modal.hidePopover();
    }

    return;
  };

  return (
    <>
      {/* Modal */}
      <div id="create-class-modal" popover="auto" className="modal">
        <div className="modal-box  max-w-2xl overflow-visible bg-white">
          <h3 className="text-xl font-bold text-slate-900">
            {editingClassId !== null ? "Edit Class" : "Create New Class"}
          </h3>

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Class"
                placeholder="Select Class"
                value={formData.classId}
                options={classOptions}
                error={errors.classId}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    classId: value,
                  }))
                }
              />

              <SelectField
                label="Subject"
                placeholder="Select Subject"
                value={formData.subjectId}
                options={availableSubjectOptions}
                error={errors.subjectId}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    subjectId: value,
                  }))
                }
              />

              <SelectField
                label="Time"
                placeholder="Select Time"
                value={formData.time}
                options={time}
                error={errors.time}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    time: value,
                  }))
                }
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                popoverTarget="create-class-modal"
                popoverTargetAction="hide"
                onClick={() => {
                  setEditingClassId(null);
                  setFormData(initial);
                  setSearch("");
                  setErrors({});
                }}
                className="btn border-none bg-red-600 rounded-xl text-white hover:bg-red-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn border-none bg-teal-600 rounded-xl text-white hover:bg-teal-700"
              >
                <FiPlus size={17} />
                {editingClassId !== null ? "Save Changes" : "Create"}
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop close */}
        <div
          className="modal-backdrop"
          onClick={(e) => {
            const modal = e.currentTarget.parentElement;
            if (modal instanceof HTMLElement) {
              modal.hidePopover();
            }
          }}
        />
      </div>
    </>
  );
};

export default ClassModal;
