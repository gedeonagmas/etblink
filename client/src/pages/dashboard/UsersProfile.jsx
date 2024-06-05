// import React, { useEffect, useState } from "react";
// import LoadingButton from "../../components/loading/LoadingButton";
// import Response from "../../components/Response";
// import { useUpdateMutation } from "../../features/api/apiSlice";

// const UsersProfile = ({ type }) => {
//   const [updateData, updateResponse] = useUpdateMutation();
//   const [pending, setPending] = useState(false);
//   const [user, setUser] = useState({});
//   const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [bio, setBio] = useState("");
//   const [gender, setGender] = useState("male");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [profilePicture, setProfilePicture] = useState("");

//   useEffect(() => {
//     setUser(JSON.parse(localStorage.getItem("etblink_user")));
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const data = user?.user;
//       setFirstName(data?.firstName ? data.firstName : firstName);
//       setMiddleName(data?.middleName ? data.middleName : middleName);
//       setLastName(data?.lastName ? data.lastName : lastName);
//       setBio(data?.bio ? data.bio : bio);
//       setGender(data?.gender ? data.gender : gender);
//       setPhone(data?.phone ? data.phone : phone);
//       setAddress(data?.address ? data.address : address);
//       setProfilePicture(
//         data?.profilePicture ? data.profilePicture : profilePicture
//       );
//     }
//   }, [user]);

//   const updateHandler = () => {
//     const formData = new FormData();

//     formData.append("firstName", firstName);
//     formData.append("middleName", middleName);
//     formData.append("lastName", lastName);
//     formData.append("bio", bio);
//     formData.append("gender", gender);
//     formData.append("phone", phone);
//     formData.append("address", address);
//     formData.append("profilePicture", profilePicture);
//     formData.append("url", `/user/${type}?id=${user?.user?._id}`);
//     formData.append("tag", ["users"]);

//     updateData(formData);
//   };

//   //   console.log(user.user.profilePicture, "user");
//   return (
//     <div className="w-full p-5 flex pb-10 flex-col rounded-lg border gap-2 items-start justify-center">
//       <Response
//         response={updateResponse}
//         setPending={setPending}
//         type="update"
//       />
//       <p className="text-lg font-semibold">Your profile information</p>
//       <p className="text-sm max-w-[700px]">
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
//         blanditiis velit doloremque ducimus adipisci eaque quis temporibus,
//         distinctio sequi tempora ad! Ut sint quidem est iste! Nostrum saepe
//         corrupti repudiandae.
//       </p>
//       <p className="text-lg font-semibold mt-6">Information's</p>
//       <div className="mb-5">
//         <label class="block text-sm font-medium">Profile Picture</label>
//         <div
//           style={{
//             backgroundImage: `url(${user?.user?.profilePicture})`,
//             backgroundSize: "160px 160px",
//           }}
//           class={`mt-4  flex justify-center rounded-full w-40 items-center h-40 p-2 border-2 border-gray-300 border-dashed`}
//         >
//           <div class="space-y-1 p-1 rounded-xl text-white bg-gray-400/50 text-center">
//             <svg
//               class="mx-auto h-12 w-12"
//               stroke="currentColor"
//               fill="none"
//               viewBox="0 0 48 48"
//               aria-hidden="true"
//             >
//               <path
//                 d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               />
//             </svg>
//             <div class="flex text-sm">
//               <label
//                 for="file-upload1"
//                 class="relative cursor-pointer p-1  rounded-md  font-medium  hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//               >
//                 <span class="">Upload a profile</span>
//                 <input
//                   onChange={(e) => setProfilePicture(e.target.files[0])}
//                   id="file-upload1"
//                   name="file-upload1"
//                   type="file"
//                   class="sr-only"
//                 />
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="grid w-full mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
//         <div className="mb-5">
//           <label
//             for="name"
//             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             First Name
//           </label>
//           <input
//             onChange={(e) => setFirstName(e.target.value)}
//             value={firstName}
//             type="text"
//             id="name"
//             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Skylight Technologies"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label
//             for="name"
//             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Middle Name
//           </label>
//           <input
//             onChange={(e) => setMiddleName(e.target.value)}
//             value={middleName}
//             type="text"
//             id="name"
//             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Skylight Technologies"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label
//             for="name"
//             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Last Name
//           </label>
//           <input
//             onChange={(e) => setLastName(e.target.value)}
//             value={lastName}
//             type="text"
//             id="name"
//             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Skylight Technologies"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label
//             for="name"
//             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Gender
//           </label>

