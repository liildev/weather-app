import { Fragment } from "react";
import { useAuth } from "../hooks";
import { Header, Sidebar } from "../components";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const isAuth = useAuth();

  return (
    <Fragment>
      {isAuth ? (
        <Fragment>
          <Header />

          <div className="flex mt-[10vh]">
            <Sidebar />

            <div className="container">
              <Outlet />
            </div>
          </div>
        </Fragment>
      ) : (
        <Navigate to="/sign-in" replace state={{ from: location }} />
      )}
    </Fragment>
  );
}
