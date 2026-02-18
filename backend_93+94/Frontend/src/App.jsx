import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      // console.log(res.data.notes);

      setNotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDeleteNote(noteId) {
    console.log(noteId);

    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleUpdateDescription(e,noteId) {
    e.preventDefault()

    const {description} = e.target.elements

    axios.patch("http://localhost:3000/api/notes/" + noteId, {
      description: description.value
    })
      .then((res)=>{
        console.log(res.data);
        fetchNotes()
      })
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title..." />
        <input name="description" type="text" placeholder="Enter description..."/>
        <button>Create note</button>
      </form>
      <div className="notes">
        {notes.map((note, index) => {
          return (
            <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => {handleDeleteNote(note._id)}}>Delete</button>
              <form className="update-descp" onSubmit={(e)=>{handleUpdateDescription(e,note._id)}}>
                <input type="text" name="description" placeholder="Updated descp..."/>
                <button>Update</button>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