//           <select
//             onChange={(e) => setGender(e.target.value)}
//             value={gender}
//             type="text"
//             id="name"
//             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Skylight Technologies"
//             required
//           >
//             <option selected value="male">
//               Male
//             </option>
//             <option value="female">Female</option>
//           </select>
//         </div>

//         <div className="mb-5">
//           <label
//             for="name"
//             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Phone number
//           </label>
//           <input
//             onChange={(e) => setPhone(e.target.value)}
//             value={phone}
//             type="text"
//             id="name"
//             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="+251 954 104 637"
//             required
//           />
//         </div>

//         <div className="mb-5 w-full">
//           <label
//             for="name"
//             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Address
//           </label>
//           <input
//             onChange={(e) => setAddress(e.target.value)}
//             value={address}
//             type="text"
//             id="name"
//             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="addis ababa"
//             required
//           />
//         </div>
//       </div>
//       <div className="mb-5 w-full">
//         <label
//           for="name"
//           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//         >
//           Bio
//         </label>
//         <textarea
//           onChange={(e) => setBio(e.target.value)}
//           value={bio}
//           name=""
//           id=""
//           cols="30"
//           rows="5"
//           placeholder="Little description about you"
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         ></textarea>
//       </div>
//       <div className="mt-6">
//         <LoadingButton
//           pending={pending}
//           onClick={updateHandler}
//           title="Update Profile"
//           color="bg-main"
//           width="w-52"
//         />
//       </div>
//     </div>
//   );
// };

// export default UsersProfile;

import React, { useEffect, useState } from "react";
import LoadingButton from "../../components/loading/LoadingButton";
import Response from "../../components/Response";
import {
  useLazyReadQuery,
  useUpdateMutation,
  useUpdateUsersCredentialsMutation,
} from "../../features/api/apiSlice";
import { useLocation } from "react-router-dom";

