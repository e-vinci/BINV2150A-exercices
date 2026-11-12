import { categories, type Category } from "./type";

interface CategoryFilterProps {
  value: Category | null;
  onChange: (value: Category | null) => void;
}

const CategoryFilter = ({ value, onChange }: CategoryFilterProps) => {
  return (
    <div>
      <button disabled={value === null} onClick={() => onChange(null)}>
        Toutes
      </button>
      {categories.map((c) => (
        <button key={c} disabled={value === c} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;