import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTaskThunk, updateTaskThunk } from "../../features/taskSlice";
import InputForm from "../InputForm";
import Button from "../Button";
import { TASK_STATUSES } from "../../utils/constants";
import AssignedToDropdown from "./AssignedToDropdown";

const TaskForm = ({ task = null, onClose }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    due_date: "",
    assigned_to: "",
  });

  useEffect(() => {
    if (task) {
      const formattedDate = task.due_date ? task.due_date.split("T")[0] : "";
      setFormData({
        title: task.title,
        description: task.description || "",
        status: task.status,
        due_date: formattedDate,
        assigned_to: task.assigned_to ? task.assigned_to.id : "",
      });
    } else {
      if (currentUser && currentUser.id) {
        setFormData((prev) => ({ ...prev, assigned_to: currentUser.id }));
      }
    }
  }, [task, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === "assigned_to" && value !== "") {
      finalValue = parseInt(value, 10);
    }
    setFormData({ ...formData, [name]: finalValue });
  };

  // Only pick changed fields
  const getChangedFields = () => {
    if (!task) return formData;

    const changedFields = {};
    const formattedTaskDate = task.due_date ? task.due_date.split("T")[0] : "";
    const taskAssignedToId = task.assigned_to ? task.assigned_to.id : "";
    const originalDescription = task.description || "";

    if (formData.title !== task.title) changedFields.title = formData.title;
    if (formData.description !== originalDescription)
      changedFields.description = formData.description;
    if (formData.status !== task.status) changedFields.status = formData.status;
    if (formData.due_date !== formattedTaskDate)
      changedFields.due_date = formData.due_date;
    if (formData.assigned_to !== taskAssignedToId)
      changedFields.assigned_to = formData.assigned_to;

    return changedFields;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task) {
      const updatedData = getChangedFields();
      if (Object.keys(updatedData).length > 0) {
        console.log("Dispatching update:", {
          taskId: task.id,
          taskData: updatedData,
        });
        dispatch(
          updateTaskThunk({ taskId: task.id, taskData: updatedData })
        ).then(() => onClose());
      } else {
        onClose();
      }
    } else {
      console.log("Dispatching create:", formData);
      dispatch(createTaskThunk(formData)).then(() => onClose());
    }
  };
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-6 w-96 shadow-lg"
      >
        <h2 className="mb-4 font-semibold text-lg ">
          {task ? "Edit Task" : "Add New Task"}
        </h2>

        <InputForm
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a title"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a description"
          className="my-3 mt w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {TASK_STATUSES.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <InputForm
          label="Due Date"
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          required
          min={minDate} 
        />

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assign To
          </label>
          <AssignedToDropdown
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end space-x-2">
  <Button
    type="button"
    onClick={onClose}
    className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-white focus:ring-blue-400"
    text="Cancel"
  />
  <Button
    type="submit"
    className="bg-blue-600 text-white hover:bg-blue-700"
    text={task ? "Update" : "Create"}
  />
</div>

      </form>
    </div>
  );
};

export default TaskForm;


