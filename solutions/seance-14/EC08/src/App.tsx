import { useState } from "react";
import type { Category, Expense, NewExpense } from "./type";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import Summary from "./Summary";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [searchText, setSearchText] = useState("");

  const addExpense = (newExpense: NewExpense) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { ...newExpense, id: Date.now() },
    ]);
  };

  const deleteExpense = (id: number) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );
  };

  const displayedExpenses = expenses.filter(
    (expense) =>
      (selectedCategory === null ||
        expense.category === selectedCategory) &&
      expense.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <main>
      <h1>Suivi de dépenses</h1>
      <ExpenseForm onAdd={addExpense} />
      <SearchBar value={searchText} onChange={setSearchText} />
      <CategoryFilter
        value={selectedCategory}
        onChange={setSelectedCategory}
      />
      <ExpenseList expenses={displayedExpenses} onDelete={deleteExpense} />
      <Summary displayedExpenses={displayedExpenses} allExpenses={expenses} />
    </main>
  );
}

export default App;