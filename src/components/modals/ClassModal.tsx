import { FiPlus } from "react-icons/fi";
import SelectField from "../inputs/SelectField";
import InputField from "../inputs/InputField";
import type {
  ClassFormData,
  ClassFormErrors,
  CreateClass,
} from "../../type/classType";
import { validateClass } from "../../lib/utils/validateClass";
import { useState } from "react";
import { useClasses } from "../../store/useClasses";
import { toast } from "react-toastify";
import type { User } from "../../type/type";

interface ClassModalProps {
  formData: ClassFormData;
  setFormData: React.Dispatch<React.SetStateAction<ClassFormData>>;
  className: string[];
  section: string[];
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
  className,
  section,
  time,
  editingClassId,
  currentUser,
  setEditingClassId,
  initial,
  setSearch,
}: ClassModalProps) => {
  const { addClass, updateClass } = useClasses();
  const [errors, setErrors] = useState<ClassFormErrors>({});


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
        class: formData.class,
        section: formData.section,
        subject: formData.subject,
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
      class: formData.class,
      section: formData.section,
      subject: formData.subject,
      time: formData.time,

      teacherId: currentUser.id,
    };

    const success = await addClass(newClass);

    if (!success) {
      toast.error("Failed to create a class");
      return;
    }
    toast.success("Class updated successfully");

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
                value={formData.class}
                options={className}
                error={errors.class}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    class: value,
                  }))
                }
              />

              <SelectField
                label="Section"
                placeholder="Select Section"
                value={formData.section}
                options={section}
                error={errors.section}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    section: value,
                  }))
                }
              />

              <InputField
                label="Subject"
                type="text"
                placeholder="e.g. Mathematics"
                setFormData={setFormData}
                value={formData.subject}
                name="subject"
                error={errors.subject}
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
                  setSearch("")
                  setErrors({})
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

        {/* Backdrop */}
        <div
          className="modal-backdrop"
          popoverTarget="create-class-modal"
          popoverTargetAction="hide"
        />
      </div>
    </>
  );
};

export default ClassModal;
