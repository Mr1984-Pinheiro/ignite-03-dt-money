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
  description: string;
  amount: number;
  variant: "income" | "outcome";
  category: string;
  date: string;
}

export function Transactions() {
  const transactionsData: Transaction[] = [
    {
      description: "Desenvolvimento de site",
      amount: 12000,
      variant: "income",
      category: "Venda",
      date: "13/04/2022",
    },
    {
      description: "Hambúrguer",
      amount: 59,
      variant: "outcome",
      category: "Alimentação",
      date: "10/04/2022",
    },
    {
      description: "Desenvolvimento de site",
      amount: 12000,
      variant: "income",
      category: "Venda",
      date: "13/04/2022",
    },
    {
      description: "Hambúrguer",
      amount: 59,
      variant: "outcome",
      category: "Alimentação",
      date: "10/04/2022",
    },
    {
      description: "Desenvolvimento de site",
      amount: 12000,
      variant: "income",
      category: "Venda",
      date: "13/04/2022",
    },
    {
      description: "Hambúrguer",
      amount: 59,
      variant: "outcome",
      category: "Alimentação",
      date: "10/04/2022",
    },
    {
      description: "Desenvolvimento de site",
      amount: 12000,
      variant: "income",
      category: "Venda",
      date: "13/04/2022",
    },
    {
      description: "Hambúrguer",
      amount: 59,
      variant: "outcome",
      category: "Alimentação",
      date: "10/04/2022",
    },
    {
      description: "Desenvolvimento de site",
      amount: 12000,
      variant: "income",
      category: "Venda",
      date: "13/04/2022",
    },
    {
      description: "Hambúrguer",
      amount: 59,
      variant: "outcome",
      category: "Alimentação",
      date: "10/04/2022",
    },
    {
      description: "Desenvolvimento de site",
      amount: 12000,
      variant: "income",
      category: "Venda",
      date: "13/04/2022",
    },
    {
      description: "Hambúrguer",
      amount: 59,
      variant: "outcome",
      category: "Alimentação",
      date: "10/04/2022",
    },
    {
      description: "Desenvolvimento de site",
      amount: 12000,
      variant: "income",
      category: "Venda",
      date: "13/04/2022",
    },
    {
      description: "Hambúrguer",
      amount: 59,
      variant: "outcome",
      category: "Alimentação",
      date: "10/04/2022",
    },
    {
      description: "Desenvolvimento de site",
      amount: 12000,
      variant: "income",
      category: "Venda",
      date: "13/04/2022",
    },
    {
      description: "Hambúrguer",
      amount: 59,
      variant: "outcome",
      category: "Alimentação",
      date: "10/04/2022",
    },
    // Add more data as needed
  ];

  const itemsPerPage = 7; // Adjust the number of items per page as needed

  const { currentPage, setCurrentPage, totalPages, currentData } =
    usePagination(transactionsData, itemsPerPage);

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
            {currentData.map((transaction, index) => (
              <tr key={index}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.variant}>
                    {transaction.variant === "income" ? "R$ " : "-R$ "}
                    {transaction.amount.toFixed(2)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
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
