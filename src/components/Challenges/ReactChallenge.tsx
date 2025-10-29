import ChallengeCard from "../common/ChallengeCard";
import { useChallenges } from "../common/ChallengeContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ReactChallenge = () => {
  const { challenges } = useChallenges();
  const [CurrentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const TotalPages = Math.ceil(challenges.length / pageSize);
  const PageNumbers = Array.from({ length: TotalPages }, (_, i) => i + 1);
  const startIndex = (CurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const AfterPaginationDisplayData = challenges.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <div className="flex items-center mt-1">
        <a
          href={`${import.meta.env.BASE_URL}`}
          className="mr-[0.1rem] flex text-[#563A9C] hover:underline"
        >
          Home
        </a>
        <NavigateNextIcon fontSize="small" />
        <p className="text-gray-600">Planner</p>
      </div>
      <h1 className="text-2xl font-bold text-[#563A9C] mb-8">
        React 30-Day Challenge
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {AfterPaginationDisplayData.map((item: any) => (
          <ChallengeCard
            key={item.id}
            item={item}
            basePath="/react-challenges"
          />
        ))}
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
           className="bg-[#563A9C] w-10 h-10 mr-[5px] rounded-md disabled:opacity-30 disabled:cursor-default"
          type="button"
          disabled={CurrentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ArrowBackIosIcon  fontSize="small" sx={{color:"white"}}/>
        </button>

        {PageNumbers.map((i) => (
          <button
            key={i}
             className={`w-10 h-10 border mr-[5px] cursor-pointer rounded-md ${
              CurrentPage === i
                ? "bg-[#563A9C] text-white border-[#563A9C]"
                : "border border-gray-300"
            }`}
            type="button"
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        ))}

        <button
          className="bg-[#563A9C] w-10 h-10  disabled:opacity-30 rounded-md disabled:cursor-default"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={CurrentPage === TotalPages}
          type="button"
        >
          <ArrowForwardIosIcon fontSize="small" sx={{color:"white"}}/>
        </button>
      </div>
    </div>
  );
};

export default ReactChallenge;
