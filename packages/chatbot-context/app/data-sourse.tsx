"use client";
import React, { useState } from "react";
import URLUpload from "./url-upload";
import FileUpload from "./file-upload";

export default function DataSource() {
  const [selectedTab, setSelectedTab] = useState("url");
  // const [selectedTab, setSelectedTab] = useState("file");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  return (
    <div>
      {showSuccessMessage ? (
        <div className="mt-6 text-base text-ab-black">
          File successfully Added
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex gap-10">
            <div className="my-4 flex items-center">
              <label className="float-left flex items-center">
                <input
                  name="url"
                  value={"url"}
                  checked={selectedTab === "url"}
                  onChange={() => setSelectedTab("url")}
                  className="peer hidden"
                  type="checkbox"
                />
                <span
                  className={`chkbox-icon border-ab-disabled chkbox-icon float-left mr-2 h-5 w-5 flex-shrink-0 cursor-pointer rounded border bg-white`}
                />
              </label>
              <p className="text-xs tracking-tight text-black font-semibold">
                Website URL
              </p>
            </div>
            <div className="my-2 flex items-center">
              <label className="float-left flex items-center">
                <input
                  name="accept_terms"
                  value={"file"}
                  checked={selectedTab === "file"}
                  onChange={() => setSelectedTab("file")}
                  className="peer hidden"
                  type="checkbox"
                />
                <span
                  className={`chkbox-icon border-ab-disabled chkbox-icon float-left mr-2 h-5 w-5 flex-shrink-0 cursor-pointer rounded border bg-white`}
                />
              </label>
              <p className="text-xs tracking-tight text-black font-semibold">
                File Upload
              </p>
            </div>
          </div>
          <div className="float-left mb-5 w-full mt-4">
            {selectedTab === "url" && (
              <URLUpload
                handleSuccessMessagePage={() => setShowSuccessMessage(true)}
              />
            )}
            {selectedTab === "file" && (
              <FileUpload
                handleSuccessMessagePage={() => setShowSuccessMessage(true)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
