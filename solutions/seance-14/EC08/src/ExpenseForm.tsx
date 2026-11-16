import { useState } from "react";
import type { FormEvent } from "react";
import { categories, type Category, type NewExpense } from "./type";

interface ExpenseFormProps {
  onAdd: (expense: NewExpense) => void;
}

function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [label, setLabel] = useState("");
  const [amountText, setAmountText] = useState("");
  const [category, setCategory] = useState<Category>("Alimentation");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(amountText);

    if (label.trim() === "") {
      setMessage("Le libellé est obligatoire.");
      return;
    }
    if (amount <= 0 || Number.isNaN(amount)) {
      setMessage("Le montant doit être supérieur à 0.");
      return;
    }

    onAdd({ label: label.trim(), amount, category });

    setLabel("");
    setAmountText("");
    setCategory("Alimentation");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Libellé"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        aria-label="Libellé"
      />
      <input
        type="number"
        placeholder="Montant"
        min="0"
        value={amountText}
        onChange={(e) => setAmountText(e.target.value)}
        aria-label="Montant"
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
      {message && <p>{message}</p>}
    </form>
  );
}

export default ExpenseForm;