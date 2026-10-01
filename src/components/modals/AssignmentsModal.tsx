import { FiCalendar,  FiPlus, FiTrash2 } from "react-icons/fi";
import InputField from "../inputs/InputField";
import SelectField from "../inputs/SelectField";
import TextArea from "../inputs/TextArea";
import type {
  AssignmentFormData,
  AssignmentFormErrors,
  Question,
} from "../../type/AssignmentType";
import { validateAssignment } from "../../lib/utils/validateAssignment";
import { useAssignments } from "../../store/useAssignments";
import {  useState } from "react";
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
  initial: AssignmentFormData,
  setSearch: React.Dispatch<React.SetStateAction<string>>
  questions:Question[]
  setQuestions:React.Dispatch<React.SetStateAction<Question[]>>
}



const AssignmentModal = ({
  formData,
  setFormData,
  classOptions,
  editingAssignmentId,
  currentUser,
  setEditingAssignmentId,
  initial,
  setSearch,
  questions,
  setQuestions,
}: AssignmentModalProps) => {
  const {
    updateAssignment,
    addAssignment,
    addAssignmentQuestions,
    updateAssignmentQuestion,
  } = useAssignments();
  const [errors, setErrors] = useState<AssignmentFormErrors>({});

  //Add  question
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        question: "",
        marks: 25,
      },
    ]);
  };

  //Remove  question
const removeQuestion = (index: number) => {
  setQuestions((prev) => prev.filter((_, i) => i !== index));
};

  //Update question
const updateQuestion = (
  index: number,
  field: "question" | "marks",
  value: string | number,
) => {
  setQuestions((prev) =>
    prev.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]: value,
          }
        : item,
    ),
  );
};

    //Create assignment
  const handleCreateAssignment = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
        toast.error("Failed to update assignment");
        return;
      }

      // Update / add questions
      for (const [index, item] of questions.entries()) {
        if (item.id) {
          // Existing question → update it
          const success = await updateAssignmentQuestion(
            item.id,
            item.question,
            item.marks,
            index + 1,
          );

          if (!success) {
            toast.error("Failed to update question");
            return;
          }
        } else {
          // New question → insert it
          const success = await addAssignmentQuestions(
            editingAssignmentId,
            item.question,
            item.marks,
            index + 1,
          );

          if (!success) {
            toast.error("Failed to add question");
            return;
          }
        }
      }

      toast.success("Assignment updated successfully");

      setEditingAssignmentId(null);
      setFormData(initial);
      setQuestions([{ question: "", marks: 1 }]);

      const modal = document.getElementById("create-assignment-modal");

      if (modal instanceof HTMLElement) {
        modal.hidePopover();
      }

      return;
    }

    // CREATE
    const newAssignment = {
      title: formData.title,
      classId: formData.classId,
      description: formData.description,
      dueDate: formData.dueDate,
      teacherId: currentUser.id,
      fullMarks: 100,
      passMarks: 40,
    };

    const assignment = await addAssignment(newAssignment);

    if (!assignment) {
      toast.error("Failed to create assignment");
      return;
    }

    // Add questions
    for (const [index, item] of questions.entries()) {
      const success = await addAssignmentQuestions(
        assignment.id,
        item.question,
        item.marks,
        index + 1,
      );

      if (!success) {
        toast.error("Failed to add questions");
        return;
      }
    }

    toast.success("Assignment created successfully");

    setFormData(initial);
    setQuestions([{ question: "", marks: 1 }]);
    setSearch("");

    // Close popover
    const modal = document.getElementById("create-assignment-modal");

    if (modal instanceof HTMLElement) {
      modal.hidePopover();
    }
  };;
  return (
    <div id="create-assignment-modal" popover="auto" className="modal">
      <div className="modal-box max-h-[98vh] max-w-2xl overflow-y-auto bg-white">
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
              rows={1}
              error={errors.description}
            />
          </div>

          {/* Questions */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900">Questions</h4>
                <p className="text-sm text-slate-500">
                  Add questions for this assignment.
                </p>
              </div>

              <button
                type="button"
                onClick={addQuestion}
                className="btn btn-sm rounded-xl border-none bg-teal-600 text-white hover:bg-teal-700"
              >
                <FiPlus size={16} />
                Add Question
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">
                      Question {index + 1}
                    </span>

                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <FiTrash2 size={17} />
                      </button>
                    )}
                  </div>

                  <textarea
                    value={item.question}
                    onChange={(e) =>
                      updateQuestion(index, "question", e.target.value)
                    }
                    placeholder="Enter your question..."
                    rows={2}
                    className="textarea textarea-bordered w-full min-h-10 resize-none bg-white"
                  />

                  <div className="mt-3 flex items-center gap-3">
                    <label className="text-sm font-medium text-slate-700">
                      Marks
                    </label>

                    <input
                      type="number"
                      min={1}
                      value={item.marks}
                      onChange={(e) =>
                        updateQuestion(index, "marks", Number(e.target.value))
                      }
                      className="input input-bordered w-24 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button
              type="button"
              popoverTarget="create-assignment-modal"
              popoverTargetAction="hide"
              onClick={() => {
                setEditingAssignmentId(null);
                setFormData(initial);
                setSearch("");
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
              {editingAssignmentId !== null ? "Save Changes" : "Create"}
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
