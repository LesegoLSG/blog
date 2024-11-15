import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
