import React, { useState } from "react";

interface LoginFormProps {
  handleLogin: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (username === "" || password === "") {
      setError("Vui lòng nhập tài khoản và mật khẩu");
    } else {
      if (username !== "admin" || password !== "admin") {
        setError("Tài khoản hoặc mật khẩu không chính xác !");
      } else {
        setError("");
        handleLogin(username, password);
      }
    }
  };
  return (
    <div className=" mt-20 border-2 border-solid rounded-lg text-white bg-[#000033] mx-auto w-96 border-[#081229] p-6">
      <div className="w-80  ">
        <h2 className="text-2xl text-center items-center font-bold mb-4">
          Đăng nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block ">Tài khoản:</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="border-2 border-red-600 rounded-md px-3 py-2 w-72 text-black h-8"
            />
          </div>
          <div className="mb-4">
            <label className="block ">Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-2 border-red-600 rounded-md px-3 py-2 text-black w-72 h-8"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white  px-4 py-2 rounded-md hover:bg-blue-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
