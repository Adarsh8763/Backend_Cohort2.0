import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("https://backend-cohort2-0-6jp4.onrender.com/api/notes").then((res) => {
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
      .post("https://backend-cohort2-0-6jp4.onrender.com/api/notes", {
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

    axios.delete("https://backend-cohort2-0-6jp4.onrender.com/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleUpdateDescription(e, noteId) {
    e.preventDefault();

    const { description } = e.target.elements;

    axios.patch("https://backend-cohort2-0-6jp4.onrender.com/api/notes/" + noteId, {
      description: description.value
    })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  return (
    <>
      <header className="app-header">
        <h1>Notes</h1>
        <span className="note-count">{notes.length} {notes.length === 1 ? "note" : "notes"}</span>
      </header>

      <div className="create-section">
        <label>New Note</label>
        <form className="note-create-form" onSubmit={handleSubmit}>
          <input className="input-title" name="title" type="text" placeholder="Title" />
          <input className="input-desc" name="description" type="text" placeholder="Description" />
          <button className="btn-create" type="submit">Add Note</button>
        </form>
      </div>

      <hr className="section-divider" />

      <div className="notes-section">
        <p className="notes-section-label">All Notes</p>
        {notes.length === 0 ? (
          <p className="empty-state">No notes yet. Create your first one above.</p>
        ) : (
          <div className="notes">
            {notes.map((note, index) => {
              return (
                <div className="note" key={index}>
                  <h1>{note.title}</h1>
                  <p>{note.description}</p>
                  <div className="note-actions">
                    <button className="btn-delete" onClick={() => { handleDeleteNote(note._id) }}>Delete</button>
                    <form className="update-descp" onSubmit={(e) => { handleUpdateDescription(e, note._id) }}>
                      <input type="text" name="description" placeholder="Update description..." />
                      <button className="btn-update" type="submit">Update</button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default App;

