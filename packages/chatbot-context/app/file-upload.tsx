import React, { useState, useRef } from "react";
import FileInputButton from "./common/file-upload-button";

interface FileUploadProps {
  handleSuccessMessagePage: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  handleSuccessMessagePage,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // Check if each file is not already present in the array
    if (files) {
      const uniqueFiles = Array.from(files).filter(
        (file) =>
          !selectedFiles.some((existingFile) => existingFile.name === file.name)
      );
      // Use the functional form of setState with type assertion
      setSelectedFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();

    for (const file of Array.from(selectedFiles)) {
      formData.append("files", file);
    }
    fetch("/api/upload_pdf", {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: formData,
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
      <FileInputButton
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        selectedFiles={selectedFiles}
      />
      <div className="float-left mb-5 flex w-full items-center mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedFiles?.length}
          className="btn-primary text-ab-sm disabled:bg-ab-disabled mr-4 rounded px-5 py-2.5 font-bold leading-tight text-white transition-all"
        >
          Save
        </button>
        <button
          // to="/manage-blocks/own-blocks"
          type="button"
          onClick={() => setSelectedFiles([])}
          className="text-ab-disabled hover:text-ab-black text-ab-sm rounded px-3 py-1 font-bold leading-tight"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
