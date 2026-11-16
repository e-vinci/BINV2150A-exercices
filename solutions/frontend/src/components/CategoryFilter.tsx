import { categories } from "../data/categories";
import { Chip, Stack } from "@mui/material";

interface CategoryFilterProps {
  selectedId: number | null;
  onSelect: (categoryId: number | null) => void;
}

const CategoryFilter = ({ selectedId, onSelect }: CategoryFilterProps) => (
  <Stack direction="row" spacing={1}>
    <Chip
      label="Toutes"
      color={selectedId === null ? "primary" : "default"}
      onClick={() => onSelect(null)}
    />
    {categories.map((category) => (
      <Chip
        key={category.id}
        label={category.name}
        color={selectedId === category.id ? "primary" : "default"}
        onClick={() => onSelect(category.id)}
      />
    ))}
  </Stack>
);

export default CategoryFilter;