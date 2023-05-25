import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="w-full ">
      <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

      <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
      <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    </div>
  );
};

export default SkeletonCard;
