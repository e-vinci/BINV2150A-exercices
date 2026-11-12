import { useState } from "react";
import type { Category, Expense, NewExpense } from "./type";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import Summary from "./Summary";

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState<Category | null>(null);
  const [query, setQuery] = useState("");

  const addExpense = (newExpense: NewExpense) => {
    const expense: Expense = { ...newExpense, id: Date.now() };
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const displayed = expenses.filter(
    (expense) =>
      (filter === null || expense.category === filter) &&
      expense.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <h1>Suivi de dépenses</h1>
      <ExpenseForm onAdd={addExpense} />
      <SearchBar value={query} onChange={setQuery} />
      <CategoryFilter value={filter} onChange={setFilter} />
      <ExpenseList expenses={displayed} onDelete={deleteExpense} />
      <Summary displayed={displayed} all={expenses} />
    </main>
  );
};

export default App;