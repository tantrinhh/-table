import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
//import { TableExample } from "./components/ViewEmployee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormTodo } from "./components/FormTodo";
import { LoginForm } from "./components/UI/LoginForm";
import { Tablee } from "./components/Table";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setLoggedIn(true);
    }
    toast("Bạn đã đăng nhập thành công!");
  };

  return (
    <div className="mt-5">
      {!loggedIn ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <Routes>
            {/*  */}
            <Route path="" element={<Navigate to="Table" />} />
            <Route path="Table" element={<Tablee />} />
            <Route path="formtodo" element={<FormTodo />} />
            <Route path={`table/edit/:id`} element={<FormTodo />} />
            {/* <Route path="" element={<Navigate to="viewemployee" />} /> */}
            {/* <Route path="viewemployee" element={<TableExample />} />
            
             */}
          </Routes>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
