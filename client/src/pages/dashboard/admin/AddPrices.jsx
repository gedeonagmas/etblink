import React, { useState } from "react";
import Response from "../../../components/Response";
import { useCreateMutation } from "../../../features/api/apiSlice";
import LoadingButton from "../../../components/loading/LoadingButton";

const List = (props) => {
  return (
    <div className="flex mt-5 w-full flex-col gap-2">
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.title}
      </label>
      <div className="w-full grid grid-cols-1 xl:grid-cols-2  gap-4 border rounded-lg p-4">
        {props.lists.length > 0 ? (
          props.lists.map((e) => {
            return (
              <div className=" border w-full h-auto min-h-12 py-2 px-2 rounded-lg border-gray-300 bg-gray-50 bg-dark flex items-center justify-between gap-2">
                <p className="h-auto min-h-12 p-2 mt-2">{e}</p>
                <svg
                  onClick={() =>
                    props.setLists(props.lists.filter((d) => d !== e))
                  }
                  class="w-4 h-4 cursor-pointer hover:text-gray-500"
                  aria-hidden="true"
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
            );
          })
        ) : (
          <></>
        )}

        <div className=" border w-full rounded-lg border-gray-300 bg-gray-50 bg-dark flex items-center justify-between gap-2">
          <input
            onChange={(e) => props.setList(e.target.value)}
            type="text"
            id="name"
            class="bg-gray-50 w-full rounded-lg bg-dark mr-3 focus:ring-2 border-0 focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10 "
            placeholder={"Add new " + props.title.split(" ")[1]}
            value={props.list}
            required
          />
          <svg
            onClick={props.addLists}
            class="w-6 cursor-pointer hover:text-white rounded-sm hover:bg-red-600 h-6 text-main"
            aria-hidden="true"
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
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const AddPrices = () => {
  const [createData, createResponse] = useCreateMutation();
  const [pending, setPending] = useState(false);
  const [service, setService] = useState("");
  const [services, setServices] = useState([]);
  // const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const addServices = () => {
    if (service.length > 0 && !services.includes(service)) {
      setServices([...services, service]);
      setService("");
    }
  };

  const createHandler = () => {
    createData({
      type,
      description,
      features: services,
      url: "/user/prices",
      tag: ["prices"],
    });
  };

  return (
    <div className="w-full min-h-[85vh] pt-4 flex flex-col items-start justify-start">
      <Response response={createResponse} setPending={setPending} />
      <div className="mb-5 w-full">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Type
        </label>
        <input
          onChange={(e) => setType(e.target.value)}
          // value={website}
          type="text"
          id="name"
          class="border bg-white bg-dark border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Basic, Advanced or Premium"
          required
        />
      </div>
      <div className="mb-5 w-full">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Amount
        </label>
        <input
          onChange={(e) => setPrice(e.target.value)}
          // value={video}
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="number"
          placeholder="Price"
          min={1}
        />
      </div>
      <div className="mb-5 w-full">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name=""
          id=""
          cols="30"
          rows="6"
          placeholder="Little description about your company"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </div>
      <List
        list={service}
        setList={setService}
        lists={services}
        setLists={setServices}
        addLists={addServices}
        title="Main Features"
      />{" "}
      <div className="mt-6">
        <LoadingButton
          pending={pending}
          onClick={createHandler}
          title="Add"
          color="bg-main"
          width="w-52"
        />
      </div>
    </div>
  );
};

export default AddPrices;
