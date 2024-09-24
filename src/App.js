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
