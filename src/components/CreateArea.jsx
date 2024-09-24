import React, { useState } from "react";
import axios from "axios";

function CreateArea(props) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function submitDocument(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("document", file);

    axios.post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      props.onAdd(res.data);
      setTitle("");
      setFile(null);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className="flex flex-col items-center p-5">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={submitDocument}>
        <input
          type="text"
          name="title"
          placeholder="Document Title"
          value={title}
          onChange={handleTitleChange}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input
          type="file"
          name="document"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
          Upload Document
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
