import { TextField } from "@mui/material";
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <TextField
    label="Rechercher une recette"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    fullWidth
  />
);

export default SearchBar;