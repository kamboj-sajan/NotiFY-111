import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import CreateArea from "./components/CreateArea";
import View from "./components/view"; 

function App() {
  const [documents, setDocuments] = useState([]);

  function addDocument(newDocument) {
    setDocuments(prevDocuments => [...prevDocuments, newDocument]);
  }

  return (
    <Router>
      <Header />
      <CreateArea onAdd={addDocument} />
      <View documents={documents} /> {/* Use the View component here */}
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
