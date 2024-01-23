import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import DashOwner from "./Pages/DashOwner";
import DashRent from "./Pages/DashRent";
import Owner from "./Components/ProtectedRoutes/Owner";
import Renter from "./Components/ProtectedRoutes/Renter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/roomsCount"),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/dash-own",
        element: (
          <Owner>
            <DashOwner />
          </Owner>
        ),
      },
      {
        path: "/dash-rent",
        element: (
          <Renter>
            <DashRent />
          </Renter>
        ),
      },
    ],
  },
]);
export default router;
