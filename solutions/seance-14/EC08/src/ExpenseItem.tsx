import type { Expense } from "./type";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: number) => void;
}

function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  return (
    <li>
      <span>
        {expense.label} - {expense.amount.toFixed(2)} € - {expense.category}
      </span>
      <button onClick={() => onDelete(expense.id)}>Supprimer</button>
    </li>
  );
}

export default ExpenseItem;