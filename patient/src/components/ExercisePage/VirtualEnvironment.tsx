import React from "react";

const VirtualEnvironment: React.FC = () => {
  return (
    // Use flex-1 for flexible width, adjust basis if needed (e.g., basis-1/2)
    <div className="flex flex-col flex-1 basis-1/2 min-w-[300px]"> 
      {/* Consistent card styling: white bg, rounded-xl, shadow-md, padding */}
      <div className="flex flex-col grow p-6 w-full bg-white rounded-xl shadow-md h-full"> {/* Added h-full */}
        {/* Increased title size and weight */}
        <div className="self-start text-lg font-medium text-gray-700"> 
          Virtual Environment
        </div>
        {/* Keep placeholder styling simple */}
        <div className="flex flex-col justify-center items-center flex-grow mt-4 bg-gray-100 rounded-lg"> 
          <div className="flex justify-center items-center h-full w-full text-gray-500 text-lg"> 
            (Virtual Environment Display Area)
          </div> 
        </div>
      </div>
    </div> 
  );
};

export default VirtualEnvironment;
