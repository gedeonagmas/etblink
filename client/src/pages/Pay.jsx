import React, { useContext, useEffect } from "react";
// import { userContext } from "../App";

const Pay = (props) => {
  useEffect(() => {
    window.localStorage.setItem("etb_link_system", JSON.stringify(props));
  }, []);

  console.log(props, "props");
  return (
    <div>
      <form
        method="POST"
        className=""
        action="https://api.chapa.co/v1/hosted/pay"
      >
        <input
          type="hidden"
          name="public_key"
          value="CHAPUBK_TEST-7osxyPCBKmA3NdC9nlaZkIrHMas5Falj"
        />
        <input type="hidden" name="tx_ref" value={`etblink-tx-${Date.now()}`} />
        <input type="hidden" name="amount" value={props.amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={props.email} />
        <input type="hidden" name="first_name" value={props.name} />
        <input type="hidden" name="last_name" value={props.name} />
        <input type="hidden" name="title" value="Let us do this" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with cha"
        />
        <input
          type="hidden"
          name="logo"
          value="https://yourcompany.com/logo.png"
        />
        <input
          type="hidden"
          name="callback_url"
          value="http://localhost:4000"
        />
        <input
          type="hidden"
          name="return_url"
          value={`http://localhost:4000/dashboard/success`}
        />
        <input type="hidden" name="meta[title]" value="test" />
        <button
          className="flex cursor-pointer gap-2 items-center justify-center h-10 mt-2 rounded-lg w-full hover:bg-red-500 text-white bg-main"
          type="submit"
        >
          <svg
            class="w-6 h-6 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
              clip-rule="evenodd"
            />
          </svg>
          Pay and Boost
        </button>
      </form>
    </div>
  );
};

export default Pay;
