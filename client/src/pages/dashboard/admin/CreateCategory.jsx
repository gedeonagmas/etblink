import React, { useState } from "react";
import List from "../../../components/List";

const CreateCategory = () => {
  const [detail, setDetail] = useState(false);
  const [category, setCategory] = useState([
    { category: "Promotion", subCategory: ["Promotion and advert"] },
  ]);
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");

  const [subCategory, setSubCategory] = useState([]);
  const [service, setService] = useState("");
  const [services, setServices] = useState([]);

  const addServices = () => {
    if (service.length > 0 && !services.includes(service)) {
      setServices([...services, service]);
      setService("");
    }
  };

  const addCategoryHandler = () => {
    setCategory([
      ...category,
      { category: categoryValue, subCategory: category?.subCategory },
    ]);
  };

  const addSubCategoryHandler = () => {
    setCategory([
      { subCategory: [...category[0].subCategory, subCategoryValue] },
    ]);
  };

  console.log(category.subCategory, "cccccc");
  return (
    <div className="w-fulls p-5">
      <p className="font-bold text-lg">Categories</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam
        dicta nihil dolorem est. Animi est libero ad perferendis et. Autem,
        dolore vero. Totam tenetur tempora labore distinctio rem? Repudiandae?
      </p>
      <p className="font-bold text-lg mt-4">Available Categories</p>
      <div className="w-fulls pt-2 flex items-center gap-10">
        <button className="px-5 font-bold border-b-2 border-gray-200 py-1 ">
          Local
        </button>
        <button className="px-5 font-bold border-b-2 border-gray-200 py-1 ">
          Global
        </button>
      </div>

      {/* <List
        list={service}
        setList={setService}
        lists={services}
        setLists={setServices}
        addLists={addServices}
        title="Highlight Services"
      />{" "} */}
      <div className="border  flex p-8 flex-col  rounded-lg mt-2 gap-2">
        <div className="flex flex-col gap-1">
          {category?.length > 0
            ? category?.map((c) => {
                return (
                  <div className="border p-2 rounded-lg border-dotted border-main">
                    <div className="flex w-full items-center mt-2 gap-3">
                      <input
                        onChange={(e) =>
                          setCategory([{ category: e.target.value }])
                        }
                        value={c?.category}
                        type="text"
                        placeholder="Promotion"
                        className="rounded-lg w-full text-black font-bold border-gray-400 h-9"
                      />

                      <svg
                        onClick={() => setDetail(!detail)}
                        class="w-5 h-5 cursor-pointer"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>

                    {detail && (
                      <div className="ml-5 lg:ml-20 mt-2  flex flex-col gap-3">
                        {c?.subCategory?.map((s,i) => {
                          return (
                            <input
                              onChange={(e) =>
                                setCategory([
                                  {
                                    subCategory: [
                                      ...c.subCategory,
                                      e.target.value,
                                    ],
                                  },
                                ])
                              }
                              value={s}
                              type="text"
                              placeholder="sub category"
                              className="rounded-lg border-gray-400 h-9"
                            />
                          );
                        })}

                        <div className="flex w-full items-center gap-3">
                          <input
                            onChange={(e) =>
                              setSubCategoryValue(e.target.value)
                            }
                            value={subCategoryValue}
                            type="text"
                            placeholder="new sub category"
                            className="rounded-lg w-full border-gray-400 h-9"
                          />
                          <svg
                            onClick={addSubCategoryHandler}
                            class="w-6 h-6 rounded-full hover:bg-white hover:text-main cursor-pointer bg-main text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            : null}

          <div className="flex w-full items-center mt-5 gap-3">
            <input
              onChange={(e) => setCategoryValue(e.target.value)}
              value={categoryValue}
              type="text"
              placeholder="new category"
              className="rounded-lg w-full border-gray-400 h-9"
            />
            <svg
              onClick={addCategoryHandler}
              class="w-6 h-6 rounded-full hover:bg-white hover:text-main cursor-pointer bg-main text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
