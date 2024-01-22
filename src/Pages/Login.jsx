import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { toast } from "react-toastify";
import { context } from "../Components/ContextProvider/Provider";

const Login = () => {
  const { setEmail } = useContext(context);
  const [logInerror, setLogInError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    setLogInError("");
    const users = { email, password };
    const res = await axios.post("http://localhost:5000/jwt", users);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      toast("Successfully! Logged In!");
      navigate(location?.state ? location.state : "/");
      setEmail(email);
    } else {
      setLogInError(res.data);
    }
  };

  return (
    <div>
      <Helmet>
        {/* <link rel="icon" href={homeFav} type="image/x-icon" /> */}
        <title>Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-orange-400">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-white">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                {logInerror && (
                  <p className="text-red-600 font-semibold">{logInerror}</p>
                )}
                <label className="label">
                  <Link to="/register">
                    New Here? please
                    <span className=" text-blue-600 link link-hover mx-1">
                      Register Here
                    </span>
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-orange-500  text-white hover:text-black hover:bg-white normal-case">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
