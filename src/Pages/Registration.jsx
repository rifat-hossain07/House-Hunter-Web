import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { toast } from "react-toastify";

const Registration = () => {
  // const { createUser, googleLogIn } = useContext(context);
  const [registerError, setRegisterError] = useState("");
  // const location = useLocation();
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const name = form.get("displayName");
    const photo = form.get("photo");
    const role = form.get("Role");
    const phone = form.get("phone");
    setRegisterError("");
    // password Validation
    if (password.length < 6) {
      setRegisterError(
        "Registration Failed !  Password must be more than 6 character !"
      );
      return;
    }
    // phone number validation
    const cleanedPhoneNumber = phone.replace(/[\s-]/g, "");
    if (/^\d{1,10}$/.test(cleanedPhoneNumber)) {
      return;
    }
    const users = { email, name, photo, password, role, phone };
    const res = await axios.post(
      "https://hunterbackend.vercel.app/users",
      users
    );
    if (res.data.insertedId) {
      toast("Successfully Registered!");
      e.target.reset();
      navigate("/login");
    } else {
      console.log(res.data);
      setRegisterError(res.data);
    }
  };
  return (
    <div>
      <Helmet>
        {/* <link rel="icon" href={homeFav} type="image/x-icon" /> */}
        <title>Registration</title>
      </Helmet>
      <div className="hero min-h-screen  bg-orange-400">
        <div className="hero-content flex-col lg:flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl text-white font-bold ">
              Register Here!
            </h1>
          </div>
          <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="flex gap-5">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name..."
                    className="input input-bordered"
                    name="displayName"
                  />
                </div>
                {/* Role */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                  <select
                    className="select select-warning w-full "
                    name="Role"
                    required
                  >
                    <option></option>
                    <option>House Owner</option>
                    <option>House Renter</option>
                  </select>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  placeholder="Your photo url..."
                  className="input input-bordered"
                  name="photo"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone No</span>
                </label>
                <input
                  type="tel"
                  placeholder="phone"
                  className="input input-bordered"
                  name="phone"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
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
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>
              {registerError && (
                <p className="text-red-600 font-semibold">{registerError}</p>
              )}
              <div className="form-control mt-6">
                <p className="mb-3">
                  Already Have an account ?{" "}
                  <Link to={"/login"}>
                    <span className="text-blue-600 link link-hover mb-2">
                      Login Here..
                    </span>
                  </Link>
                </p>
                <button className="btn bg-orange-400 border-none text-white hover:text-black hover:bg-white normal-case ">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
