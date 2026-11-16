import type { Expense } from "./type";
import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  return (
    <section>
      <h2>Dépenses</h2>
      {expenses.length === 0 ? (
        <p>Aucune dépense à afficher.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ExpenseList;