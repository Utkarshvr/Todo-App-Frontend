import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../index";
import Tasks from "./Tasks";
import { Context } from "../data/Store";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
};
export default function Home() {
  const [inputValue, setInputValue] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const { isAuth } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const setTasksState = async () => {
      try {
        const { data } = await axios.get(`${server}task/alltasks`, {
          withCredentials: true,
        });
        console.log(data);
        setTasks(data.data.tasks);
        setInputValue(initialState);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };
    if (!isAuth) navigate("/login");

    setTasksState();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}task/create`, inputValue, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(data);
      setLoading(false);
      // setTasks(data.data.task);
      toast.success(data.message);
      setTasks((prev) => [...prev, data.data.task]);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.success(error.message);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={inputValue.title}
              name="title"
              onChange={(e) =>
                setInputValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={inputValue.description}
              name="description"
              onChange={(e) =>
                setInputValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      {tasks ? (
        <Tasks tasks={tasks} setTasks={setTasks} />
      ) : (
        <div>No Tasks to be Showed.</div>
      )}
      {/* {loading && <Loader />} */}
    </div>
  );
}
