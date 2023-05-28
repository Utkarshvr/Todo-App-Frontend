import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../data/Store";
import axios from "axios";
import { server } from "..";
import { toast } from "react-hot-toast";

export default function Header() {
  const { isAuth, setIsAuth, setLoading, setUser } = useContext(Context);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}user/logout`, {
        withCredentials: true,
      });
      console.log(data)
      setUser(null);
      toast.success(data.message);
      setIsAuth(false);
      setLoading(false);
    } catch (error) {
      toast.success(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuth ? (
          <button onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
}
