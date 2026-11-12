import { categories, type Expense } from "./type";

interface SummaryProps {
  displayed: Expense[];
  all: Expense[];
}

const total = (list: Expense[]) =>
  list.reduce((sum, expense) => sum + expense.amount, 0);

const Summary = ({ displayed, all }: SummaryProps) => {
  return (
    <section>
      <p>
        {displayed.length} dépense(s) affichée(s), total :{" "}
        {total(displayed).toFixed(2)} €
      </p>
      <ul>
        {categories.map((c) => (
          <li key={c}>
            {c} : {total(all.filter((expense) => expense.category === c)).toFixed(2)} €
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Summary;