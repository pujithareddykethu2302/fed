import { useParams } from "react-router-dom";
import ChallengeCard from "../common/ChallengeCard";
import { useChallenges } from "../common/ChallengeContext";
import { useEffect } from "react";

const CategoryChallenges = () => {
  const { moreCategories, setMoreCategories } = useChallenges();
  const { categoryName } = useParams();


  const decodedCategoryName = decodeURIComponent(categoryName || "");


  const category = moreCategories.find(
    (c) => c.name === decodedCategoryName
  );

  useEffect(() => {
    if (moreCategories.length === 0) {
      fetch("/data/moreChallenges.json")
        .then((res) => res.json())
        .then((data) => setMoreCategories(data.categories || []))
        .catch((err) =>
          console.error("Error loading category challenges:", err)
        );
    }
  }, []);

  if (!category) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#563A9C] mb-6">
        {category.icon} {category.name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.challenges.map((item: any) => (
          <ChallengeCard
            key={item.id}
            item={item}
            basePath={`/more-challenges/${category.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryChallenges;
