import React, { useDebugValue, useEffect, useState } from "react";
import "./TaskInfoModal.css";
import { deleteTask, getTask } from "../../actions/taskConstant";
import { useSelector, useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";

const TaskInfoModal = ({ setShowTaskInfoModal, id, setShowModal }) => {
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const [Delete, setDelete] = useState(false);
  const dispatch = useDispatch();

  const editTask = (id) => {
    setShowTaskInfoModal(false);
    setShowModal(true);
  };

  const deletetask = () => {
    dispatch(deleteTask(id));
  };

  useEffect(() => {
    dispatch(getTask(id));
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="task-container">
          <ImCross
            className="cross-icon"
            onClick={() => setShowTaskInfoModal(false)}
          ></ImCross>
          <h2 className="title">{singleTask.title}</h2>
          <p className="description">{singleTask.description}</p>
          <p className="deadline">
            <b> Due: </b>{" "}
            {singleTask.deadline && singleTask.deadline.slice(0, 10)}
          </p>
          <p className="completed">
            <b> Status:</b> {singleTask.completed}
          </p>
          <div className="btn-container">
            <button className="edit-btn" onClick={editTask}>
              Edit
            </button>
            <button className="delete-btn" onClick={deletetask}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoModal;
