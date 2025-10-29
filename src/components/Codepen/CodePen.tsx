import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNotes } from "../common/NotesContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const CodePen = () => {
  const { notes, setNotes, links, setLinks } = useNotes();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkURL, setLinkURL] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);
  const [editingLinkIndex, setEditingLinkIndex] = useState<number | null>(null);

  const addNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const date = new Date();
    const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getFullYear()}`;

    const newNote = { title: noteTitle, content: noteContent, date: formattedDate };
    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    setNoteTitle("");
    setNoteContent("");
  };

  const editNote = (index: number) => {
    setEditingNoteIndex(index);
    setNoteTitle(notes[index].title);
    setNoteContent(notes[index].content);
  };

  const saveEditedNote = () => {
    if (editingNoteIndex === null) return;
    const updatedNotes = [...notes];
    updatedNotes[editingNoteIndex] = {
      ...updatedNotes[editingNoteIndex],
      title: noteTitle,
      content: noteContent,
    };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setEditingNoteIndex(null);
    setNoteTitle("");
    setNoteContent("");
  };

  const deleteNote = (index: number) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  const addLink = () => {
    if (!linkTitle.trim() || !linkURL.trim()) return;

    const date = new Date();
    const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getFullYear()}`;

    const newLink = { title: linkTitle, url: linkURL, date: formattedDate };
    const updated = [...links, newLink];
    setLinks(updated);
    localStorage.setItem("links", JSON.stringify(updated));
    setLinkTitle("");
    setLinkURL("");
  };

  const editLink = (index: number) => {
    setEditingLinkIndex(index);
    setLinkTitle(links[index].title);
    setLinkURL(links[index].url);
  };

  const saveEditedLink = () => {
    if (editingLinkIndex === null) return;
    const updatedLinks = [...links];
    updatedLinks[editingLinkIndex] = {
      ...updatedLinks[editingLinkIndex],
      title: linkTitle,
      url: linkURL,
    };
    setLinks(updatedLinks);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
    setEditingLinkIndex(null);
    setLinkTitle("");
    setLinkURL("");
  };

  const deleteLink = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    localStorage.setItem("links", JSON.stringify(updated));
  };
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="flex items-center mt-1">
        <a href={`${import.meta.env.BASE_URL}`} className="mr-[0.1rem] flex text-[#563A9C] hover:underline">
          Home
        </a>
        <NavigateNextIcon fontSize="small" />
        <p className="mr-4">Resources</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#563A9C]">Resources</h1>
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            editMode
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-[#563A9C] text-white hover:bg-[#472F85]"
          }`}
        >
          {editMode ? "Exit Edit Mode" : "Manage Notes & Links"}
        </button>
      </div>

      <div className="flex flex-1 sm:flex-none border border-gray-300 h-10 rounded-[15px] flex-row items-center px-3 py-2 w-full lg:w-[40%] mb-8 bg-white shadow-sm">
        <SearchIcon className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Search notes or links..."
          className="flex-1 focus:outline-none text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-[#563A9C] mb-4">
            {editingNoteIndex !== null ? "Edit Note" : "Add Note"}
          </h2>

          <input
            type="text"
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-[#563A9C]"
          />
          <textarea
            placeholder="Note Content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C] mb-3"
          />
          <button
            onClick={editingNoteIndex !== null ? saveEditedNote : addNote}
            className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg"
          >
            {editingNoteIndex !== null ? "Save Note" : "Add Note"}
          </button>

          <ul className="mt-6 space-y-4">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, i) => (
                <li
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">{note.title}</h3>
                    <span className="text-gray-400 text-sm">{note.date}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{note.content}</p>

                  {editMode && (
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => editNote(i)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => deleteNote(i)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-400 mt-4">No notes found.</p>
            )}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-[#563A9C] mb-4">
            {editingLinkIndex !== null ? "Edit Link" : "Add Link"}
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Link Title"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C]"
            />
            <input
              type="text"
              placeholder="URL"
              value={linkURL}
              onChange={(e) => setLinkURL(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C]"
            />
            <button
              onClick={editingLinkIndex !== null ? saveEditedLink : addLink}
              className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              {editingLinkIndex !== null ? "Save" : "Add"}
            </button>
          </div>

          <ul className="mt-6 space-y-4">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link, i) => (
                <li
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#563A9C] hover:underline text-base"
                    >
                      {link.title}
                    </a>
                    <p className="text-gray-400 text-sm mt-1">{link.date}</p>
                  </div>
                  {editMode && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => editLink(i)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => deleteLink(i)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-400 mt-4">No links found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodePen;
