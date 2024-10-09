import React, { useState, useEffect } from "react";
import styles from "./Content.module.css";

function Content({ selectedGroup }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (selectedGroup) {
      const storedNotes =
        JSON.parse(localStorage.getItem(selectedGroup.name)) || [];
      setNotes(storedNotes);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem(selectedGroup.name, JSON.stringify(notes));
    }
  }, [notes, selectedGroup]);

  const getGroupInitials = (name) => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const handleNoteSubmit = () => {
    if (newNote.trim()) {
      const currentDate = new Date();
      
      const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const formattedTime = currentDate.toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      const newNoteObj = {
        text: newNote,
        date: formattedDate,
        time: formattedTime,
        updatedAt: currentDate,
      };
      setNotes([...notes, newNoteObj]);
      setNewNote("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNoteSubmit();
    }
  };

  if (!selectedGroup) {
    
    // Default right container section
    return (
        <div className={styles["right-container"]}>
          <div className={styles["right-inner-content"]}>
            <>
              <>
                <img
                  src="/image-removebg-preview 1.png"
                  alt="Pocket Notes" className={styles["bgImage"]}
                />
                <h2>Pocket Notes</h2>
                <p>
                  Send and receive messages without keeping your phone online.
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </>

              <p className={styles["encrypt-message"]}>
                <img src="/Lock.png" alt="Lock" className={styles['lockImage']} />
                &nbsp;end-to-end encrypted
              </p>
            </>
          </div>
        </div>
    );
  }


  // Note Input Section
  return (
    <div className={styles['inputSection']}>

      {/* Header Section */}
      <div className={styles['inputHeader']}>
        <div className={styles['groupInformation']}>
          <div className={styles['groupIcon']} style={{ backgroundColor: selectedGroup.color }}>
            {getGroupInitials(selectedGroup.name)}
          </div>
          <h2 className={styles['groupName']}>{selectedGroup.name}</h2>
        </div>
      </div>

      {/* Notes Display Section */}
      <div className={styles['notesContainer']}>
        {notes.map((note, index) => (
          <div key={index} className={styles['noteCard']}>
            <p style={{ margin: "0", fontSize: "18px" }}>{note.text}</p>
            <div className={styles['noteDateTime']}>
              <span>{note.date}</span> ~ <span>{note.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input and submit button */}
      <div className={styles['inputContainer']} style={{ marginTop: "2rem" }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your text here..."
          className={styles['inputStyle']}
        />
        <button onClick={handleNoteSubmit} className={styles['submitBtn']}>
          ➤
        </button>
      </div>
    </div>
  );
}

export default Content;