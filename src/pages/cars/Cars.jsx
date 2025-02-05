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
  const [models, setModels] = useState({
    isFetched: false,
    error: null,
    data: [],
  });
  const [cities, setCities] = useState({
    isFetched: false,
    error: null,
    data: [],
  });
  const [locations, setLocations] = useState({
    isFetched: false,
    error: null,
    data: [],
  });
  const [categories, setCategories] = useState({
    isFetched: false,
    error: null,
    data: [],
  });
  const [brands, setBrands] = useState({
    isFetched: false,
    error: null,
    data: [],
  });

  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem("myToken");
  const [brandId, setBrandId] = useState(null);
  const [modelId, setModelId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [citiesId, setCitiesId] = useState(null);

  const [color, setColor] = useState();
  const [year, setYear] = useState();
  const [seconds, setSeconds] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [maxspeed, setMaxspeed] = useState();
  const [maxpeople, setMaxpeople] = useState();
  const [transmission, setTransmission] = useState();
  const [motor, setMotor] = useState();
  const [drive_side, setDrive] = useState();
  const [petrol, setPetrol] = useState();
  const [limitperday, setLimit] = useState();
  const [deposit, setDeposit] = useState();
  const [premium, setPremium] = useState("");
  const [priceAed, setPriceaed] = useState();
  const [priceUsd, setPriceusd] = useState();
  const [priceAedSale, setPriceaedsale] = useState();
  const [priceUsdSale, setPriceusdsale] = useState();
  const [inclusive, setInclusive] = useState(true);
  const [cover, setCover] = useState();

  // modalka open va close

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    // setName("");
    // setBrandId("");
    // setSelectedModel("");
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

  // get cars function

  const getCars = () => {
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
  };

  // get models function

  const getModels = () => {
    axios
      .get(`${baseUrl}/models`)
      .then((res) =>
        setModels({
          isFetched: true,
          error: null,
          data: res?.data?.data,
        })
      )
      .catch((err) =>
        setModels({
          isFetched: false,
          error: err,
          data: [],
        })
      );
  };

  // get cities function

  const getCities = () => {
    axios
      .get(`${baseUrl}/cities`)
      .then((res) =>
        setCities({
          isFetched: true,
          error: null,
          data: res?.data?.data,
        })
      )
      .catch((err) =>
        setCities({
          isFetched: false,
          error: err,
          data: [],
        })
      );
  };

  // get locations function

  const getLocations = () => {
    axios
      .get(`${baseUrl}/locations`)
      .then((res) =>
        setLocations({
          isFetched: true,
          error: null,
          data: res?.data?.data,
        })
      )
      .catch((err) =>
        setLocations({
          isFetched: false,
          error: err,
          data: [],
        })
      );
  };

  // get categories function

  const getCategories = () => {
    axios
      .get(`${baseUrl}/categories`)
      .then((res) =>
        setCategories({
          isFetched: true,
          error: null,
          data: res?.data?.data,
        })
      )
      .catch((err) =>
        setCategories({
          isFetched: false,
          error: err,
          data: [],
        })
      );
  };

  useEffect(() => {
    getCars();
    getBrands();
    getModels();
    getCities();
    getLocations();
    getCategories();
  }, []);

  // post function

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("brand_id", brandId);
    formdata.append("model_id", modelId);
    formdata.append("city_id", citiesId);
    formdata.append("category_id", categoryId);
    formdata.append("location_id", locationId);
    formdata.append("color", color);
    formdata.append("year", year);
    formdata.append("seconds", seconds);
    formdata.append("images", image1);
    formdata.append("images", image2);
    formdata.append("max_speed", maxspeed);
    formdata.append("max_people", maxpeople);
    formdata.append("transmission", transmission);
    formdata.append("motor", motor);
    formdata.append("drive_side", drive_side);
    formdata.append("petrol", petrol);
    formdata.append("limitperday", limitperday);
    formdata.append("deposit", deposit);
    formdata.append("premium_protection", premium);
    formdata.append("price_in_aed", priceAed);
    formdata.append("price_in_usd", priceUsd);
    formdata.append("price_in_aed_sale", priceAedSale);
    formdata.append("price_in_usd_sale", priceUsdSale);
    // formdata.append("inclusive", inclusive);
    formdata.append("cover", cover);

    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      url: `${baseUrl}/cars`,
      data: formdata,
    })
      .then((res) => {
        handleCloseModal();
        getCars();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete cars function

  const handleDeleteCar = (carId) => {
    axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${baseUrl}/cars/${carId}`,
    })
      .then((res) => {
        getCars();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="block mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Cars
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                year
              </th>
              <th scope="col" className="px-6 py-3">
                Images
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
        </table>
      </div>
      {cars?.isFetched && cars?.data ? (
        cars?.data?.map((car, index) => (
          <div
            key={index}
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
          >
            <table className="mb-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr>
                  <td className="px-6 py-4">{car?.color}</td>
                  <td className="px-6 py-4">{car?.year}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`${baseUrl}/uploads/images/${car?.image_src}`}
                      alt="image"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      // onClick={() => editModel(car)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteCar(car?.id)}
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
                <div className="relative p-4 w-full mx-auto left-16 top-2  max-w-5xl max-h-full">
                  <div className="relative p-2  bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {/* {selectedCar ? "Edit model" : "Add model"} */}
                      </h3>
                      <button
                        onClick={handleCloseModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        X<span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <form className=" flex flex-col gap-4 mt-5   items-center">
                      <div className="flex flex-wrap justify-between gap-3">
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                            Color
                          </label>
                          <input
                            value={color}
                            className="border rounded-md px-4  py-3 w-[200px]"
                            type="text"
                            required
                            placeholder="color"
                            onChange={(e) => setColor(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                            year
                          </label>
                          <input
                            value={year}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="number"
                            required
                            placeholder="year"
                            onChange={(e) => setYear(e?.target?.value)}
                          />{" "}
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            seconds
                          </label>
                          <input
                            value={seconds}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="number"
                            required
                            placeholder="seconds"
                            onChange={(e) => setSeconds(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            image
                          </label>
                          <input
                            defaultValue={image1}
                            className="border rounded-md px-4  py-1 w-[150px]"
                            type="file"
                            required
                            accept="image/png, image/jpeg"
                            onChange={(e) => setImage1(e?.target?.files[0])}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            image2
                          </label>
                          <input
                            defaultValue={image2}
                            className="border rounded-md px-4  py-1 w-[150px]"
                            type="file"
                            required
                            accept="image/png, image/jpeg"
                            onChange={(e) => setImage2(e?.target?.files[0])}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            max speed
                          </label>
                          <input
                            value={maxspeed}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="number"
                            required
                            placeholder="speed"
                            onChange={(e) => setMaxspeed(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            max people
                          </label>
                          <input
                            value={maxpeople}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="number"
                            required
                            placeholder="people"
                            onChange={(e) => setMaxpeople(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            transmiss
                          </label>
                          <input
                            value={transmission}
                            className="border rounded-md px-4  py-3 w-[180px]"
                            type="text"
                            required
                            placeholder="transmiss"
                            onChange={(e) => setTransmission(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            motor{" "}
                          </label>
                          <input
                            value={motor}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="text"
                            required
                            placeholder="motor"
                            onChange={(e) => setMotor(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            drive
                          </label>
                          <input
                            value={drive_side}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="text"
                            required
                            placeholder="drive"
                            onChange={(e) => setDrive(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            petrol
                          </label>
                          <input
                            value={petrol}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="text"
                            required
                            placeholder="petrol"
                            onChange={(e) => setPetrol(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            limit
                          </label>
                          <input
                            value={limitperday}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="text"
                            required
                            placeholder="limit"
                            onChange={(e) => setLimit(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            deposit
                          </label>
                          <input
                            value={deposit}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="text"
                            required
                            placeholder="depost"
                            onChange={(e) => setDeposit(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            premium
                          </label>
                          <input
                            value={premium}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="text"
                            required
                            placeholder="premium"
                            onChange={(e) => setPremium(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            price Aed
                          </label>
                          <input
                            value={priceAed}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="number"
                            required
                            placeholder="priceAed"
                            onChange={(e) => setPriceaed(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            price usd
                          </label>
                          <input
                            value={priceUsd}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="number"
                            required
                            placeholder="priceUsd"
                            onChange={(e) => setPriceusd(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            price aedsale
                          </label>
                          <input
                            value={priceAedSale}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="number"
                            required
                            placeholder="priceaedSale"
                            onChange={(e) => setPriceaedsale(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            price usdsale
                          </label>
                          <input
                            value={priceUsdSale}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="number"
                            required
                            placeholder="priceUsdSale"
                            onChange={(e) => setPriceusdsale(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            inclusive
                          </label>
                          <input
                            value={inclusive}
                            className="border rounded-md px-4  py-3 w-[150px]"
                            type="checkbox"
                            required
                            placeholder="inclusive"
                            onChange={(e) => setInclusive(e?.target?.value)}
                          />
                        </div>
                        <div className="flex justify-between items-center w-[250px]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-white">
                            cover
                          </label>
                          <input
                            defaultValue={cover}
                            className="border rounded-md px-4  py-1 w-[150px]"
                            type="file"
                            required
                            accept="image/png, image/jpeg"
                            onChange={(e) => setCover(e?.target?.files[0])}
                          />
                        </div>
                      </div>

                      {/* select brands, categories, cities, locations,models */}

                      <div className="flex flex-wrap gap-2">
                        <select
                          value={brandId}
                          onChange={(e) => setBrandId(e?.target?.value)}
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>choose a brand</option>
                          {brands?.data?.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand?.title}
                            </option>
                          ))}
                        </select>

                        <select
                          value={modelId}
                          onChange={(e) => setModelId(e?.target?.value)}
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[180px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>choose a model</option>
                          {models?.data?.map((model) => (
                            <option key={model.id} value={model.id}>
                              {model?.name}
                            </option>
                          ))}
                        </select>
                        <select
                          value={citiesId}
                          onChange={(e) => setCitiesId(e?.target?.value)}
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[180px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>choose a city</option>
                          {cities?.data?.map((city) => (
                            <option key={city?.id} value={city?.id}>
                              {city?.text}
                            </option>
                          ))}
                        </select>
                        <select
                          value={categoryId}
                          onChange={(e) => setCategoryId(e?.target?.value)}
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[180px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>choose a category</option>
                          {categories?.data?.map((category) => (
                            <option key={category?.id} value={category?.id}>
                              {category?.name_en}
                            </option>
                          ))}
                        </select>
                        <select
                          value={locationId}
                          onChange={(e) => setLocationId(e?.target?.value)}
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>choose a location</option>
                          {locations?.data?.map((location) => (
                            <option key={location?.id} value={location?.id}>
                              {location?.text}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={handleSubmit}
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
