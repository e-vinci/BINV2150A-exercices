import { categories, type Expense } from "./type";

interface SummaryProps {
  displayedExpenses: Expense[];
  allExpenses: Expense[];
}

function Summary({ displayedExpenses, allExpenses }: SummaryProps) {
  const displayedTotal = displayedExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <section>
      <p>
        {displayedExpenses.length} dépense(s) affichée(s), total :{" "}
        {displayedTotal.toFixed(2)} €
      </p>
      <ul>
        {categories.map((c) => (
          <li key={c}>
            {c} :{" "}
            {allExpenses
              .filter((expense) => expense.category === c)
              .reduce((sum, expense) => sum + expense.amount, 0)
              .toFixed(2)}{" "}
            €
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Summary;