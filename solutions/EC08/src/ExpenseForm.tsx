import { useState } from "react";
import { categories, type Category, type NewExpense } from "./type";

interface ExpenseFormProps {
  onAdd: (expense: NewExpense) => void;
}

const ExpenseForm = ({ onAdd }: ExpenseFormProps) => {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Alimentation");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = Number(amount);

    if (label.trim() === "") {
      setError("Le libellé est obligatoire.");
      return;
    }
    if (!(value > 0)) {
      setError("Le montant doit être supérieur à 0.");
      return;
    }

    onAdd({ label: label.trim(), amount: value, category });

    setLabel("");
    setAmount("");
    setCategory("Alimentation");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Libellé"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <input
        type="number"
        placeholder="Montant"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button type="submit">Ajouter</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default ExpenseForm;