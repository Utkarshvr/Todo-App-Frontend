import { createContext, useState } from "react";

export const Context = createContext();

export default function Store({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);
  return (
    <Context.Provider
      value={{
        isAuth,
        setIsAuth,
        loading,
        setLoading,
        user,
        setUser,
        tasks,
        setTasks,
      }}
    >
      {children}
    </Context.Provider>
  );
}
