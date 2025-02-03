import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Url";
import { useRef } from "react";

export function Cars() {
  const [cars, setCars] = useState({
    isFetched: false,
    error: null,
    data: [],
  });

  const [openModal, setModalOpen] = useState(false);
  const brandInput = useRef("");
  const modelInput = useRef("");
  const cityInput = useRef("");
  const colorInput = useRef("");

  // cars get qilish
  useEffect(() => {
    axios
      .get(`${baseUrl}/cars`)
      .then((res) =>
        setCars({
          isFetched: true,
          error: null,
          data: res?.data?.data,
        })
      )
      .catch((err) =>
        setCars({
          isFetched: false,
          error: err,
          data: [],
        })
      );
  }, []);

  // car delete qilish
  async function deleteCar(id) {
    try {
      let response = await axios.delete(`${baseUrl}/cars/${id}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <table className="border border-separate mb-4">
        <thead>
          <tr className="flex gap-32 px-2 py-3">
            <th>Brand_id</th>
            <th>Model_Id</th>
            <th>City_id</th>
            <th>EDIT</th>
            <th>DELETE</th>
            <th
              onClick={() => {
                setModalOpen(true);
              }}
              className="py-1 px-2 rounded-md bg-blue-500 cursor-pointer hover:bg-blue-400"
            >
              CREATE
            </th>
          </tr>
        </thead>
      </table>
      {cars.isFetched && cars?.data ? (
        cars?.data.map((car, index) => (
          <table className="border border-collapse   mb-4" key={index}>
            <tbody>
              <tr className="flex items-center gap-12 px-2 py-3">
                <td className="max-w-[150px]">{car?.brand_id}</td>
                <td className="max-w-[150px]">{car?.model_id}</td>
                <td className="max-w-[150px]">{car?.city_id}</td>
                <td className="py-1 px-4 rounded-md text-white cursor-pointer hover:bg-yellow-400 transform transition-all bg-yellow-600">
                  edit
                </td>
                <td
                  onClick={() => {
                    deleteCar(car.id);
                  }}
                  className="py-1 px-4 rounded-md text-white cursor-pointer hover:bg-red-500 transform transition-all bg-red-700"
                >
                  delete
                </td>
              </tr>
            </tbody>
          </table>
        ))
      ) : (
        <h2>Loading...</h2>
      )}

      <form className={`${openModal === true ? "inline-block" : "hidden"}`}>
        <input ref={brandInput} type="text" placeholder="brand_Id" required />
        <input ref={modelInput} type="text" placeholder="model_Id" required />
        <input ref={cityInput} type="text" placeholder="city_Id" required />
        <input ref={colorInput} type="text" placeholder="color" required />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
