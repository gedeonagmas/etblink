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

export default List;
