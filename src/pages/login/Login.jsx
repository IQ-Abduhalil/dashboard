import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../Url";

export function Login() {
  const navigate = useNavigate();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("phone_number", number);
    formData.append("password", password);
    axios({
      method: "POST",
      url: `${baseUrl}/auth/signin`,
      data: formData,
    })
      .then((res) => {
        localStorage.setItem(
          "myToken",
          res?.data?.data?.tokens?.accessToken?.token
        );
        toast.success("Muvaffaqiyatli bo'ldi!");
        navigate("/");
      })

      .catch((err) => console.log(err), toast.error("error"));
  };
  return (
    <div className="flex justify-center items-center">
      <form className="flex-col flex mt-[220px]  gap-3 p-10 rounded-lg bg-blue-300">
        <label htmlFor="number">
          <input
            onChange={(e) => setNumber(e.target.value)}
            className=" bg-white  rounded-md py-2 px-6 outline-0"
            type="number"
            id="number"
            required
            placeholder="number"
          />
        </label>
        <label htmlFor="password">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-white  rounded-md py-2 px-6 outline-0"
            type="text"
            required
            placeholder="password"
          />
        </label>
        <button
          onClick={handleSubmit}
          type="submit"
          className="py-2 px-6 rounded-md bg-[#122558] text-white text-center"
        >
          submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
