import React from "react";
import { useEffect } from "react";
import { baseUrl } from "../../Url";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function Brands() {
  const token = localStorage.getItem("myToken");
  const [brands, setBrands] = useState({
    isFetched: false,
    error: null,
    data: [],
  });
  const [openModal, setModalOpen] = useState(false);
  const [selectBrand, setSelectBrand] = useState();
  const [brandImg, setBrandImg] = useState();
  const [title, setTitle] = useState();

  // modal open va close functions

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTitle("");
    setSelectBrand("");
  };

  // get brands

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
  }, []);

  // post (create) brands function

  const addBrands = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("images", brandImg);

    axios({
      method: selectBrand ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      url: `${baseUrl}/brands/${selectBrand ? selectBrand?.id : ""}`,
      data: formdata,
    })
      .then((res) => {
        handleCloseModal();
        console.log(res);
        getBrands();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // edit (PUT) brand function

  const editBrands = (brand) => {
    setModalOpen(true);
    setSelectBrand(brand);
    setTitle(brand?.title);
  };

  // delete brands function

  const deleteBrand = (brandId) => {
    axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/brands/${brandId}`,
    })
      .then((res) => {
        getBrands();
        toast.success("brand delete qilindi");
      })
      .catch((err) => {
        console.log(err);
        toast.error("brand delete qilinmadi");
      });
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="block mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Brand
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
        </table>
      </div>
      {brands?.isFetched && brands?.data ? (
        brands?.data?.map((brand, index) => (
          <div
            key={index}
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
          >
            <table className="mb-5 mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <td className="px-6 py-4">{brand?.title}</td>
                  <td className="px-6 py-4">
                    <img
                      width="100px"
                      height="100px"
                      src={`${baseUrl}/uploads/images/${brand?.image_src}`}
                      alt="image"
                    />
                  </td>
                  <td className="px-2">
                    <button
                      onClick={() => editBrands(brand)}
                      className="font-medium bg-gray-200 rounded-lg px-2 py-1 text-blue-600 dark:text-blue-500 hover:bg-gray-100 cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-2 ">
                    <button
                      onClick={() => deleteBrand(brand.id)}
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
                <div className="relative p-4 w-full left-80 top-2 max-w-5xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectBrand ? "Edit brand" : "Add brand"}
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
                      onSubmit={addBrands}
                      className="flex flex-col gap-5 mt-5 pb-5  items-center"
                    >
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        title
                      </label>
                      <input
                        value={title}
                        className="border rounded-md px-4  py-3 w-[400px]"
                        type="text"
                        required
                        minLength={3}
                        placeholder="title"
                        onChange={(e) => setTitle(e?.target?.value)}
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
                        onChange={(e) => setBrandImg(e?.target?.files[0])}
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
