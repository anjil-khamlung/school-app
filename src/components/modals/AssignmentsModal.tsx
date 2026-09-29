import { FiCalendar, FiEdit2, FiPlus } from "react-icons/fi";
import InputField from "../inputs/InputField";
import SelectField from "../inputs/SelectField";
import TextArea from "../inputs/TextArea";
import type {
  AssignmentFormData,
  AssignmentFormErrors,
} from "../../type/AssignmentType";
import { validateAssignment } from "../../lib/utils/validateAssignment";
import { useAssignments } from "../../store/useAssignments";
import { useState } from "react";
import { toast } from "react-toastify";
import type { User } from "../../type/type";

interface AssignmentModalProps {
  formData: AssignmentFormData;
  setFormData: React.Dispatch<React.SetStateAction<AssignmentFormData>>;
  classOptions: {
    value: string;
    label: string;
  }[];

  editingAssignmentId: string | null;

  currentUser: User;

  setEditingAssignmentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const AssignmentModal = ({
  formData,
  setFormData,
  classOptions,
  editingAssignmentId,
  currentUser,
  setEditingAssignmentId,
}: AssignmentModalProps) => {
  const { updateAssignment, addAssignment } = useAssignments();
  const [errors, setErrors] = useState<AssignmentFormErrors>({});
  const initial = {
    title: "",
    classId: "",
    description: "",
    dueDate: "",
  };

    //Create assignment
  const handleCreateAssignment = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    // Validation
    const validationErrors = validateAssignment(formData);
    setErrors(validationErrors);
    // Stop if there are errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // EDIT
    if (editingAssignmentId !== null) {
      const success = await updateAssignment(editingAssignmentId, {
        title: formData.title,
        classId: formData.classId,
        dueDate: formData.dueDate,
        description: formData.description,
      });

      if (!success) {
        toast.error("Failed to update class");
        return;
      }

      toast.success("Class updated successfully");

      setEditingAssignmentId(null);
      setFormData(initial);

      return;
    }

    //CREATE
    const newAssignment = {
      title: formData.title,
      classId: formData.classId,
      description: formData.description,
      dueDate: formData.dueDate,
      teacherId: currentUser.id,
      teacher: currentUser.name,
      fullMarks: 100,
      passMarks: 40,
    };

    const success = await addAssignment(newAssignment);

    if (!success) {
      toast.error("Failed to create assignments");
      return;
    }
    toast.success("Assignments created successfully");

    setFormData(initial);

    // Close popover
    const modal = document.getElementById("create-assignment-modal");

    if (modal instanceof HTMLElement) {
      modal.hidePopover();
    }

  };
  return (
    <div id="create-assignment-modal" popover="auto" className="modal">
      <div className="modal-box max-w-2xl overflow-visible bg-white">
        <h3 className="text-xl font-bold text-slate-900">
          {editingAssignmentId !== null
            ? "Edit Assignment"
            : "Create Assignment"}
        </h3>

        <form onSubmit={handleCreateAssignment} className="mt-5">
          <div className="grid items-start gap-4 sm:grid-cols-2">
            {/* Title */}
            <InputField
              label="Assignment title"
              type="text"
              name="title"
              value={formData.title}
              setFormData={setFormData}
              placeholder="e.g. Importance of Education"
              error={errors.title}
            />

            {/* Class */}
            <SelectField
              label="Class"
              placeholder="Select class"
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

            {/* Due Date */}
            <div className="relative">
              <InputField
                label="Date"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                setFormData={setFormData}
                error={errors.dueDate}
              />

              <FiCalendar
                className="pointer-events-none absolute right-12 top-2/3 -translate-y-1/2 text-slate-400"
                size={18}
              />
            </div>

            {/* Description */}
            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              setFormData={setFormData}
              placeholder="Assignment description"
              rows={4}
              error={errors.description}
            />
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button
              type="button"
              popoverTarget="create-assignment-modal"
              popoverTargetAction="hide"
              className="btn"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`btn text-white ${
                editingAssignmentId !== null
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {editingAssignmentId !== null ? (
                <>
                  <FiEdit2 size={17} />
                  Edit
                </>
              ) : (
                <>
                  <FiPlus size={17} />
                  Create
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <div
        className="modal-backdrop"
        popoverTarget="create-assignment-modal"
        popoverTargetAction="hide"
      />
    </div>
  );
};

export default AssignmentModal;
