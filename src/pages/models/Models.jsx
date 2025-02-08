import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Url";
import { toast } from "react-toastify";

export function Models() {
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState(null);
  const token = localStorage.getItem("myToken");
  const [selectedModel, setSelectedModel] = useState("");
  // models
  const [models, setModels] = useState({
    isFetched: false,
    error: null,
    data: [],
  });

  // brands
  const [brands, setBrands] = useState({
    isFetched: false,
    error: null,
    data: [],
  });

  // get models function
  const getModels = () => {
    axios
      .get(`${baseUrl}/models`)
      .then((res) => {
        setModels({
          isFetched: true,
          error: null,
          data: res?.data?.data,
        });
      })

      .catch((err) => {
        setModels({
          isFetched: false,
          error: err,
          data: [],
        });
      });
  };

  // get brands function

  const getBrands = () => {
    axios
      .get(`${baseUrl}/brands`)
      .then((res) => {
        setBrands({
          isFetched: true,
          error: null,
          data: res?.data?.data,
        });
      })

      .catch((err) => {
        setBrands({
          isFetched: false,
          error: err,
          data: [],
        });
      });
  };
  useEffect(() => {
    getBrands();
    getModels();
  }, []);

  // modal open va close functonlari

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setName("");
    setBrandId("");
    setSelectedModel("");
  };

  // post yuborish

  const handleAddModels = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("brand_id", brandId);

    axios({
      method: selectedModel ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/models/${selectedModel ? selectedModel?.id : ""}`,
      data: formdata,
    })
      .then((res) => {
        handleCloseModal();
        getModels();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // edit qilish

  const editModel = (model) => {
    setOpenModal(true);
    setSelectedModel(model);
    setName(model?.name);
    setBrandId(model?.id);
  };

  // delete qilish

  const deleteModel = function (modelId) {
    axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/models/${modelId}`,
    })
      .then((res) => {
        console.log(res);
        getModels();
        toast.success("Delete qilindi");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Delete qilib bolmadi...");
      });
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="block mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Model
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Model Name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand_id
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
        </table>
      </div>
      {models?.isFetched && models?.data ? (
        models?.data?.map((model, index) => (
          <div
            key={index}
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
          >
            <table className="mb-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <td className="px-6 py-4 max-w-[90px]">{model?.name}</td>
                  <td className="px-6 py-4 max-w-[90px]">{model?.brand_id}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => editModel(model)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteModel(model.id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
                <div className="relative p-4 w-full left-80 top-2 max-w-5xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectedModel ? "Edit model" : "Add model"}
                      </h3>
                      <button
                        onClick={handleCloseModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        X<span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <form className=" mt-5 justify-center flex flex-col gap-8 p-2  items-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Model name
                      </label>
                      <input
                        value={name}
                        className="border rounded-md px-4  py-3 w-[400px]"
                        type="text"
                        required
                        placeholder="model name"
                        onChange={(e) => setName(e?.target?.value)}
                      />
                      <select
                        value={brandId}
                        onChange={(e) => setBrandId(e?.target?.value)}
                        id="countries"
                        className="bg-gray-50 max-w-[40 0px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>choose a brand</option>
                        {brands?.data?.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand?.title}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAddModels}
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
