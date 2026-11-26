import { useEffect, useState } from "react";

export const useDebouncedValue = (value: string, delay: number) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedQuery(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return { debouncedQuery };
};
