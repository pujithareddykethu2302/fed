
import ChallengeCard from "../common/ChallengeCard";
import { useChallenges } from "../common/ChallengeContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";


const ReactChallenge = () => {
  const { challenges } = useChallenges();



  return (
    <div className="bg-gray-50 min-h-screen p-10">
         <div className="flex items-center mt-1">
        <a href={`${import.meta.env.BASE_URL}`} className="mr-[0.1rem] flex text-[#563A9C] hover:underline">
          Home
        </a>
        <NavigateNextIcon fontSize="small" />
        <p className="text-gray-600">Planner</p>
      </div>
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
