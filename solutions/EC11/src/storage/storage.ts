import type { Tache } from "../App";

export const saveTheme = (theme: "light" | "dark"): void  => {
    localStorage.setItem("theme", theme);
};

export const loadTheme = (): "light" | "dark" => {
    try {
      const theme = localStorage.getItem("theme");  
      if(theme !== "dark" && theme !== "light") {
        return "light";
      
    } else {
        return theme;
    }
    
    } catch {
        return "light";
    }
};


export const saveTasks = (taches: Tache[]): void => {
    localStorage.setItem("tâches", JSON.stringify(taches));
};

export const loadTasks = (): Tache[] => {
    const isValidTache = (value: unknown): value is Tache[] => {
        return Array.isArray(value) && value.every((item) => 
            typeof item === "object" &&
            item !== null && 
            typeof item.id === "number" && 
            typeof item.text ==="string" && 
            typeof item.done ==="boolean"
        );
    };

    try {
        const taches = localStorage.getItem("tâches");
        const parsed = taches ? JSON.parse(taches) : [];
        if(isValidTache(parsed)) {
            return parsed;
        }
        return [];
    } catch {
        return []
    }
};


export const saveTextLibre = (textLibre: string): void => {
    sessionStorage.setItem("texteLibre", textLibre);
};

export const loadTextLibre = () => {
    try {
        return sessionStorage.getItem("texteLibre") ?? "";
        
    } catch {
        return "";
    }
};