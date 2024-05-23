import React, { useEffect, useState } from "react";
import LoadingButton from "../../../components/loading/LoadingButton";
import {
  useCreateMutation,
  useDeleteMutation,
  useReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import { format } from "timeago.js";
import Loading from "../../../components/loading/Loading";
import Pop from "../../../components/Pop";
import List from "../../../components/List";

const AddCategory = () => {
  const {
    data: places,
    isFetching: placesIsFetching,
    isError: placesIsError,
  } = useReadQuery({ url: "/user/places", tag: ["places"] });

  const {
    data: categories,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/categories", tag: ["categories"] });

  const [addData, addResponse] = useCreateMutation();
  const [updateData, updateResponse] = useUpdateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [pending, setPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [add, setAdd] = useState(false);
  const [addPlace, setAddPlace] = useState(false);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categoryType, setCategoryType] = useState("local");

  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const addServices = () => {
    if (subCategory.length > 0 && !subCategories.includes(subCategory)) {
      setSubCategories([...subCategories, subCategory]);
      setSubCategory("");
    }
  };

  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");

  const addHandler = () => {
    addData({
      category,
      subCategory: subCategories,
      type: categoryType,
      url: "/user/categories",
      tag: ["categories"],
    });
  };

  const deleteHandler = () => {
    id && deleteData({ url: `/user/categories?id=${id}`, tag: ["categories"] });
  };

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setPopup(false);
    }
  }, [deleteResponse]);

  //places
  const addCities = () => {
    if (city.length > 0 && !cities.includes(city)) {
      setCities([...cities, city]);
      setCity("");
    }
  };

  const addCountries = () => {
    if (country.length > 0 && !countries.includes(country)) {
      setCountries([...countries, country]);
      setCountry("");
    }
  };

  const updateHandler = () => {
    if (
      places.data === undefined ||
      places.message === "you are in the last page"
    ) {
      addData({
        city: cities,
        country: countries,
        url: `/user/places`,
        tag: ["places"],
      });
    } else if (places?.data[0]?._id) {
      updateData({
        city: cities,
        country: countries,
        url: `/user/places?id=${places?.data[0]?._id}`,
        tag: ["places"],
      });
    }
  };

  useEffect(() => {
    if (places?.data) {
      const data = places?.data[0];
      setCities(data?.city ? data?.city : cities);
      setCountries(data?.country ? data?.country : countries);
    }
  }, [places]);

  console.log(places, "places");
  return (
    <div className="flex min-h-[85vh] px-10 pb-5 relative bg-dark bg-white flex-col h-auto w-full gap-5">
      <Response response={addResponse} setPending={setPending} />
      <Response response={deleteResponse} setPending={setDeletePending} />
      <Response response={updateResponse} setPending={setPending} />

      <div className="w-full flex items-center justify-end gap-4">
        <button
          onClick={() => setAdd(true)}
          className="px-5 self-end rounded-lg py-2 text-white bg-main"
        >
          Add New Category
        </button>
        <button
          onClick={() => setAddPlace(true)}
          className="px-5 self-end rounded-lg py-2 text-white bg-main"
        >
          Add Places
        </button>
      </div>

      <p className="text-lg font-bold">Categories</p>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {isFetching && <Loading />}
        {isError && <p>Something went wrong unable to read boost data</p>}
        {categories && categories?.data?.length > 0 ? (
          categories?.data?.map((e) => {
            return (
              <div
                key={e._id}
                className="flex w-full border px-4 border-dark rounded-lg relative justify-start py-4 gap-1 flex-col items-enter"
              >
                <div className="flex flex-col gap-1">
                  <p className=" py-1 border-b font-bold">Main category</p>
                  <p className="font-light">{e?.category}</p>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="py-1  border-b font-bold">Sub category</p>
                  {e?.subCategory?.length > 0 ? (
                    e.subCategory?.map((s) => {
                      return <p className="font-light ml-5">- {s}</p>;
                    })
                  ) : (
                    <p>no sub category</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <p className=" py-1 border-b font-bold">Type</p>
                  <p className="font-light">{e?.type}</p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="mt-2 flex flex-col gap-1">
                    <p className="py-1 border-b font-bold">Created At</p>
                    <p className="text-sm font-light">{format(e?.createdAt)}</p>
                  </div>

                  <div className="mt-2 flex flex-col gap-1">
                    <p className="py-1 border-b font-bold">Updated At</p>
                    <p className="text-sm font-light">{format(e?.updatedAt)}</p>
                  </div>
                </div>
                <div className="flex w-full mt-3 items-center justify-between">
                  <button
                    onClick={() => {
                      setPopup(true);
                      setId(e._id);
                    }}
                    className="px-2 w-20 py-2 bg-main text-white rounded-lg"
                  >
                    Delete
                  </button>
                  <a
                    href={`/dashboard/admin/category/detail?${e._id}`}
                    className="py-2 w-20 px-2 rounded-lg bg-emerald-500 text-center text-white"
                  >
                    Edit
                  </a>
                </div>
              </div>
            );
          })
        ) : (categories && categories?.message) ||
          categories?.data?.length === 0 ? (
          <div>There is no data to display.</div>
        ) : null}
      </div>

      {addPlace && (
        <div className="absolute shadow-xl z-30 top-2 bg-white bg-dark right-0 w-full rounded-lg p-4 border border-gray-300">
          <div className="relative cursor-pointer">
            <svg
              class="w-6 absolute top-1 right-1 hover:text-gray-600 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              onClick={() => setAddPlace(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </div>
          {placesIsFetching && <Loading />}
          {placesIsError && <p>Something went wrong for reading places data</p>}
          {places && places?.data ? (
            <>
              <List
                list={city}
                setList={setCity}
                lists={cities}
                setLists={setCities}
                addLists={addCities}
                title="Add Cities"
              />

              <List
                list={country}
                setList={setCountry}
                lists={countries}
                setLists={setCountries}
                addLists={addCountries}
                title="Add Countries"
              />

              <div className="flex items-center gap-5 mt-5">
                <LoadingButton
                  pending={pending}
                  onClick={updateHandler}
                  title="Save"
                  color="bg-emerald-500"
                  width="w-52"
                />
              </div>
            </>
          ) : (places && places?.message) || places?.data?.length === 0 ? (
            <div>There is no data to display.</div>
          ) : null}
        </div>
      )}

      {popup && (
        <Pop
          content="Are you sure you want to remove this category?"
          cancel={setPopup}
          trigger={
            <LoadingButton
              pending={deletePending}
              onClick={deleteHandler}
              title="Yes, I'm Sure"
              color="bg-main"
              width="w-36 sm:rounded-lg sm:border sm:py-2 sm:px-5 sm:hover:bg-red-500"
            />
          }
        />
      )}
      {add && (
        <div className="absolute shadow-xl z-30 top-2 bg-white bg-dark right-0 w-full rounded-lg p-4 border border-gray-300">
          <div className="relative cursor-pointer">
            <svg
              class="w-6 absolute top-1 right-1 hover:text-gray-600 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              onClick={() => setAdd(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </div>
          <div className="mb-5 mt-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Main Category
            </label>
            <input
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
            />
          </div>

          <List
            list={subCategory}
            setList={setSubCategory}
            lists={subCategories}
            setLists={setSubCategories}
            addLists={addServices}
            title="Sub Categories"
          />

          <div className="mb-5 mt-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>

            <select
              onChange={(e) => setCategoryType(e.target.value)}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Skylight Technologies"
              required
            >
              <option selected value="local">
                Local
              </option>
              <option value="global">Global</option>
            </select>
          </div>
          <LoadingButton
            pending={pending}
            onClick={addHandler}
            title="Add"
            color="bg-main"
            width="w-52"
          />
        </div>
      )}
    </div>
  );
};

export default AddCategory;
