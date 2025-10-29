import DateCalendarServerRequest from "../common/Calender";
import EastIcon from "@mui/icons-material/East";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { days, months } from "../common/Constants";
import StartImg from "../../assets/Images/Dashboard/Start.svg";
import NotesImage from "../../assets/Images/Dashboard/Notes-pana.svg";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../common/NotesContext";
import { useEffect, useState } from "react";
import { fetchGreetings } from "../../service/greetingService";
import StatusGraph from "./StatusGraph";

const Dashboard = () => {
  const navigate = useNavigate();
  const d = new Date();
  let TodayDate = d.getDate();
  let month = months[d.getMonth()];
  let Week = days[d.getDay()];

  const { notes } = useNotes();

  const [greeting, setGreeting] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  console.log("greeting ", greeting, caption);

  useEffect(() => {
    const loadGreeting = async () => {
      const greetings = await fetchGreetings();
      const hour = new Date().getHours();
      const current = greetings.find(
        (g) =>
          (g.startHour <= g.endHour &&
            hour >= g.startHour &&
            hour <= g.endHour) ||
          (g.startHour > g.endHour &&
            (hour >= g.startHour || hour <= g.endHour))
      );

      if (current) {
        setGreeting(current.greeting);
        const randomCaption =
          current.captions[Math.floor(Math.random() * current.captions.length)];
        setCaption(randomCaption);
      } else {
        setGreeting("Welcome Back 👋");
        setCaption("Let’s continue your learning journey!");
      }
    };

    loadGreeting();
  }, []);

  let randomItems: any[] = [];

  if (notes && notes.length === 1) {
    randomItems = [notes[0]];
  } else if (notes && notes.length >= 2) {
    const r1 = Math.floor(Math.random() * notes.length);
    let r2 = Math.floor(Math.random() * notes.length);
    while (r2 === r1) r2 = Math.floor(Math.random() * notes.length);
    randomItems = [notes[r1], notes[r2]];
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-10">
        <h1 className="text-2xl font-bold text-[#563A9C]">
          Welcome to <span className="text-[#2b2828]">FED</span>
        </h1>
        <p className="text-lg text-[#2b2828] font-medium mt-4">
          Turn Every Day into Progress — One Challenge at a Time.
        </p>
        <div className=" justify-between flex flex-col sm:flex-row gap-1 mb-2">
          <div className="bg-linear-to-r from-[#3E2C7A] via-[#563A9C] to-[#7A5AE0] rounded-xl shadow-sm mt-8 px-4 py-4 flex flex-col sm:flex-row justify-between w-full lg:w-[70%]">
            <div className="flex flex-col justify-between">
              <div className="mt-6 sm:mt-0 bg-white/20 backdrop-blur-md px-2 py-2 rounded-lg flex items-center gap-2 w-[75%] mb-8">
                <CalendarTodayIcon sx={{ color: "white" }} />
                <p className="text-white font-medium tracking-wide">
                  {month} {TodayDate}, {Week}
                </p>
              </div>
              <div className="  mb-8">
                <p className="text-2xl sm:text-4xl font-bold text-white/90">
                  {greeting ? ` ${greeting},` : "Hello!"}
                </p>
                <p className="mt-4 text-[20px] font-medium text-white/90">
                  {caption
                    ? caption
                    : "Your journey to mastery begins today — 30 days, endless possibilities."}
                </p>
                <button className="px-5 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-lg hover:bg-white/30 hover:shadow-lg mt-6 transition-all duration-200 flex items-center">
                  Let’s Go! <EastIcon className="ml-2" />
                </button>
              </div>
            </div>
            <div className="mt-8">
              <img src={StartImg} className="w-150 h-70" />
            </div>
          </div>
          <div className="mt-8 rounded-2xl shadow-lg  flex flex-col w-full lg:w-[27%]">
            <div className="bg-[#563A9C] rounded-t-lg px-4 py-4 flex justify-center items-center">
              <p className="text-lg font-semibold text-white">
                My Check-In Tracker
              </p>
            </div>

            <DateCalendarServerRequest />
          </div>
        </div>
        <div className=" justify-between flex flex-col sm:flex-row gap-1 mb-2 w-full">
          <div className=" flex w-full lg:w-[70%]  flex-col sm:flex-row">
            <div className="bg-white rounded-xl shadow-md my-4  w-full lg:w-[50%] mr-8 transition-transform hover:scale-[1.01]">
              <div className="bg-[#563A9C] rounded-t-lg px-4 py-4 flex justify-center items-center">
                <p className="text-lg font-semibold text-white">
                  React 30-days Tracker
                </p>
              </div>
              <StatusGraph />
            </div>
            <div className="bg-white rounded-2xl shadow-md  my-4 w-full lg:w-1/2 transition-transform hover:scale-[1.01]">
              <div className="bg-[#563A9C] rounded-t-lg px-4 py-4 flex justify-between items-center">
                <p className="text-lg font-semibold text-white">Notes Hub</p>
                <button
                  onClick={() => navigate("/codepen")}
                  className="text-sm text-white/80 hover:text-white underline"
                >
                  View All <EastIcon className="ml-4" />
                </button>
              </div>
              {randomItems.length > 0 ? (
                <div className="mt-2 p-4">
                  {randomItems.map((note) => (
                    <button
                      key={note.title}
                      className="flex justify-between border-b border-gray-200 py-3 w-full hover:bg-gray-50 transition-all text-left"
                      onClick={() => navigate("/codepen")}
                    >
                      <p className="text-[18px] font-medium text-gray-800">
                        {note.title}
                      </p>
                      <p className="text-[12px] text-gray-500">{note.date}</p>
                    </button>
                  ))}
                  <div className="flex justify-center items-center mt-6">
                    <img src={NotesImage} alt="Notes" className="w-50 h-50 " />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center mt-6">
                  <img src={NotesImage} alt="Notes" className="w-50 h-50" />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between lg:w-[27%] w-full  ">
            <div className="bg-[#563A9C] rounded-xl shadow-md p-6 mb-4 mt-4 w-full transition-transform hover:scale-[1.01]">
              <p className="text-white text-[16px] font-bold">
                Plan your day, track your progress, and schedule your 30-day
                challenge tasks.
              </p>
              <button
                className="px-4 py-2 text-[#563A9C] bg-white rounded hover:bg-[#d9d5e4] mt-8 font-bold"
                onClick={() => navigate("/my-planner")}
              >
                Open Planner <EastIcon className="ml-4" />
              </button>
            </div>
            <div className="bg-[#563A9C] rounded-xl shadow-md p-6 mb-4 mt-4  w-full transition-transform hover:scale-[1.01]">
              <p className="text-white text-[16px] font-bold">
                Jump into more coding challenges, track progress, and level up
                your skills.
              </p>
              <button
                className="px-4 py-2 text-[#563A9C] bg-white rounded hover:bg-[#d9d5e4] mt-8 font-bold"
                onClick={() => navigate("/More-hands-on-Challenges")}
              >
                Let’s Go! <EastIcon className="ml-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-16 bg-linear-to-r from-[#563A9C] to-[#7E5CCB] text-white">
        <p className="text-2xl sm:text-3xl font-semibold italic tracking-wide">
          “Small Steps. Big Progress.”
        </p>
      </div>
    </>
  );
};

export default Dashboard;
