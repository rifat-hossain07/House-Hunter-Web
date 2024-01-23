/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import auth from "../../Firebase/firebase.config";
// import axios from "axios";
// import Swal from "sweetalert2";

// const provider = new GoogleAuthProvider();

export const context = createContext(null);

const Provider = ({ children }) => {
  const storedEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(storedEmail || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`https://hunterbackend.vercel.app/users/${email}`).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  }, [email]);

  const authInfo = {
    email,
    setEmail,
    user,
    setUser,
    loading,
  };
  return <context.Provider value={authInfo}>{children}</context.Provider>;
};

export default Provider;
