import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useChallenges } from "../common/ChallengeContext";
import { useMemo } from "react";

ChartJs.register(ArcElement, Tooltip, Legend);

const StatusGraph = () => {
  const { challenges } = useChallenges();
  console.log("challenges", challenges)

  const { completed, inProgress, notStarted } = useMemo(() => {
    const completed = challenges.filter((c) => c.status === "Completed").length;
    const inProgress = challenges.filter((c) => c.status === "In Progress").length;
    const notStarted = challenges.filter((c) => c.status === "Not Started").length;
    return { completed, inProgress, notStarted };
  }, [challenges]);

  const data = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        label: "Challenge Progress",
        data: [completed, inProgress, notStarted],
        backgroundColor: ["#563A9C", "#8E6CF2", "#E5E2F5"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#333",
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="w-full h-[350px] flex flex-col items-center justify-center mt-6">
      <Doughnut data={data} options={options} />
 
    </div>
  );
};

export default StatusGraph;
