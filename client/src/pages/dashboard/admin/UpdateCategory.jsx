import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useReadQuery,
  useUpdateMutation,
} from "../../../features/api/apiSlice";
import Response from "../../../components/Response";
import LoadingButton from "../../../components/loading/LoadingButton";
import Loading from "../../../components/loading/Loading";
import List from "../../../components/List";

const UpdateCategory = () => {
  const location = useLocation()?.search?.split("?")[1];
  const {
    data: categories,
    isFetching,
    isError,
  } = useReadQuery({
    url: `/user/categories/${location}`,
    tag: ["categories"],
  });

  const [updateData, updateResponse] = useUpdateMutation();

  const [pending, setPending] = useState(false);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categoryType, setCategoryType] = useState("local");

  const addServices = () => {
    if (subCategory.length > 0 && !subCategories.includes(subCategory)) {
      setSubCategories([...subCategories, subCategory]);
      setSubCategory("");
    }
  };

  const updateHandler = () => {
    updateData({
      category,
      subCategory: subCategories,
      type: categoryType,
      url: `/user/categories?id=${location}`,
      tag: ["categories"],
    });
  };

  useEffect(() => {
    if (categories?.data) {
      const data = categories?.data[0];
      setCategory(data?.category ? data?.category : category);
      setSubCategories(data?.subCategory ? data?.subCategory : subCategories);
      setCategoryType(data?.type ? data?.type : categoryType);
    }
  }, [categories]);

  console.log(categories, "news");
  return (
    <div className="w-full min-h-[85vh] h-auto">
      <Response response={updateResponse} setPending={setPending} />
      {isFetching && <Loading />}
      {isError && <p>Something went wrong for reading categories data</p>}
      {categories && categories?.data ? (
        <div className="  w-full  rounded-lg p-4 border border-gray-300">
          <div className="mb-5">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Main Category
            </label>
            <input
              onChange={(e) => setCategory(e.target.value)}
              value={category}
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
            title="sub Category"
          />

          <div className="mb-5 mt-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>

            <select
              onChange={(e) => setCategoryType(e.target.value)}
              value={categoryType}
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
          <div className="flex items-center gap-5">
            <LoadingButton
              pending={pending}
              onClick={updateHandler}
              title="Update"
              color="bg-emerald-500"
              width="w-52"
            />
            <a
              href={`/dashboard/admin/category`}
              className="py-2 w-52 rounded-lg bg-gray-500 text-center text-white"
            >
              Back
            </a>
          </div>
        </div>
      ) : (categories && categories?.message) ||
        categories?.data?.length === 0 ? (
        <div>There is no data to display.</div>
      ) : null}
    </div>
  );
};

export default UpdateCategory;
