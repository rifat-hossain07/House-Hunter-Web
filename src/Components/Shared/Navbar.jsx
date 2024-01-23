import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { context } from "../ContextProvider/Provider";

const Navbar = () => {
  const { user } = useContext(context);
  const handleLogOut = () => {
    // remove token
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    location.reload();
  };
  return (
    <div className="navbar bg-orange-300 ">
      <div className="flex-1">
        <Link to="/" className="font-bold md:ml-5">
          House Hunter
        </Link>
      </div>
      <div className="flex-none">
        <NavLink className="btn btn-ghost" to="/">
          Home
        </NavLink>
        {user && (
          <>
            {user?.role === "House Owner" ? (
              <NavLink className="btn btn-ghost" to="/dash-own">
                Dashboard
              </NavLink>
            ) : (
              <NavLink className="btn btn-ghost" to="/dash-rent">
                Dashboard
              </NavLink>
            )}
          </>
        )}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="ProfileP" src={user?.photo} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-fit text-center"
            >
              <li>{user?.email}</li>
              <li>{user?.name}</li>
              <li className="btn btn-ghost" onClick={handleLogOut}>
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <NavLink className="btn btn-ghost" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
