import axios from "axios";
import React from "react";
import { server } from "../index";
import { toast } from "react-hot-toast";

export default function Tasks({ tasks, setTasks }) {
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${server}task/delete/${id}`, {
        withCredentials: true,
      });
      console.log(data);
      toast.success("Task Deleted");
      setTasks((state) => state.filter((e) => e._id !== id));
    } catch (error) {
      toast.error(error.response.data.nessage);
    }
  };

  return (
    <section className="todosContainer">
      {tasks.map((task) => (
        <div key={task._id} className="todo">
          <div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
          <div>
            <button onClick={() => handleDelete(task._id)} className="btn">
              Delete
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
