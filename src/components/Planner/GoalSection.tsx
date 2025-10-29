import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Goal {
  text: string;
  completed: boolean;
}

interface GoalSectionProps {
  title: string;
  subtitle: string;
  goals: Goal[];
  text: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  editingIndex: number | null;
  editingType: "monthly" | "weekly" | "daily" | null;
  type: "monthly" | "weekly" | "daily";
  setText: (val: string) => void;
  handleAddGoal: (type: "monthly" | "weekly" | "daily") => void;
  toggleCompleted: (type: "monthly" | "weekly" | "daily", index: number) => void;
  editGoal: (type: "monthly" | "weekly" | "daily", index: number) => void;
  deleteGoal: (type: "monthly" | "weekly" | "daily", index: number) => void;
}


const GoalSection = ({
  title,
  subtitle,
  goals,
  text,
  inputRef,
  editingIndex,
  editingType,
  type,
  setText,
  handleAddGoal,
  toggleCompleted,
  editGoal,
  deleteGoal,
}: GoalSectionProps) => (
  <div className="bg-white rounded-xl p-6 shadow-md flex flex-col">
    <h2 className="text-xl font-semibold text-[#563A9C] mb-1">{title}</h2>
    <p className="text-gray-500 mb-4">{subtitle}</p>

    <div className="flex gap-3 mb-4">
      <input
        ref={inputRef}
        type="text"
        placeholder={`Add ${type} goal...`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C] focus:outline-none"
      />
      <button
        onClick={() => handleAddGoal(type)}
        className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg transition-all"
      >
        {editingIndex !== null && editingType === type ? "✓" : "+"}
      </button>
    </div>

    <ul className="space-y-2 max-h-60 overflow-y-auto pr-1 scroll-smooth">
      {goals.map((goal, i) => (
        <li
          key={i}
          className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 p-3 rounded-lg text-gray-700"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => toggleCompleted(type, i)}
            />
            <span
              className={`${
                goal.completed ? "line-through text-gray-400" : ""
              } wrap-break-word`}
            >
              {goal.text}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <EditIcon
              onClick={() => editGoal(type, i)}
              className="text-gray-500 hover:text-[#563A9C] cursor-pointer"
              fontSize="small"
            />
            <DeleteIcon
              onClick={() => deleteGoal(type, i)}
              className="text-gray-500 hover:text-red-500 cursor-pointer"
              fontSize="small"
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default GoalSection