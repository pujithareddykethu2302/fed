import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PaginationProps {
  data: any[];
  pageSize?: number;
  onPageChange: (pageData: any[]) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  data,
  pageSize = 6,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = data.slice(startIndex, endIndex);
    onPageChange(pageData);
  }, [currentPage, data, pageSize, onPageChange]);

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="bg-gray-300 w-10 h-10 mr-[5px] border disabled:opacity-30 disabled:cursor-default"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`w-10 h-10 border mr-[5px] cursor-pointer rounded-md ${
            currentPage === num
              ? "bg-[#563A9C] text-white border-[#563A9C]"
              : "border border-gray-300"
          }`}
          onClick={() => setCurrentPage(num)}
        >
          {num}
        </button>
      ))}

      <button
        className="bg-gray-300 w-10 h-10 border disabled:opacity-30 disabled:cursor-default"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </button>
    </div>
  );
};

export default Pagination;
