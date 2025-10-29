import React, { createContext, useContext, useState, useEffect } from "react";

interface Challenge {
  id: string;
  title: string;
  status: string;
  [key: string]: any;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  challenges: Challenge[];
}

interface ChallengeContextType {
  challenges: Challenge[];
  setChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>;
  moreCategories: Category[];
  setMoreCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  updateChallengeStatus: (
    title: string,
    status: string,
    categoryName?: string
  ) => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [moreCategories, setMoreCategories] = useState<Category[]>([]);

    useEffect(() => {
    if (challenges.length === 0) {
      fetch(`${import.meta.env.BASE_URL}data/reactchallenges.json`)
        .then((res) => res.json())
        .then((data) => setChallenges(data.days || []));
    }
  }, []);


useEffect(() => {
  fetch(`${import.meta.env.BASE_URL}data/moreChallenges.json`)
    .then((res) => res.json())
    .then((data) => setMoreCategories(data.categories || []));
}, []);


  const updateChallengeStatus = (
    title: string,
    status: string,
    categoryName?: string
  ) => {

    setChallenges((prev) =>
      prev.map((ch) =>
        ch.title === title ? { ...ch, status } : ch
      )
    );


    setMoreCategories((prev) =>
      prev.map((cat) => {
        if (cat.name === categoryName) {
          return {
            ...cat,
            challenges: cat.challenges.map((ch) =>
              ch.title === title ? { ...ch, status } : ch
            ),
          };
        }
        return cat;
      })
    );
  };


  useEffect(() => {
    const saved = localStorage.getItem("challengeData");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.challenges) setChallenges(parsed.challenges);
      if (parsed.moreCategories) setMoreCategories(parsed.moreCategories);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "challengeData",
      JSON.stringify({ challenges, moreCategories })
    );
  }, [challenges, moreCategories]);

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        setChallenges,
        moreCategories,
        setMoreCategories,
        updateChallengeStatus,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => {
  const ctx = useContext(ChallengeContext);
  if (!ctx)
    throw new Error("useChallenges must be used within a ChallengeProvider");
  return ctx;
};
