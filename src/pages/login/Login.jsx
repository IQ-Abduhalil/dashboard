import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/TokenContext";
import { baseUrl } from "../../Url";

export function Login() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phone_number", number);
    formData.append("password", password);

    try {
      const res = await axios.post(`${baseUrl}/auth/signin`, formData);
      const accessToken = res?.data?.data?.tokens?.accessToken?.token;

      if (accessToken) {
        localStorage.setItem("myToken", accessToken);
        setToken(accessToken); // Tokenni yangilash
        toast.success("Muvaffaqiyatli bo'ldi!");
        navigate("/");
      } else {
        toast.error("Xatolik: Token topilmadi!");
      }
    } catch (error) {
      console.error("Login xatosi:", error);
      toast.error("Login amalga oshmadi!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex-col flex mt-[220px] gap-3 p-10 rounded-lg bg-blue-300"
      >
        <label htmlFor="number">
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="bg-white rounded-md py-2 px-6 outline-0"
            type="number"
            id="number"
            required
            placeholder="number"
          />
        </label>
        <label htmlFor="password">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white rounded-md py-2 px-6 outline-0"
            type="password"
            id="password"
            required
            placeholder="password"
          />
        </label>
        <button
          type="submit"
          className="py-2 px-6 rounded-md bg-[#122558] text-white text-center"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
