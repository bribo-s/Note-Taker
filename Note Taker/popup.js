document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const saveNoteButton = document.getElementById('save-note');
    const notesList = document.getElementById('notes-list');
  
    // Load existing notes from storage
    loadNotes();
  
    // Save note on button click
    saveNoteButton.addEventListener('click', () => {
      const noteText = noteInput.value;
      if (noteText) {
        saveNote(noteText);
        noteInput.value = '';
      }
    });
  
    // Load notes from storage
    function loadNotes() {
      chrome.storage.local.get(['notes'], (result) => {
        const notes = result.notes || [];
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
          const li = document.createElement('li');
          li.textContent = note;
          li.addEventListener('dblclick', () => {
            deleteNote(index);
          });
          notesList.appendChild(li);
        });
      });
    }
  
    // Save note to storage
    function saveNote(note) {
      chrome.storage.local.get(['notes'], (result) => {
        const notes = result.notes || [];
        notes.push(note);
        chrome.storage.local.set({ notes }, () => {
          loadNotes();
        });
      });
    }
  
    // Delete note from storage
    function deleteNote(index) {
      chrome.storage.local.get(['notes'], (result) => {
        const notes = result.notes || [];
        notes.splice(index, 1);
        chrome.storage.local.set({ notes }, () => {
          loadNotes();
        });
      });
    }
  });
  