import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Url";
import { toast } from "react-toastify";

export function Cities() {
  const token = localStorage.getItem("myToken");
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [cityImg, setCityImg] = useState();
  const [selectCity, setSelectCity] = useState();
  const [cities, setCities] = useState({
    isfetched: false,
    error: null,
    data: [],
  });

  // modal open va close functions

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // get locations

  const getCities = () => {
    axios
      .get(`${baseUrl}/cities`)
      .then((res) => {
        setCities({
          isfetched: true,
          error: null,
          data: res?.data?.data,
        });
      })
      .catch((err) =>
        setCities({
          isfetched: false,
          error: err,
          data: [],
        })
      );
  };
  useEffect(() => {
    getCities();
  }, []);

  // post (create) location function

  const addCities = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("text", text);
    formdata.append("images", cityImg);
    axios({
      method: selectCity ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      url: `${baseUrl}/cities/${selectCity ? selectCity?.id : ""}`,
      data: formdata,
    })
      .then((res) => {
        getCities();
        handleCloseModal();
        toast.success("success");
      })
      .catch((err) => {
        console.log(err), toast.error("error");
      });
  };

  // edit (Put) function

  const editCity = (city) => {
    setOpenModal(true);
    setSelectCity(city);
    setName(city?.name);
    setText(city?.text);
  };

  // delete location function

  const deleteCity = (cityId) => {
    axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/cities/${cityId}`,
    })
      .then((res) => {
        getCities();
        toast.success("delete city");
      })
      .catch((err) => {
        console.log(err);
        toast.error("no delete this city");
      });
  };
  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Cities
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Text
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
        </table>
      </div>
      {cities?.isfetched && cities?.data ? (
        cities?.data?.map((city, index) => (
          <div
            key={index}
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
          >
            <table className="mb-5 mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <td className="px-6 py-4">{city?.name}</td>

                  <td className="px-6 py-4">
                    <img
                      width="100px"
                      height="100px"
                      src={`${baseUrl}/uploads/images/${city?.image_src}`}
                      alt="image"
                    />
                  </td>
                  <td className="px-6 py-4">{city?.text}</td>
                  <td className="px-2">
                    <button
                      onClick={() => editCity(city)}
                      className="font-medium bg-gray-200 rounded-lg px-2 py-1 text-blue-600 dark:text-blue-500 hover:bg-gray-100 cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-2 ">
                    <button
                      onClick={() => deleteCity(city.id)}
                      className="font-medium  bg-gray-200 rounded-lg px-2 py-1 text-blue-600 dark:text-blue-500 hover:bg-gray-100 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            {!openModal ? (
              ""
            ) : (
              <div className="  overflow-y-auto overflow-x-hidden fixed top-0 right-0  left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectCity ? "Edit city" : "Add city"}
                      </h3>
                      <button
                        onClick={handleCloseModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        X
                      </button>
                    </div>
                    <form
                      onSubmit={addCities}
                      className="flex flex-col gap-5 mt-5 pb-5  items-center"
                    >
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        name
                      </label>
                      <input
                        value={name}
                        className="border rounded-md px-4  py-3 w-[400px]"
                        type="text"
                        required
                        minLength={3}
                        placeholder="name"
                        onChange={(e) => setName(e?.target?.value)}
                      />
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        Text
                      </label>
                      <input
                        value={text}
                        className="border rounded-md px-4  py-3 w-[400px]"
                        type="text"
                        required
                        minLength={3}
                        placeholder="text"
                        onChange={(e) => setText(e?.target?.value)}
                      />
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        city image
                      </label>
                      <input
                        // className="border rounded-md px-4  py-3 w-[400px]"
                        type="file"
                        required
                        name="Image"
                        accept="image/png,  image/jpeg"
                        onChange={(e) => setCityImg(e?.target?.files[0])}
                      />

                      <button
                        className="px-3 py-1 rounded-md bg-blue-900 text-white cursor-pointer hover:bg-blue-800"
                        type="submit"
                      >
                        submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
