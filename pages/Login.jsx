import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../data/Store";
import { server } from "..";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [inputValue, setInputValue] = useState(initialState);

  const { isAuth, setIsAuth, loading, setLoading } = useContext(Context);
  const navigate = useNavigate();
  if (isAuth) return navigate("/");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}user/login`, inputValue, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // must to add
      });
      console.log(data);
      toast.success(data.message);
      setInputValue(initialState);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      toast.success(error.message);
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={inputValue.email}
            name="email"
            onChange={(e) =>
              setInputValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
            value={inputValue.password}
            onChange={(e) =>
              setInputValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
}
