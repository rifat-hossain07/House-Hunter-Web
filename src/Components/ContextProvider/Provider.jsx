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
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const createUser = (email, password) => {
  //   setLoading(true);
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };

  // const logInUser = (email, password) => {
  //   setLoading(true);
  //   return signInWithEmailAndPassword(auth, email, password);
  // };

  // const googleLogIn = () => {
  //   setLoading(true);
  //   return signInWithPopup(auth, provider);
  // };

  // const logOutUser = () => {
  //   setLoading(true);
  //   return signOut(auth);
  // };
  useEffect(() => {
    axios.get(`http://localhost:5000/users/${email}`).then((res) => {
      setUser(res.data);
    });
  }, [email]);

  const authInfo = {
    email,
    setEmail,
    user,
    setUser,
  };
  return <context.Provider value={authInfo}>{children}</context.Provider>;
};

export default Provider;
