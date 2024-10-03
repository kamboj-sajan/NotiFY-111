import React from "react";

function View({ documents }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {documents.map((doc) => (
        <div key={doc.id} className="bg-black p-4 rounded shadow-md ">
          <h2 className="text-xl font-bold text-green-500">{doc.title}</h2>
          <a href={doc.file_path} target="_blank" rel="noopener noreferrer">
            <div className="bg-cyan-950 hover:bg-cyan-900 my-4 px-4 py-2 text-white rounded">
              View Document
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default View;
