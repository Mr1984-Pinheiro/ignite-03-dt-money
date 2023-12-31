import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { usePagination } from "../../hooks/usePagination";
import { SearchForm } from "./components/SearchForm";
import categoryIcon from "..//../assets/categoryIcon.svg";
import dateIcon from "../../assets/dateIcon.svg";

import {
  ButtonCorrent,
  MobileContainer,
  PaginationContent,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { CaretLeft, CaretRight, Trash } from "phosphor-react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
  const { transactions, deleteTransaction } = useContext(TransactionsContext);

  const itemsPerPage = 7; // Adjust the number of items per page as needed

  const { currentPage, setCurrentPage, totalPages, currentData } =
    usePagination(transactions, itemsPerPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const pagesToDisplay = Math.min(totalPages); // Limit the number of pages displayed

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />

        {currentData.map((transaction) => {
          return (
            <MobileContainer key={transaction.id}>
              <p>{transaction.description}</p>
              <strong>
                <PriceHighlight variant={transaction.type}>
                  {transaction.type === "outcome" && "- "}
                  {priceFormatter.format(transaction.price)}
                </PriceHighlight>
              </strong>

              <footer>
                <div>
                  <img src={categoryIcon} alt="" />
                  <span>{transaction.category}</span>
                </div>
                <div>
                  <img src={dateIcon} alt="" />
                  <span>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </span>
                </div>
              </footer>
            </MobileContainer>
          );
        })}

        <TransactionsTable>
          <tbody>
            {currentData.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(transaction.id)}>
                      <Trash size={20} />
                    </button>
                  </td>
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
