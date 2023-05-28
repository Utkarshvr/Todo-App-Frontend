import { useContext } from "react";
import Loader from "../components/Loader";
import { Context } from "../data/Store";

export default function Profile() {
  const { loading, user } = useContext(Context);

  return !loading ? (
    <div>
      <h1>Name: {user?.name}</h1>
      <p>Email: {user?.email}</p>
    </div>
  ) : (
    <Loader />
  );
}
