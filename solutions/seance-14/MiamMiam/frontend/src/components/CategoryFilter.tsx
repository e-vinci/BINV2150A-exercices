import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import { categories } from "../data/categories";

interface CategoryFilterProps {
  selectedId: number | null;
  onSelect: (categoryId: number | null) => void;
}
export const CategoryFilter = ({
  selectedId,
  onSelect,
}: CategoryFilterProps) => {
  return (
    <Stack spacing={1} sx={{ my: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        Explorer par catégorie
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
      <Chip
        label="Toutes les recettes"
        color={selectedId === null ? "primary" : "default"}
        variant={selectedId === null ? "filled" : "outlined"}
        onClick={() => onSelect(null)}
      />
      {categories.map((category) => (
        <Tooltip key={category.id} title={category.description}>
          <Chip
            label={category.name}
            color={selectedId === category.id ? "primary" : "default"}
            variant={selectedId === category.id ? "filled" : "outlined"}
            onClick={() => onSelect(category.id)}
          />
        </Tooltip>
      ))}
      </Stack>
    </Stack>
  );
};
