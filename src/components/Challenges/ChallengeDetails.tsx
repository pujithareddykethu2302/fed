// src/components/Challenge/ChallengeDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useChallenges } from "../common/ChallengeContext";


const ChallengeDetails = () => {
  const { title, categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openInstruction, setInstruction] = useState(false);
  const [status, setStatus] = useState<string>("Not Started");

  const { updateChallengeStatus } = useChallenges();

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        let data;

        if (location.pathname.includes("/react-challenges")) {
          const res = await fetch(`${import.meta.env.BASE_URL}data/reactchallenges.json`);
          data = await res.json();
          const found = data.days.find(
            (item: any) =>
              item.title.toLowerCase() === decodeURIComponent(title || "").toLowerCase()
          );
          setChallenge(found);
          setStatus(found?.status || "Not Started");
        } else if (location.pathname.includes("/more-challenges")) {
          const res = await fetch(`${import.meta.env.BASE_URL}data/moreChallenges.json`);
          data = await res.json();
          const category = data.categories.find(
            (c: any) =>
              c.name.toLowerCase() === decodeURIComponent(categoryName || "").toLowerCase()
          );
          const found = category?.challenges.find(
            (item: any) =>
              item.title.toLowerCase() === decodeURIComponent(title || "").toLowerCase()
          );
          setChallenge(found);
          setStatus(found?.status || "Not Started");
        }
      } catch (err) {
        console.error("Error loading challenge:", err);
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, [title, categoryName, location.pathname]);



const handleStartChallenge = () => {
  const decodedCategory = decodeURIComponent(categoryName || "");
  updateChallengeStatus(challenge.title, "In Progress", decodedCategory);
  setStatus("In Progress");
  window.open("https://codesandbox.io/", "_blank");
};

const handleMarkAsCompleted = () => {
  const decodedCategory = decodeURIComponent(categoryName || "");
  updateChallengeStatus(challenge.title, "Completed", decodedCategory);
  setStatus("Completed");
};



  const handleBack = () => {
    if (categoryName) navigate(`/more-challenges/${categoryName}`);
    else navigate("/react-challenges");
  };

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (!challenge)
    return <p className="text-center mt-20 text-red-500">Challenge not found 😔</p>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#563A9C]">{challenge.title}</h1>
          <img src={challenge.icon} alt="icon" className="w-8 h-8" />
        </div>

        <p className="text-gray-600 mb-4">{challenge.shortDescription}</p>
        <p className="text-gray-800 mb-4 leading-relaxed">{challenge.longDescription}</p>

        <div className="bg-[#fcfaff] rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-[#563A9C] mb-2">What You’ll Learn</h3>
          <ul className="list-disc list-inside text-gray-700">
            {challenge.learnPoints?.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>


        {challenge.tip && (
          <div className="bg-[#FFF8E1] border border-[#FBC02D] rounded-lg p-3 mb-4">
            <p className="font-medium text-[#FBC02D]">💡 Tip:</p>
            <p className="text-gray-700">{challenge.tip}</p>
          </div>
        )}

        <div className="space-x-2 mt-8">
          <button
            className="px-4 py-2 bg-[#FBC02D] text-white rounded"
            onClick={() => setInstruction(!openInstruction)}
          >
            {openInstruction ? "Hide Instructions" : "Show Instructions"}
          </button>

          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={handleBack}
          >
            Back
          </button>

          <button
            className="px-4 py-2 bg-[#563A9C] text-white rounded hover:bg-[#472F85]"
            onClick={handleStartChallenge}
          >
            {status === "Completed"
              ? "View Code"
              : status === "In Progress"
              ? "Continue Challenge"
              : "Start Challenge"}
          </button>

          {status !== "Completed" && (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleMarkAsCompleted}
            >
              Mark as Completed
            </button>
          )}
        </div>

        {openInstruction && (
          <div className="border border-[#FBC02D] rounded-lg p-8 bg-white shadow-sm mt-12">
            <p className="text-gray-800">
              <span className="font-semibold text-lg">📋 How to Use This Challenge</span>
              <br />
              <br />
              Follow the buttons to manage your progress. Click <b>Start</b> to begin,
              <b>Continue</b> to resume, and <b>Mark Completed</b> to finish.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetails;
