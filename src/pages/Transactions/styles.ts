import styled from "styled-components";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  @media (max-width:690px) {
    display: none;
  }

  td {
    padding: 1.25rem 2rem;
    background: ${props => props.theme["gray-700"]};
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }  
`;

export const MobileContainer = styled.div`
  padding: 20px;
  background: ${props => props.theme["gray-700"]};
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px 0;
  

  @media (min-width:690px) {
    display: none;
  }

  strong {
    font-size: 20px;
  }

  footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;

      svg {
        width: 16px;
        height: 16px;
      }

      span {
        color: ${props => props.theme["gray-500"]};

      }
    }
  }
`;

interface PriceHighlightProps {
  variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${props => props.variant === "income" ? props.theme["green-300"] : props.theme["red-300"]};
`;

export const PaginationContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .btn-previous,
  .btn-next {
    background: none;
    border: none;
    cursor: pointer;

    > svg {
      color:#00875F;
    }

    &:disabled {

      cursor: not-allowed;
      svg {
        color: #323238;
      }
    }
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    
  }
`;

export const ButtonCorrent = styled.button`    
    background-color: ${props => props.theme["gray-600"]};
    color: ${props => props.theme["gray-300"]};
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;  
    border: none;  
    gap: 0.5rem;

    &:disabled {
      background-color: ${props => props.theme["green-700"]};
      color: ${props => props.theme["gray-100"]};

    }
`;