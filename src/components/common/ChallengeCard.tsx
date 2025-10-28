// src/components/ChallengeCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface ChallengeCardProps {
  item: any;
  basePath: string; 
}

const DifficultyStatusColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "#6BBA62";
    case "Medium":
      return "#F0B429";
    case "Hard":
      return "#DF001A";
    default:
      return "#999";
  }
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ item, basePath }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`${basePath}/challenge-details/${encodeURIComponent(item.title)}`);
  };

  return (
    <div key={item.id} className="bg-[#fcfaff] p-4 shadow rounded-lg min-h-[300px] flex flex-col justify-between">
      <div className="flex justify-between mb-2">
        <p className="text-xs font-medium">{item.dayChallenge || "Challenge"}</p>
        <img src={item.icon} className="w-5 h-5" />
      </div>

      <div className="mb-2">
        <p className="text-lg font-bold">{item.title}</p>
        <p className="text-sm text-gray-500">{item.topic}</p>
      </div>

      <div
        className={`w-24 h-6 flex items-center justify-center rounded-md mb-2 border`}
        style={{
          backgroundColor:
            item.status === "In Progress"
              ? "#FFF8E1"
              : item.status === "Completed"
              ? "#E8F5E9"
              : "#FFF2F3",
          borderColor:
            item.status === "In Progress"
              ? "#FBC02D"
              : item.status === "Completed"
              ? "#1E7F55"
              : "#DF001A",
        }}
      >
        <p
          className="text-xs font-medium"
          style={{
            color:
              item.status === "In Progress"
                ? "#FBC02D"
                : item.status === "Completed"
                ? "#1E7F55"
                : "#DF001A",
          }}
        >
          {item.status}
        </p>
      </div>

      <p className="text-sm mb-2">{item.shortDescription}</p>

      <div className="flex items-center gap-4 mb-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div
            className="rounded-full w-3 h-3 border"
            style={{
              backgroundColor: DifficultyStatusColor(item.difficulty),
              borderColor: DifficultyStatusColor(item.difficulty),
            }}
          />
          <p
            className="text-sm"
            style={{
              color: DifficultyStatusColor(item.difficulty),
            }}
          >
            {item.difficulty}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-sm">{item.timeEstimate}</p>
        </div>
      </div>

      <button
        className={`px-4 py-2 text-white rounded transition-all
    ${
      item.status === "Completed"
        ? "bg-[#6BBA62] hover:bg-[#5aa552]"
        : item.status === "In Progress"
        ? "bg-[#f0b429] hover:bg-[#d99a00]"
        : "bg-[#563A9C] hover:bg-[#472e85]"
    }`}
        onClick={handleStart}
      >
        {item.status === "In Progress"
          ? "Continue"
          : item.status === "Completed"
          ? "View Code"
          : "Start Now"}
      </button>
    </div>
  );
};

export default ChallengeCard;
