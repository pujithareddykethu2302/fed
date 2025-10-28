import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect } from "react";
import { useChallenges } from "../common/ChallengeContext";

const MoreChallenge = () => {
  const navigate = useNavigate();
const { moreCategories, setMoreCategories } = useChallenges();

useEffect(() => {
  fetch(`${import.meta.env.BASE_URL}data/moreChallenges.json`)
    .then((res) => res.json())
    .then((data) => setMoreCategories(data.categories || []));
}, []);



  console.log("categories", moreCategories)
  const handleButtonChallenge = (categoryName: string) => {
    navigate(`/more-challenges/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mt-1">
        <a href="/" className="mr-[0.1rem] flex font-semibold">
          Home
        </a>
        <NavigateNextIcon fontSize="small" />
        <p className="mr-4">More Challenges</p>
      </div>
      <p className="text-[32px] font-bold text-[#080809] mb-6">
        From Ideas to Execution — Pick Your Next Challenge
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {moreCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#fcfaff] p-6 rounded-2xl shadow-md min-h-80 flex flex-col justify-between items-center 
            border border-transparent hover:border-[#563A9C]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-center px-4">
              <p className="font-bold text-[#563A9C] text-2xl mb-3">
                {cat.icon} {cat.name}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {cat.description}
              </p>
            </div>

            <button
              onClick={() => handleButtonChallenge(cat.name)}
              className="mt-6 bg-linear-to-r from-[#563A9C] to-[#7c5bdb] hover:from-[#472e85] hover:to-[#6540b5]
             text-white font-medium rounded-lg px-6 py-2.5 transition-all shadow-md hover:shadow-lg"
            >
              View Challenges
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreChallenge;
