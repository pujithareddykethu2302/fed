import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNotes } from "../common/NotesContext";

const CodePen = () => {
  const { notes, setNotes, links, setLinks } = useNotes();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkURL, setLinkURL] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const date = new Date();
    const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getFullYear()}`;

    const newNote = {
      title: noteTitle,
      content: noteContent,
      date: formattedDate,
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    setNoteTitle("");
    setNoteContent("");
  };

  const addLink = () => {
    if (!linkTitle.trim() || !linkURL.trim()) return;
    const newLink = { title: linkTitle, url: linkURL };
    const updated = [...links, newLink];
    setLinks(updated);
    localStorage.setItem("links", JSON.stringify(updated));
    setLinkTitle("");
    setLinkURL("");
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

      <h1 className="text-3xl font-bold text-[#563A9C] mb-6">Resources</h1>

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
            Add Notes
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
            onClick={addNote}
            className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg"
          >
            Add Note
          </button>

          <ul className="mt-6 space-y-4">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, i) => (
                <li
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">
                      {note.title}
                    </h3>
                    <span className="text-gray-400 text-sm">{note.date}</span>
                  </div>
                  <p className="text-gray-600">{note.content}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-400 mt-4">No notes found.</p>
            )}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-[#563A9C] mb-4">
            Add Links
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
              onClick={addLink}
              className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Add
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
                    <h3 className="font-semibold text-gray-700">
                      {link.title}
                    </h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#563A9C] underline text-sm"
                    >
                      {link.url}
                    </a>
                  </div>
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
