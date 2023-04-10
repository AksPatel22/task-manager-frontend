import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/authConstant";
import "./Home.css";
import { FiLogOut } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import TaskModal from "../TaskModal/TaskModal";
import TaskInfoModal from "../TaskInfoModal/TaskInfoModal";
import { getAllTask, getTask, clearData } from "../../actions/taskConstant";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const Home = () => {
  let tasks = useSelector((state) => state.tasks);
  const [showModal, setShowModal] = useState(false);
  const [showTaskInfoModal, setShowTaskInfoModal] = useState(false);
  const [forgotTasks] = useState([]);
  const [id, setId] = useState("");

  const name = localStorage.getItem("name");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const currentDate = new Date().toISOString().slice(0, 10);

  const openTask = (id) => {
    setShowTaskInfoModal(true);
    setId(id);
  };

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/", { replace: true });
    } else {
      dispatch(getAllTask(localStorage.getItem("jwt")));
    }
  }, []);

  const logout = () => {
    dispatch(logoutUser());
    dispatch(clearData());
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    navigate("/", { replace: true });
  };

  const editTask = (id) => {
    dispatch(getTask(id));
    setShowModal(true);
  };

  const deletetask = (id) => {
    setShowTaskInfoModal(true);
    setId(id);
  };

  return (
    <div className="main-container">
      {showModal && <TaskModal setShowModal={setShowModal} />}
      {showTaskInfoModal && (
        <TaskInfoModal
          setShowTaskInfoModal={setShowTaskInfoModal}
          setShowModal={setShowModal}
          id={id}
        />
      )}
      <div className="header">
        <h1>Welcome {name}</h1>
        <div className="logout" onClick={logout}>
          <h3>logout</h3>
          <FiLogOut className="logout-icon"></FiLogOut>
        </div>
      </div>
      <div className="your-tasks">
        <h2>Your Tasks</h2>
        <button className="create-task" onClick={handleClick}>
          <HiPlus className="plus-icon"></HiPlus>
          Create
        </button>
      </div>
      <div className="todays-task">
        <h2> Complete By Today :-</h2>
        <div className="todays-task-container">
          {tasks.allTasks
            .filter((task) => task.completed !== "Completed")
            .filter((task) => task.deadline.slice(0, 10) === currentDate)
            .map((task) => {
              return (
                <div className="single-task" key={task._id}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 onClick={() => openTask(task._id)}>{task.title}</h3>
                    <div>
                      <AiOutlineEdit
                        className="edit-icon"
                        onClick={() => editTask(task._id)}
                      ></AiOutlineEdit>
                      <AiOutlineDelete
                        className="delete-icon"
                        onClick={() => deletetask(task._id)}
                      ></AiOutlineDelete>
                    </div>
                  </div>
                  <div className="task-info">
                    <p>
                      <b> Due:</b> {task.deadline.slice(0, 10)}
                    </p>
                    <p>
                      <b> Status: </b>
                      {task.completed}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="remaining-tasks">
        <h2>Remaining Tasks :-</h2>
        {tasks.allTasks
          .filter((task) => task.completed !== "Completed")
          .filter((task) => task.deadline.slice(0, 10) > currentDate)
          .map((task) => {
            return (
              <div className="single-task" key={task._id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 onClick={() => openTask(task._id)}>{task.title}</h3>
                  <div>
                    <AiOutlineEdit
                      className="edit-icon"
                      onClick={() => editTask(task._id)}
                    ></AiOutlineEdit>
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={() => deletetask(task._id)}
                    ></AiOutlineDelete>
                  </div>
                </div>
                <div className="task-info">
                  <p>
                    <b> Due:</b> {task.deadline.slice(0, 10)}
                  </p>
                  <p>
                    <b> Status: </b>
                    {task.completed}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="completed-tasks">
        <h2>Completed Tasks :-</h2>
        {tasks.allTasks
          .filter((task) => task.completed === "Completed")
          .map((task) => {
            return (
              <div className="single-task" key={task._id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3
                    style={{ textDecorationLine: "line-through" }}
                    onClick={() => openTask(task._id)}
                  >
                    {task.title}
                  </h3>
                  <div>
                    <AiOutlineEdit
                      className="edit-icon"
                      onClick={() => editTask(task._id)}
                    ></AiOutlineEdit>
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={() => deletetask(task._id)}
                    ></AiOutlineDelete>
                  </div>
                </div>
                <div className="task-info">
                  <p>
                    <b> Due:</b> {task.deadline.slice(0, 10)}
                  </p>
                  <p>
                    <b> Status: </b>
                    {task.completed}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {forgotTasks.length > 0 && (
        <div className="forgot-tasks">
          <h2>You Forgot to complete these tasks :-</h2>
          {tasks.allTasks
            .filter((task) => task.completed !== "Completed")
            .filter((task) => task.deadline.slice(0, 10) < currentDate)
            .map((task) => {
              return (
                <div className="single-task" key={task._id}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 onClick={() => openTask(task._id)}>{task.title}</h3>
                    <div>
                      <AiOutlineDelete
                        className="delete-icon"
                        onClick={() => deletetask(task._id)}
                      ></AiOutlineDelete>
                    </div>
                  </div>
                  <div className="task-info">
                    <p>
                      <b> Due:</b> {task.deadline.slice(0, 10)}
                    </p>
                    <p>
                      <b> Status: </b>
                      {task.completed}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {tasks.allTasks.filter((task) => task.completed !== "Completed")
        .length === 0 && (
        <div className="heading-banner">
          <h1>
            Congratulations! You have completed all your tasks. Keep up the
            great work!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
