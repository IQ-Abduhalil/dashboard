import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../Url";

export function Categories() {
  const token = localStorage.getItem("myToken");
  const [openModal, setOpenModal] = useState(false);
  const [categoryImg, setCategoryImg] = useState();
  const [nameEn, setNameEn] = useState();
  const [nameRu, setNameRu] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [categories, setCategories] = useState({
    isFetched: false,
    error: null,
    data: [],
  });

  // modalka  open-close function

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNameEn("");
    setNameRu("");
    setSelectCategory("");
  };

  // category  get function

  const getCategory = () => {
    axios
      .get(`${baseUrl}/categories`)
      .then((res) => {
        setCategories({
          isFetched: true,
          error: null,
          data: res?.data?.data,
        });
      })
      .catch((err) =>
        setCategories({
          isFetched: false,
          error: err,
          data: [],
        })
      );
  };

  // post (create) function

  const addCategory = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name_en", nameEn),
      formdata.append("name_ru", nameRu),
      formdata.append("images", categoryImg);

    axios({
      method: selectCategory ? "PUT" : "POST",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      url: `${baseUrl}/categories/${selectCategory ? selectCategory?.id : ""}`,
      data: formdata,
    })
      .then((res) => {
        handleCloseModal();
        getCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // edit function

  const editCategory = (category) => {
    setOpenModal(true);
    setSelectCategory(category);
    setNameEn(category?.name_en);
    setNameRu(category?.name_ru);
  };

  useEffect(() => {
    getCategory();
  }, []);

  // delete function

  const deleteCategory = (categoryId) => {
    axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/categories/${categoryId}`,
    })
      .then((res) => {
        getCategory();
        toast.success("category delete qilindi...");
      })
      .catch((err) => {
        console.log(err);
        toast.error("category delete qilinmadi...");
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
                Name en
              </th>
              <th scope="col" className="px-6 py-3">
                Name ru
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
      {categories?.isFetched && categories?.data ? (
        categories?.data?.map((category, index) => (
          <div
            key={index}
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
          >
            <table className="mb-5 mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <td className="px-6 py-4">{category?.name_en}</td>
                  <td className="px-6 py-4">{category?.name_ru}</td>
                  <td className="px-6 py-4">
                    <img
                      width="100px"
                      height="100px"
                      src={`${baseUrl}/uploads/images/${category?.image_src}`}
                      alt="image"
                    />
                  </td>
                  <td className="px-2">
                    <button
                      onClick={() => editCategory(category)}
                      className="font-medium bg-gray-200 rounded-lg px-2 py-1 text-blue-600 dark:text-blue-500 hover:bg-gray-100 cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-2 ">
                    <button
                      onClick={() => deleteCategory(category.id)}
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
                        {selectCategory ? "Edit category" : "Add category"}
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
                      onSubmit={addCategory}
                      className="flex flex-col gap-5 mt-5 pb-5  items-center"
                    >
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        category name en
                      </label>
                      <input
                        value={nameEn}
                        className="border rounded-md px-4  py-3 w-[400px]"
                        type="text"
                        required
                        minLength={3}
                        placeholder=" name en"
                        onChange={(e) => setNameEn(e?.target?.value)}
                      />
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        category name ru
                      </label>
                      <input
                        value={nameRu}
                        className="border rounded-md px-4  py-3 w-[400px]"
                        type="text"
                        minLength={3}
                        required
                        placeholder="name ru"
                        onChange={(e) => setNameRu(e?.target?.value)}
                      />
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        category image
                      </label>
                      <input
                        // className="border rounded-md px-4  py-3 w-[400px]"
                        type="file"
                        required
                        name="myImage"
                        accept="image/png,  image/jpeg"
                        onChange={(e) => setCategoryImg(e?.target?.files[0])}
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
