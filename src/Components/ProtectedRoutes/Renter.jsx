/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { context } from "../ContextProvider/Provider";
import { toast } from "react-toastify";

const Renter = ({ children }) => {
  const { user, loading, setEmail } = useContext(context);
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="flex justify-center ">
        <span className="loading loading-spinner text-orange-300 mt-36 pt-36 pl-36"></span>
      </div>
    );
  }
  if (user && user?.role === "House Renter") {
    return children;
  } else {
    toast("Please Log In with Renter account");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setEmail("");
    navigate("/login");
  }
};

export default Renter;
