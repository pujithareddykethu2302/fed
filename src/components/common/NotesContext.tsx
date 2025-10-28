import  { createContext, useContext, useState, type ReactNode } from "react";

interface Note {
  title: string;
  content: string;
  date: string;
}

interface LinkItem {
  title: string;
  url: string;
}

interface NotesContextType {
    notes: Note[],
  links: LinkItem[],
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>>,
}


const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });


  const [links, setLinks] = useState<LinkItem[]>(() => {
    const saved = localStorage.getItem("links");
    return saved ? JSON.parse(saved) : [];
  });
 
  return (
    <NotesContext.Provider value={{ notes, setNotes, links, setLinks }}>
      {children}
    </NotesContext.Provider>
  );

};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within a NotesProvider");
  return context;
};



