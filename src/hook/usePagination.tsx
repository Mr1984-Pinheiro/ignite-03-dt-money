import { useState } from "react";

interface Transaction {
  description: string;
  amount: number;
  variant: "income" | "outcome";
  category: string;
  date: string;
}

interface PaginationResult {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  currentData: Transaction[];
}

export function usePagination(
  data: Transaction[],
  itemsPerPage: number
): PaginationResult {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentData,
  };
}
