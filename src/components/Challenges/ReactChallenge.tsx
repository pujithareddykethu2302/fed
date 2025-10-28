import { useEffect } from "react";
import ChallengeCard from "../common/ChallengeCard";
import { useChallenges } from "../common/ChallengeContext";

const ReactChallenge = () => {
  const { challenges, setChallenges } = useChallenges();

  useEffect(() => {
    if (challenges.length === 0) {
      fetch(`${import.meta.env.BASE_URL}data/reactchallenges.json`)
        .then((res) => res.json())
        .then((data) => setChallenges(data.days || []));
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <h1 className="text-2xl font-bold text-[#563A9C] mb-8">
        React 30-Day Challenge
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((item:any) => (
          <ChallengeCard
            key={item.id}
            item={item}
            basePath="/react-challenges"
          />
        ))}
      </div>
    </div>
  );
};

export default ReactChallenge;
