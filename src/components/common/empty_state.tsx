import { HomeModernIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const EmptyStateExample: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(true);

  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      <div className="bg-gray-200 w-full p-4 rounded-lg shadow-lg text-center p-10">
        <div className="grid place-items-center h-20">
          <NewspaperIcon className="text-center h-20 w-20 flex-shrink-0 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">No Post</h1>
        <p className="text-gray-600">No items found</p>
      </div>
    </div>
  );
};

export default EmptyStateExample;
