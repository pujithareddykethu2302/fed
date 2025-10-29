import { useState, useEffect, useRef } from "react";
import ScheduleImage from "../../assets/Images/Planner/Schedule-amico.svg";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import GoalSection from "./GoalSection";

interface Goal {
  text: string;
  completed: boolean;
}

const Planner = () => {
  const [monthlyGoals, setMonthlyGoals] = useState<Goal[]>([]);
  const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>([]);
  const [dailyGoals, setDailyGoals] = useState<Goal[]>([]);

  const [monthlyText, setMonthlyText] = useState("");
  const [weeklyText, setWeeklyText] = useState("");
  const [dailyText, setDailyText] = useState("");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingType, setEditingType] = useState<"monthly" | "weekly" | "daily" | null>(null);

  const inputRefs = {
    monthly: useRef<HTMLInputElement | null>(null),
    weekly: useRef<HTMLInputElement | null>(null),
    daily: useRef<HTMLInputElement | null>(null),
  };

  useEffect(() => {
    const loadGoals = (key: string) => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    };
    setMonthlyGoals(loadGoals("monthlyGoals"));
    setWeeklyGoals(loadGoals("weeklyGoals"));
    setDailyGoals(loadGoals("dailyGoals"));
  }, []);

  const saveGoals = (key: string, goals: Goal[]) =>
    localStorage.setItem(key, JSON.stringify(goals));

  const handleAddGoal = (type: "monthly" | "weekly" | "daily") => {
    const text =
      type === "monthly"
        ? monthlyText
        : type === "weekly"
        ? weeklyText
        : dailyText;
    if (!text.trim()) return;

    const goals =
      type === "monthly"
        ? monthlyGoals
        : type === "weekly"
        ? weeklyGoals
        : dailyGoals;

    let updated: Goal[];
    if (editingIndex !== null && editingType === type) {
      updated = goals.map((g, i) => (i === editingIndex ? { ...g, text } : g));
      setEditingIndex(null);
      setEditingType(null);
    } else {
      updated = [...goals, { text, completed: false }];
    }

    const key = `${type}Goals`;
    if (type === "monthly") setMonthlyGoals(updated);
    else if (type === "weekly") setWeeklyGoals(updated);
    else setDailyGoals(updated);

    saveGoals(key, updated);

    if (type === "monthly") setMonthlyText("");
    else if (type === "weekly") setWeeklyText("");
    else setDailyText("");

    setTimeout(() => inputRefs[type].current?.focus(), 50);
  };

  const toggleCompleted = (type: "monthly" | "weekly" | "daily", index: number) => {
    const update = (goals: Goal[], key: string) => {
      const updated = goals.map((g, i) =>
        i === index ? { ...g, completed: !g.completed } : g
      );
      saveGoals(key, updated);
      return updated;
    };

    if (type === "monthly") setMonthlyGoals(update(monthlyGoals, "monthlyGoals"));
    else if (type === "weekly") setWeeklyGoals(update(weeklyGoals, "weeklyGoals"));
    else setDailyGoals(update(dailyGoals, "dailyGoals"));
  };

  const deleteGoal = (type: "monthly" | "weekly" | "daily", index: number) => {
    const remove = (goals: Goal[], key: string) => {
      const updated = goals.filter((_, i) => i !== index);
      saveGoals(key, updated);
      return updated;
    };

    if (type === "monthly") setMonthlyGoals(remove(monthlyGoals, "monthlyGoals"));
    else if (type === "weekly") setWeeklyGoals(remove(weeklyGoals, "weeklyGoals"));
    else setDailyGoals(remove(dailyGoals, "dailyGoals"));
  };

  const editGoal = (type: "monthly" | "weekly" | "daily", index: number) => {
    const goals =
      type === "monthly"
        ? monthlyGoals
        : type === "weekly"
        ? weeklyGoals
        : dailyGoals;

    const goal = goals[index];
    if (!goal) return;

    if (type === "monthly") setMonthlyText(goal.text);
    else if (type === "weekly") setWeeklyText(goal.text);
    else setDailyText(goal.text);

    setEditingIndex(index);
    setEditingType(type);

    setTimeout(() => inputRefs[type].current?.focus(), 50);
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = currentDate.toLocaleDateString("default", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const currentWeek = Math.ceil(currentDate.getDate() / 7);

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="flex items-center mt-1">
        <a href="/" className="mr-[0.1rem] flex text-[#563A9C] hover:underline">
          Home
        </a>
        <NavigateNextIcon fontSize="small" />
        <p className="text-gray-600">Planner</p>
      </div>

      <h1 className="text-3xl font-bold text-[#563A9C] mb-2">Goal Planner</h1>
      <p className="text-gray-600 mb-8">
        Plan your monthly, weekly, and daily goals to stay consistent and organized.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GoalSection
          title="Monthly Goals"
          subtitle={`${currentMonth} ${currentYear}`}
          goals={monthlyGoals}
          text={monthlyText}
          inputRef={inputRefs.monthly}
          editingIndex={editingIndex}
          editingType={editingType}
          type="monthly"
          setText={setMonthlyText}
          handleAddGoal={handleAddGoal}
          toggleCompleted={toggleCompleted}
          editGoal={editGoal}
          deleteGoal={deleteGoal}
        />
        <GoalSection
          title="Weekly Goals"
          subtitle={`Week ${currentWeek} - ${currentMonth} ${currentYear}`}
          goals={weeklyGoals}
          text={weeklyText}
          inputRef={inputRefs.weekly}
          editingIndex={editingIndex}
          editingType={editingType}
          type="weekly"
          setText={setWeeklyText}
          handleAddGoal={handleAddGoal}
          toggleCompleted={toggleCompleted}
          editGoal={editGoal}
          deleteGoal={deleteGoal}
        />
        <GoalSection
          title="Daily Goals"
          subtitle={currentDay}
          goals={dailyGoals}
          text={dailyText}
          inputRef={inputRefs.daily}
          editingIndex={editingIndex}
          editingType={editingType}
          type="daily"
          setText={setDailyText}
          handleAddGoal={handleAddGoal}
          toggleCompleted={toggleCompleted}
          editGoal={editGoal}
          deleteGoal={deleteGoal}
        />
      </div>

      <div className="mt-16 bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center p-8 gap-8">
        <div className="flex-1">
          <p className="text-2xl font-semibold text-[#563A9C] mb-4">
            "Small Steps. Big Progress."
          </p>
          <p className="text-gray-600">
            Keep planning consistently and watch your goals turn into achievements.
          </p>
        </div>
        <div className="flex-1">
          <img src={ScheduleImage} alt="Planner Illustration" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Planner;
