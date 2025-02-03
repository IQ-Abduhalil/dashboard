import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Url";
import { toast } from "react-toastify";

export function Location() {
  const token = localStorage.getItem("myToken");
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [locatImg, setLocatImg] = useState();
  const [selectLocation, setSelectLocation] = useState();
  const [locations, setLocations] = useState({
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

  const getLocation = () => {
    axios
      .get(`${baseUrl}/locations`)
      .then((res) => {
        setLocations({
          isfetched: true,
          error: null,
          data: res?.data?.data,
        });
      })
      .catch((err) =>
        setLocations({
          isfetched: false,
          error: err,
          data: [],
        })
      );
  };
  useEffect(() => {
    getLocation();
  }, []);

  // post (create) location function

  const addLocation = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("text", text);
    formdata.append("images", locatImg);
    axios({
      method: selectLocation ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      url: `${baseUrl}/locations/${selectLocation ? selectLocation?.id : ""}`,
      data: formdata,
    })
      .then((res) => {
        getLocation();
        handleCloseModal();
        toast.success("location added");
      })
      .catch((err) => {
        console.log(err), toast.error("location no added");
      });
  };

  // edit (Put) function

  const editLocation = (locatsiya) => {
    setOpenModal(true);
    setSelectLocation(locatsiya);
    setName(locatsiya?.name);
    setText(locatsiya?.text);
  };

  // delete location function

  const deleteLocation = (locatId) => {
    axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/locations/${locatId}`,
    })
      .then((res) => {
        getLocation();
        toast.success("delete location");
      })
      .catch((err) => {
        console.log(err);
        toast.error("no delete this location");
      });
  };
  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Location
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
      {locations?.isfetched && locations?.data ? (
        locations?.data?.map((location, index) => (
          <div
            key={index}
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
          >
            <table className="mb-5 mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <td className="px-6 py-4">{location?.name}</td>

                  <td className="px-6 py-4">
                    <img
                      width="100px"
                      height="100px"
                      src={`${baseUrl}/uploads/images/${location?.image_src}`}
                      alt="image"
                    />
                  </td>
                  <td className="px-6 py-4">{location?.text}</td>
                  <td className="px-2">
                    <button
                      onClick={() => editLocation(location)}
                      className="font-medium bg-gray-200 rounded-lg px-2 py-1 text-blue-600 dark:text-blue-500 hover:bg-gray-100 cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-2 ">
                    <button
                      onClick={() => deleteLocation(location.id)}
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
                        {selectLocation ? "Edit location" : "Add location"}
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
                      onSubmit={addLocation}
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
                        brand image
                      </label>
                      <input
                        // className="border rounded-md px-4  py-3 w-[400px]"
                        type="file"
                        required
                        name="Image"
                        accept="image/png,  image/jpeg"
                        onChange={(e) => setLocatImg(e?.target?.files[0])}
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