const UsersProfile = ({ profileType }) => {
  const location = useLocation();
  const id = location?.search?.split("&id=")[1];
  const type = location?.search?.split("?user=")[1]?.split("&id=")[0];
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [updateData, updateResponse] = useUpdateMutation();
  const [emailData, emailResponse] = useUpdateUsersCredentialsMutation();
  const [passwordData, passwordResponse] = useUpdateUsersCredentialsMutation();
  const [pending, setPending] = useState(false);
  const [emailPending, setEmailPending] = useState(false);
  const [passwordPending, setPasswordPending] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [accountType, setAccountType] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [popup, setPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [trigger, { data: users, isFetching, isError }] = useLazyReadQuery();
  useEffect(() => {
    trigger({
      url: `/user/users?_id=${
        id ? id : user?._id
      }&populatingType=users&populatingValue=user`,
      tag: ["users"],
    });
  }, []);
  console.log(id, "ty", type, "lllllllll");
  useEffect(() => {
    if (users) {
      const data = users?.data[0]?.user;
      setFirstName(data?.firstName ? data.firstName : firstName);
      setMiddleName(data?.middleName ? data.middleName : middleName);
      setLastName(data?.lastName ? data.lastName : lastName);
      setBio(data?.bio ? data.bio : bio);
      setAccountType(data?.accountType ? data.accountType : accountType);
      setGender(data?.gender ? data.gender : gender);
      setPhone(data?.phone ? data.phone : phone);
      setAddress(data?.address ? data.address : address);
      setEmail(users?.data[0]?.email ? users?.data[0].email : email);
      setProfilePicture(
        data?.profilePicture ? data.profilePicture : profilePicture
      );
    }
  }, [users]);

  const updateHandler = () => {
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("middleName", middleName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);
    formData.append("type", accountType);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("profilePicture", profilePicture);
    formData.append(
      "url",
      `/user/${profileType ? profileType : type}?id=${
        profileType ? user?.user?._id : users?.data[0]?.user?._id
      }`
    );
    formData.append("tag", ["users"]);

    updateData(formData);
  };

  const emailHandler = () => {
    emailData({
      email,
      type: "email",
      url: `/user/users`,
      id: id ? id : user._id,
      tag: ["users"],
    });
  };

  const passwordHandler = () => {
    id &&
      passwordData({
        password,
        confirmPassword,
        type: "password",
        url: `/user/users`,
        id: id,
        tag: ["users"],
      });
  };

  return (
    <div className="w-full relative p-5 flex pb-10 flex-col rounded-lg border gap-2 items-start justify-center">
      <Response
        response={updateResponse}
        setPending={setPending}
        type={id ? null : "update"}
      />
      <Response response={emailResponse} setPending={setEmailPending} />
      <Response response={passwordResponse} setPending={setPasswordPending} />
      <p className="text-lg font-semibold">Your profile information</p>
      <p className="text-sm max-w-[700px]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
        blanditiis velit doloremque ducimus adipisci eaque quis temporibus,
        distinctio sequi tempora ad! Ut sint quidem est iste! Nostrum saepe
        corrupti repudiandae.
      </p>
      <div className="w-full flex justify-between items-center">
        <p className="text-lg font-semibold mt-6">Information's</p>
        <button
          onClick={() => setPopup(true)}
          className="px-5 self-end rounded-lg py-2 text-white bg-main"
        >
          Sensitive Data
        </button>
      </div>

      <div className="mb-5">
        <label class="block text-sm font-medium">Profile Picture</label>
        <div
          style={{
            backgroundImage: `url(${users?.data[0]?.user?.profilePicture})`,
            backgroundSize: "160px 160px",
          }}
          class={`mt-4  flex justify-center rounded-full w-40 items-center h-40 p-2 border-2 border-gray-300 border-dashed`}
        >
          <div class="space-y-1 p-1 rounded-xl text-white bg-gray-400/50 text-center">
            <svg
              class="mx-auto h-12 w-12"
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
            <div class="flex text-sm">
              <label
                for="file-upload1"
                class="relative cursor-pointer p-1  rounded-md  font-medium  hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span class="">Upload a profile</span>
                <input
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  id="file-upload1"
                  name="file-upload1"
                  type="file"
                  class="sr-only"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
        <div className="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
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
            Middle Name
          </label>
          <input
            onChange={(e) => setMiddleName(e.target.value)}
            value={middleName}
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
            Last Name
          </label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
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
            Gender
          </label>

          <select
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Skylight Technologies"
            required
          >
            <option selected value="male">
              Male
            </option>
            <option value="female">Female</option>
          </select>
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
      </div>
      <div className="mb-5 w-full">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Bio
        </label>
        <textarea
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Little description about you"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </div>
      <div className="mt-6">
        <LoadingButton
          pending={pending}
          onClick={updateHandler}
          title="Update Profile"
          color="bg-main"
          width="w-52"
        />
      </div>
      {popup && (
        <div className="absolute  z-30 top-10 bg-white bg-dark right-0 w-[300px] rounded-lg p-4 border border-gray-300">
          <div className="relative">
            <svg
              class="w-6 absolute cursor-pointer top-1 right-1 hover:text-gray-600 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              onClick={() => setPopup(false)}
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
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <LoadingButton
            pending={emailPending}
            onClick={emailHandler}
            title="Change"
            color="bg-main"
            width="w-full"
          />
          {id && (
            <>
              <div className="mb-5 mt-5">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="New Password"
                  required
                />
              </div>{" "}
              <div className="mb-5">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="text"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <LoadingButton
                pending={passwordPending}
                onClick={passwordHandler}
                title="Reset"
                color="bg-main"
                width="w-full"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersProfile;
