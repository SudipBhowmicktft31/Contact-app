import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddContact from "./components/MyContacct/AddContact";
import EditContact from "./components/MyContacct/EditContact";
import MyContact from "./components/MyContacct/MyContact";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<MyContact />} />
        <Route path="/add" element={<AddContact />} />
        <Route exact path="/edit/:id" element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
