import React, { useState } from "react";

function CreateArea(props) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setFile({
        name: selectedFile.name,
        url: e.target.result
      });
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function submitDocument(event) {
    event.preventDefault();

    if (file && title) {
      const newDocument = {
        id: Date.now(),
        title: title,
        file_path: file.url
      };

      props.onAdd(newDocument);
      setTitle("");
      setFile(null);
    }
  }

  return (
    <div className="flex flex-col items-center p-5">
      <form className="bg-black p-6 rounded shadow-md" onSubmit={submitDocument}>
        <input
          type="text"
          name="title"
          placeholder="Document Title"
          value={title}
          onChange={handleTitleChange}
          className="border border-green-500 p-2 mb-4 w-full rounded text-white bg-black"
        />
        <input
          type="file"
          name="document"
          onChange={handleFileChange}
          className="mb-4 w-full text-white"
        />
        <button type="submit" className="bg-cyan-950 hover:bg-cyan-900 text-white py-2 px-4 rounded">
          Upload Document
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
