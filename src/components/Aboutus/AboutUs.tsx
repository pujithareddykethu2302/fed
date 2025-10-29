import { useNavigate } from "react-router-dom";
import bannerImage from "../../assets/Images/AboutUs/Website Creator-cuate.svg"
import whoWeAre from "../../assets/Images/AboutUs/whoweAre.svg"

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative w-full h-[60vh] sm:h-[600px]">
        <img
          src={bannerImage}
          className="w-full h-full object-cover"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/65 to-black/60 z-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 text-center z-10">
          <p className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
            Master React, One Challenge at a Time — Build with Challenges
          </p>
          <p className="mt-4 text-md sm:text-lg text-white drop-shadow-md">
            A hands-on playground for front-end devs
          </p>
          <button
            className="mt-6 px-6 py-3 bg-[#563A9C] text-white rounded hover:bg-[#472F85] cursor-pointer"
            onClick={() => navigate("/30-days-challenge")}
          >
            Start Your First Challenge
          </button>
        </div>
      </div>

 
      <div className="mt-8 flex flex-col md:flex-row items-center justify-center px-4 sm:px-12 gap-8">
        <img
          src={whoWeAre}
          className="w-full md:w-1/2 h-auto"
          alt="Who We Are"
        />
        <div className="md:px-6 max-w-md text-center md:text-left">
          <p className="text-2xl sm:text-3xl font-bold text-black">
            Where <span className="text-[#563A9C]">Developers</span> Build
            Confidence
          </p>
          <div className="flex items-start mt-4 md:mt-6">
            <div className="w-1 h-24 bg-[#B0B0B0] rounded mr-4"></div>
            <p className="text-gray-500 leading-relaxed">
              Challenge Hub is a hands-on platform for front-end developers to
              learn by doing. With practical challenges, real-world projects,
              and daily progress, it helps you master React and modern web
              development step by step—whether you’re a beginner or sharpening
              your skills.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 px-4 sm:px-12 py-16 flex flex-col sm:flex-row gap-6 justify-center items-stretch">
        {[
          {
            title: "Our Mission",
            text: "Our mission is simple: turn learning into building. Every challenge helps developers move from theory to real-world projects.",
          },
          {
            title: "Our Vision",
            text: "We envision a world where developers learn by building, not just reading, gaining confidence through creativity and consistent practice.",
          },
          {
            title: "What We Offer",
            text: "Hands-on challenges, curated learning paths, and real-world projects designed to help you grow from beginner to confident builder.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-2xl w-full sm:w-[30%] transition-transform hover:-translate-y-2 duration-300"
          >
            <div className="px-6 py-3 bg-[#563A9C] text-white rounded-t-2xl">
              <p className="text-lg font-semibold uppercase">{card.title}</p>
            </div>
            <div className="p-6 text-gray-700">
              <p className="leading-relaxed">{card.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 py-16 px-4 sm:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#563A9C] mb-6">
          What You’ll Find Here
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Explore everything you need to grow as a front-end developer — all in
          one place, designed to keep you consistent, creative, and confident.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {[
            {
              title: "💡 Daily React Challenges",
              text: "Level up daily with real-world coding tasks that help you build mastery.",
            },
            {
              title: "🎯 Set Goals",
              text: "Define your personal milestones and stay accountable as you learn.",
            },
            {
              title: "📆 Progress Tracker",
              text: "Keep track of your growth, completed challenges, and consistency streaks.",
            },
            {
              title: "📚 Add Resources",
              text: "Save articles, videos, and tools that help you in your coding journey.",
            },
            {
              title: "⚙️ Custom Challenges",
              text: "Create and practice your own challenges tailored to your learning goals.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition"
            >
              <p className="text-lg font-semibold text-[#563A9C] mb-2">
                {item.title}
              </p>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

 
      <div className="text-center py-16 bg-linear-to-r from-[#563A9C] to-[#7E5CCB] text-white">
        <p className="text-2xl sm:text-3xl font-semibold italic tracking-wide">
          “Small Steps. Big Progress.”
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
