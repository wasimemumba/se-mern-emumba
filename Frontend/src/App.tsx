import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import HomePage from "./pages/home";
import { useEffect } from "react";
import { RootState } from "./store";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state: RootState) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
