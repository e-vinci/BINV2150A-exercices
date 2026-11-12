import type { Expense } from "./type";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: number) => void;
}

const ExpenseItem = ({ expense, onDelete }: ExpenseItemProps) => {
  return (
    <li>
      {expense.label} : {expense.amount.toFixed(2)} € ({expense.category})
      <button onClick={() => onDelete(expense.id)}>Supprimer</button>
    </li>
  );
};

export default ExpenseItem;