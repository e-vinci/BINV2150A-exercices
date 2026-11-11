import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <TextField
      label="Rechercher une recette"
      placeholder="Titre, description ou mot-clé"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ my: 2, backgroundColor: "white" }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        },
      }}
      fullWidth
    />
  );
};
