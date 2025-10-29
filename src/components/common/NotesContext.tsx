import { createContext, useContext, useState, type ReactNode } from "react";

type NoteItem = {
  title: string;
  content: string;
  date: string;
};

type LinkItem = {
  title: string;
  url: string;
  date: string; 
};

type NotesContextType = {
  notes: NoteItem[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
  links: LinkItem[];
  setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>>;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NoteItem[]>(
    JSON.parse(localStorage.getItem("notes") || "[]")
  );
  const [links, setLinks] = useState<LinkItem[]>(() => {
    const stored = JSON.parse(localStorage.getItem("links") || "[]");
    return stored.map((l: any) => ({
      ...l,
      date: l.date || new Date().toLocaleDateString(),
    }));
  });

  return (
    <NotesContext.Provider value={{ notes, setNotes, links, setLinks }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
};
