import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { usePagination } from "../../hook/usePagination";
import { SearchForm } from "./components/SearchForm";

import {
  ButtonCorrent,
  PaginationContent,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { CaretLeft, CaretRight } from "phosphor-react";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3333/transactions");
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  const itemsPerPage = 7; // Adjust the number of items per page as needed

  const { currentPage, setCurrentPage, totalPages, currentData } =
    usePagination(transactions, itemsPerPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const pagesToDisplay = Math.min(totalPages); // Limit the number of pages displayed

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {currentData.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "income" ? "R$ " : "-R$ "}
                      {transaction.price.toFixed(2)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
        <PaginationContent>
          <button
            className="btn-previous"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={isFirstPage}
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          {Array.from({ length: pagesToDisplay }, (_, index) => (
            <ButtonCorrent
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </ButtonCorrent>
          ))}
          <button
            className="btn-next"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={isLastPage}
          >
            <CaretRight size={24} weight="bold" />
          </button>
        </PaginationContent>
      </TransactionsContainer>
    </div>
  );
}
