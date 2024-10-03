import React , {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import CreateArea from "./components/CreateArea";

function App() {
  const [documents, setDocuments] = useState([]);

  function addDocument(newDocument) {
    setDocuments(prevDocuments => [...prevDocuments, newDocument]);
  }
 
  return (
    <Router>
      <Header />
      <CreateArea onAdd={addDocument} />
      <div className="grid grid-cols-3 gap-4 p-5">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{doc.title}</h2>
            <a href={`/${doc.file_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              View Document
            </a>
          </div>
        ))}
      </div>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;

createarea 
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


header.jsx 
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
     <div>

    <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md">
      <div>
        <h1 className="text-2xl m-0 font-bold font-sans">NotiFY</h1>
      </div>
      <div>
          <Link 
            to="/login" 
            className="px-5 py-2 border border-[#00254d] text-[#00254d] rounded-md transition-colors duration-300 hover:bg-[#00254d] hover:text-white"
          >
            Sign in
          </Link>
        </div>
    </nav>
     </div>

  );
}

export default Header;

createarea
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

view 
import React from "react";

function View({ documents }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {documents.map((doc) => (
        <div key={doc.id} className="bg-white p-4 rounded shadow-md ">
          <h2 className="text-xl font-bold">{doc.title}</h2>
          <a href={doc.file_path} target="_blank" rel="noopener noreferrer">
            <div className="bg-yellow-500 hover:bg-yellow-600 my-4 px-4 py-2 text-white rounded">
              View Document
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default View;
