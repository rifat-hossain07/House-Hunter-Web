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
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          House Hunter
        </Link>
      </div>
      <div className="flex-none">
        {user && (
          <div className="btn btn-ghost">
            <div className="indicator">
              {user?.role === "House Owner" ? (
                <NavLink to="/dash-own">Dashboard</NavLink>
              ) : (
                <NavLink to="/dash-rent">Dashboard</NavLink>
              )}
            </div>
          </div>
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                src={user?.photo}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-fit"
          >
            <li>
              {user?.email ? (
                <>
                  <li>{user?.email}</li>
                  <li>{user?.name}</li>
                  <a onClick={handleLogOut}>Logout</a>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
