import React, { useState } from "react";

interface UrlUploadProps {
  handleSuccessMessagePage: () => void;
}

const UrlUpload: React.FC<UrlUploadProps> = ({ handleSuccessMessagePage }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    })
      .then(async (res) => {
        console.log(res);
        handleSuccessMessagePage();
      })
      .catch((err) => {
        console.log("Error is ", err);
        alert(err);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col float-left w-full">
        <label className="text-ab-sm float-left mb-2 font-medium text-black">
          URL(s)
        </label>
        <input
          type="text"
          name="item_name"
          placeholder="e.g., https://example.com"
          value={url}
          // disabled
          onChange={(e) => setUrl(e.target.value)}
          className={`text-ab-sm bg-ab-gray-light float-left w-full rounded-md border py-3.5 px-4 focus:outline-none`}
          // ${
          //   touched.item_name && errors.item_name
          //     ? "border-ab-red"
          //     : "border-ab-gray-light focus:border-primary"
          // }
        />
        {/* <p className="text-xs text-ab-red left-0 mt-0.5">
          {touched.item_name && errors.item_name}
        </p> */}
      </div>
      <div className="float-left mb-5 flex w-full items-center mt-8">
        <button
          type="button"
          disabled={!url}
          onClick={handleSubmit}
          className="btn-primary text-ab-sm disabled:bg-ab-disabled mr-4 rounded px-5 py-2.5 font-bold leading-tight text-white transition-all"
        >
          Save
        </button>
        <button
          // to="/manage-blocks/own-blocks"
          type="button"
          className="text-ab-disabled hover:text-ab-black text-ab-sm rounded px-3 py-1 font-bold leading-tight"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UrlUpload;
