import React, { useEffect, useState } from "react";
import "./TaskModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTask,
  clearSingleTask,
  editTask,
  createTask,
} from "../../actions/taskConstant";

const TaskModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const [action, setAction] = useState("create");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    completed: "Pending",
  });

  const validateDate = (dateString) => {
    const [dd, mm, yyyy] = dateString.split("-");
    const today = new Date().setHours(0, 0, 0, 0);
    const inputDate = new Date(dd, mm, yyyy).getTime();
    return inputDate >= today;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title === "" || formData.deadline === "") {
      setErrorMsg("Please provide all the details");
    }
    if (validateDate(formData.deadline)) {
      setFormData({ ...formData, deadline: formatDate(formData.deadline) });
      setShowModal(false);
      if (action === "create") {
        dispatch(createTask(formData));
      }
      dispatch(editTask(formData, singleTask._id));
      dispatch(getAllTask());
    } else {
      setErrorMsg("deadline should be greater than or equal than current date");
    }
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().substr(-2);
    return `${day}-${month}-${year}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const cancelTask = () => {
    setShowModal(false);
    dispatch(clearSingleTask());
  };

  useEffect(() => {
    setAction("create");
    if (singleTask.title) {
      setFormData({
        title: singleTask.title,
        description: singleTask.description,
        deadline: "",
        completed: singleTask.completed,
      });
      setAction("edit");
    }
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="task-form-container">
          <form action="">
            <p className="title">
              Title <span className="required">*</span>
            </p>
            <input
              type="text"
              name="title"
              id=""
              className="title-input"
              value={formData.title}
              onChange={handleChange}
            />
            <p className="description">Description</p>
            <textarea
              type="text"
              name="description"
              id=""
              className="description-input"
              value={formData.description}
              onChange={handleChange}
            />
            <p className="due-date">
              Deadline<span className="required">*</span>
            </p>
            <input
              type="date"
              name="deadline"
              id=""
              className="date-input"
              value={formData.deadline}
              onChange={handleChange}
            />
            <p className="status">Status</p>
            <select
              name="completed"
              id=""
              className="status-input"
              value={formData.completed}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="btn-container">
              {action === "create" ? (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="create-task-btn"
                >
                  Create
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="edit-task-btn"
                >
                  Edit
                </button>
              )}
              <button onClick={cancelTask} className="cancel-task-btn">
                Cancel
              </button>
            </div>
          </form>
          <div className="error-container">
            <p className="error">{errorMsg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
