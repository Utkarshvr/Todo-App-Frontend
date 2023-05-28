import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster, toast } from "react-hot-toast";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import axios from "axios";
import { server } from ".";
import { Context } from "./data/Store";

export default function App() {
  const { setIsAuth, setUser, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    const setUserState = async () => {
      try {
        const { data } = await axios.get(`${server}user/profile`, {
          withCredentials: true,
        });
        console.log(data);
        setUser(data.data.user);
        setIsAuth(true);
        setLoading(false);
        toast.success(data.message);
      } catch (error) {
        setLoading(false);
        setIsAuth(false);
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
    setUserState();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Toaster />
    </>
  );
}
