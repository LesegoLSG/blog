import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute.jsx/PrivateRoute";
import AdminPrivateRoute from "./components/PrivateRoute.jsx/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostDisplay from "./pages/PostDisplay";
import ScrollToTop from "./components/Reusables/Scroller/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<PageNotFound />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostDisplay />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
