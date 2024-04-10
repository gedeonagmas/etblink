import React, { useEffect, useState } from "react";
import LoadingButton from "../../components/loading/LoadingButton";
import Response from "../../components/Response";
import { useUpdateMutation } from "../../features/api/apiSlice";

const List = (props) => {
  return (
    <div className="flex mt-5 w-full flex-col gap-2">
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.title}
      </label>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 border rounded-lg p-4">
        {props.lists.length > 0 ? (
          props.lists.map((e) => {
            return (
              <div className=" border w-full py-1 px-2 rounded-lg border-gray-300 bg-gray-50 bg-dark flex items-center justify-between gap-2">
                <p className="">{e}</p>
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

        <div className=" border w-full py-1 px-2 rounded-lg border-gray-300 bg-gray-50 bg-dark flex items-center justify-between gap-2">
          <input
            onChange={(e) => props.setList(e.target.value)}
            type="text"
            id="name"
            class="bg-gray-50 w-full bg-dark mr-3 border-0 focus:outline-0 focus:ring-0 h-7 "
            placeholder={"Add new " + props.title.split(" ")[1]}
            value={props.list}
            required
          />
          <svg
            onClick={props.addLists}
            class="w-6 cursor-pointer hover:text-red-500 h-6 text-main"
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

const Profile = () => {
  const [updateData, updateResponse] = useUpdateMutation();
  const [pending, setPending] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [type, setType] = useState("Local");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [video, setVideo] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [service, setService] = useState("");
  const [services, setServices] = useState([]);
  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState([]);
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [galleries, setGalleries] = useState("");

  const [socialMedias, setSocialMedias] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  const [workingDays, setWorkingDays] = useState({
    monday: { from: "", to: "" },
    tuesday: { from: "", to: "" },
    wednesday: { from: "", to: "" },
    thursday: { from: "", to: "" },
    saturday: { from: "", to: "" },
    friday: { from: "", to: "" },
    sunday: { from: "", to: "" },
  });

  const [pricingRange, setPricingRange] = useState({
    from: "",
    to: "",
    currencies: "Birr",
  });

  const addServices = () => {
    if (service.length > 0 && !services.includes(service)) {
      setServices([...services, service]);
      setService("");
    }
  };

  const addFeatures = () => {
    if (feature.length > 0 && !features.includes(feature)) {
      setFeatures([...features, feature]);
      setFeature("");
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`, position);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("etblink_user")));
  }, []);

  useEffect(() => {
    if (user) {
      const data = user?.user;
      setTitle(data?.title ? data.title : title);
      setType(data?.type ? data.type : type);
      setName(data?.name ? data.name : name);
      setPhone(data?.phone ? data.phone : phone);
      setVideo(data?.video ? data.video : video);
      setWebsite(data?.website ? data.website : website);
      setDescription(data?.description ? data.description : description);
      setServices(data?.services ? data.services : services);
      setFeatures(data?.features ? data.features : features);
      setLogo(data?.logo ? data?.logo : logo);
      setAddress(data?.address ? data?.address : address);
      setBanner(data?.banner ? data.banner : banner);
      setGalleries(data?.galleries ? data?.galleries : "");
      setSocialMedias(data?.socialMedias ? data.socialMedias : socialMedias);
      setWorkingDays(data?.workingDays ? data.workingDays : workingDays);
    }
  }, [user]);

  function meridian(value) {
    var [h, m] = value.split(":");
    return h >= 12 ? `${h}:${m} PM` : `${h}:${m} AM`;
  }

  const updateHandler = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("title", title);
    formData.append("phone", phone);
    formData.append("video", video);
    formData.append("website", website);
    formData.append("description", description);
    formData.append("services", services);
    formData.append("features", features);
    formData.append("logo", logo);
    formData.append("banner", banner);
    formData.append("address", address);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("socialMedias", JSON.stringify(socialMedias));
    formData.append("workingDays", JSON.stringify(workingDays));
    formData.append("url", `/user/companies?id=${user?.user?._id}`);
    formData.append("tag", ["users", "companies"]);
    galleries?.length > 0
      ? [...galleries].forEach((image) => {
          formData.append("galleries", image);
        })
      : formData.append("galleries", galleries);

    // for (var key of formData.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }

    // updateData({ url: `/user/companies?id=${user?._id}`, tag: ["users", "companies"] });
    updateData(formData);
  };

  // console.log(user, "user");
  return (
    <div className="w-full p-5 flex pb-10 flex-col rounded-lg border gap-2 items-start justify-center">
      <Response
        response={updateResponse}
        setPending={setPending}
        type="update"
      />
      <p className="text-lg font-semibold">Your company information</p>
      <p className="text-sm max-w-[700px]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
        blanditiis velit doloremque ducimus adipisci eaque quis temporibus,
        distinctio sequi tempora ad! Ut sint quidem est iste! Nostrum saepe
        corrupti repudiandae.
      </p>
      <p className="text-lg font-semibold mt-6">Information's</p>
      <div className="grid w-full mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Skylight Technologies"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Type
          </label>

          <select
            onChange={(e) => setType(e.target.value)}
            value={type}
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
        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Skylight Technologies Groups"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone number
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="+251 954 104 637"
            required
          />
        </div>
        <div className="mb-5">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Video
          </label>
          <input
            onChange={(e) => setVideo(e.target.files[0])}
            value={video}
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          />
        </div>
        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Website
          </label>
          <input
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="skylighttechnologies.com"
            required
          />
        </div>
      </div>
      <div className="mb-5 w-full">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Address
        </label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="addis ababa"
          required
        />
      </div>
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
        rows="10"
        placeholder="Little description about your company"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>
      <p className="text-lg font-semibold mt-6">Lists</p>
      <List
        list={service}
        setList={setService}
        lists={services}
        setLists={setServices}
        addLists={addServices}
        title="Highlight Services"
      />{" "}
      <List
        list={feature}
        setList={setFeature}
        lists={features}
        setLists={setFeatures}
        addLists={addFeatures}
        title="Main Features"
      />
      <p className="text-lg font-semibold mt-6">Attachments</p>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        <div className="mb-5">
          <label class="block text-sm font-medium">Logo</label>
          <div
            style={{ backgroundImage: `url(${user?.user?.logo})` }}
            class={`mt-4  flex justify-center object-fill object-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md`}
          >
            <div class="space-y-1 text-center">
              <svg
                class="mx-auto text-main h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label
                  for="file-upload1"
                  class="relative cursor-pointer rounded-md font-medium text-main hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span class="">Upload a file</span>
                  <input
                    onChange={(e) => setLogo(e.target.files[0])}
                    // value={logo}
                    id="file-upload1"
                    name="file-upload1"
                    type="file"
                    class="sr-only"
                  />
                </label>
                <p class="pl-1">res 120 x 120 pixels</p>
              </div>
              <p class="text-xs">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <label class="block text-sm font-medium">Banner</label>
          <div
            style={{ backgroundImage: `url(${user?.user?.banner})` }}
            class="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
          >
            <div class="space-y-1 text-center">
              <svg
                class="mx-auto text-main h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label
                  for="file-upload2"
                  class="relative cursor-pointer rounded-md font-medium text-main hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span class="">Upload a file</span>
                  <input
                    onChange={(e) => setBanner(e.target.files[0])}
                    // value={banner}
                    id="file-upload2"
                    name="file-upload2"
                    type="file"
                    class="sr-only"
                    multiple
                  />
                </label>
                <p class="pl-1">res 1200 x 400 pixels</p>
              </div>
              <p class="text-xs">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <label class="block text-sm font-medium">
            Photo Galleries(maximum 10)
          </label>
          <div
            style={{
              backgroundImage: `url(${user?.user?.galleries[0]})`,
            }}
            class="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
          >
            <div class="space-y-1 text-center">
              <svg
                class="mx-auto text-main h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label
                  for="file-upload3"
                  class="relative cursor-pointer rounded-md font-medium text-main hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span class="">Upload a file</span>
                  <input
                    onChange={(e) => setGalleries(e.target.files)}
                    // value={galleries}
                    id="file-upload3"
                    name="file-upload3"
                    type="file"
                    class="sr-only"
                    multiple
                  />
                </label>
                <p class="pl-1">res 800 x 600 pixels each</p>
              </div>
              <p class="text-xs">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-lg font-semibold mt-6">Social Medias</p>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
        <div className="mb-3">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Facebook
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2.5">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                clip-rule="evenodd"
              />
            </svg>

            <input
              onChange={(e) =>
                setSocialMedias({ ...socialMedias, facebook: e.target.value })
              }
              value={socialMedias?.facebook}
              type="text"
              className="w-full h-7 focus:outline-none bg-dark border-0 focus:ring-0"
              placeholder="skylight.facebook.com"
            />
          </div>
        </div>

        <div className="mb-3">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Instagram
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
            <input
              onChange={(e) =>
                setSocialMedias({ ...socialMedias, instagram: e.target.value })
              }
              value={socialMedias?.instagram}
              type="text"
              className="w-full h-7 focus:outline-none bg-dark border-0 focus:ring-0"
              placeholder="skylight.facebook.com"
            />
          </div>
        </div>

        <div className="mb-3">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            X(twitter)
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2.5">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
            </svg>

            <input
              onChange={(e) =>
                setSocialMedias({ ...socialMedias, twitter: e.target.value })
              }
              value={socialMedias?.twitter}
              type="text"
              className="w-full h-7 focus:outline-none bg-dark border-0 focus:ring-0"
              placeholder="skylight.facebook.com"
            />
          </div>
        </div>

        <div className="mb-3">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Linkedin
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2.5">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                clip-rule="evenodd"
              />
              <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
            </svg>

            <input
              onChange={(e) =>
                setSocialMedias({ ...socialMedias, linkedin: e.target.value })
              }
              value={socialMedias?.linkedin}
              type="text"
              className="w-full h-7 focus:outline-none bg-dark border-0 focus:ring-0"
              placeholder="skylight.facebook.com"
            />
          </div>
        </div>
      </div>
      <p className="text-lg font-semibold mt-6">Working Days</p>
      <div className="flex flex-col w-full gap-4 mt-2">
        <div className="flex  flex-col md:flex-row w-full justify-between border rounded-lg p-2.5 items-start md:items-center gap-6">
          <p className="font-bold w-full">Monday</p>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">From</p>
            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  monday: {
                    from: meridian(e.target.value),
                    to: workingDays?.monday?.to,
                  },
                })
              }
              value={workingDays?.monday?.from?.split(" ")[0]}
              type="time"
              name=""
              id="monday-from"
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">To</p>

            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  monday: {
                    from: workingDays?.monday?.from,
                    to: meridian(e.target.value),
                  },
                })
              }
              value={workingDays?.monday?.to?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex  flex-col md:flex-row w-full justify-between border rounded-lg p-2.5 items-start md:items-center gap-6">
          <p className="font-bold w-full">Tuesday</p>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">From</p>
            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  tuesday: {
                    from: meridian(e.target.value),
                    to: workingDays?.tuesday?.to,
                  },
                })
              }
              value={workingDays?.tuesday?.from?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">To</p>

            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  tuesday: {
                    from: workingDays?.tuesday?.from,
                    to: meridian(e.target.value),
                  },
                })
              }
              value={workingDays?.tuesday?.to?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex  flex-col md:flex-row w-full justify-between border rounded-lg p-2.5 items-start md:items-center gap-6">
          <p className="font-bold w-full">Wednesday</p>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">From</p>
            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  wednesday: {
                    from: meridian(e.target.value),
                    to: workingDays?.wednesday?.to,
                  },
                })
              }
              value={workingDays?.wednesday?.from?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">To</p>

            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  wednesday: {
                    from: workingDays?.wednesday?.from,
                    to: meridian(e.target.value),
                  },
                })
              }
              value={workingDays?.wednesday?.to?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex  flex-col md:flex-row w-full justify-between border rounded-lg p-2.5 items-start md:items-center gap-6">
          <p className="font-bold w-full">Thursday</p>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">From</p>
            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  thursday: {
                    from: meridian(e.target.value),
                    to: workingDays?.thursday?.to,
                  },
                })
              }
              value={workingDays?.thursday?.from?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">To</p>

            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  thursday: {
                    from: workingDays?.thursday?.from,
                    to: meridian(e.target.value),
                  },
                })
              }
              value={workingDays?.thursday?.to?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex  flex-col md:flex-row w-full justify-between border rounded-lg p-2.5 items-start md:items-center gap-6">
          <p className="font-bold w-full">Friday</p>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">From</p>
            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  friday: {
                    from: meridian(e.target.value),
                    to: workingDays?.friday?.to,
                  },
                })
              }
              value={workingDays?.friday?.from?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">To</p>

            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  friday: {
                    from: workingDays?.friday?.from,
                    to: meridian(e.target.value),
                  },
                })
              }
              value={workingDays?.friday?.to?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex  flex-col md:flex-row w-full justify-between border rounded-lg p-2.5 items-start md:items-center gap-6">
          <p className="font-bold w-full">Saturday</p>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">From</p>
            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  saturday: {
                    from: meridian(e.target.value),
                    to: workingDays?.saturday?.to,
                  },
                })
              }
              value={workingDays?.saturday?.from?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">To</p>

            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  saturday: {
                    from: workingDays?.saturday?.from,
                    to: meridian(e.target.value),
                  },
                })
              }
              value={workingDays?.saturday?.to?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex  flex-col md:flex-row w-full justify-between border rounded-lg p-2.5 items-start md:items-center gap-6">
          <p className="font-bold w-full">Sunday</p>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">From</p>
            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  sunday: {
                    from: meridian(e.target.value),
                    to: workingDays?.sunday?.to,
                  },
                })
              }
              value={workingDays?.sunday?.from?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex w-full gap-2 items-center">
            <p className="w-12">To</p>

            <input
              onChange={(e) =>
                setWorkingDays({
                  ...workingDays,
                  sunday: {
                    from: workingDays?.sunday?.from,
                    to: meridian(e.target.value),
                  },
                })
              }
              value={workingDays?.sunday?.to?.split(" ")[0]}
              type="time"
              name=""
              id=""
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      {/* <p className="text-lg font-semibold mt-6">Pricing Range</p>
      <div className="flex  flex-col md:flex-row w-full justify-between border rounded-lg p-2.5 items-start md:items-center gap-6">
        <div className="flex flex-col w-full gap-2">
          <p className="w-12">From</p>
          <input
            onChange={(e) =>
              setPricingRange({
                ...pricingRange,
                from: e.target.value,
                to: pricingRange.to,
                currencies: pricingRange.currencies,
              })
            }
            type="number"
            name=""
            id=""
            placeholder="1000"
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <p className="w-12">To</p>
          <input
            onChange={(e) =>
              setPricingRange({
                ...pricingRange,
                from: pricingRange.from,
                to: e.target.value,
                currencies: pricingRange.currencies,
              })
            }
            type="number"
            name=""
            id=""
            placeholder="10000"
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <p className="w-12">Currencies</p>
          <select
            onChange={(e) =>
              setPricingRange({
                ...pricingRange,
                from: pricingRange.from,
                to: pricingRange.to,
                currencies: e.target.value,
              })
            }
            name=""
            id=""
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulls p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="USD">USD</option>
            <option selected value="Birr">
              Birr
            </option>
          </select>
        </div>
      </div> */}
      <div className="mt-6">
        <LoadingButton
          pending={pending}
          onClick={updateHandler}
          title="Update Profile"
          color="bg-main"
          width="w-52"
        />
      </div>
    </div>
  );
};

export default Profile;
