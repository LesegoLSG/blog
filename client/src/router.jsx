import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <PageNotFound />,
  },
]);

export default router;
