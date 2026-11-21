import type { ReactNode } from "react";

interface FormulaCardProps {
  name: string;
  price: number;
  ribbon?: string;
  children: ReactNode;
}

const FormulaCard = ({ name, price, ribbon, children }: FormulaCardProps) => {
  return (
    <div className={ribbon ? "formula-card formula-card-highlighted" : "formula-card"}>
      {ribbon && <span className="formula-ribbon">{ribbon}</span>}
      <div className="formula-header">
        <h3 className="formula-name">{name}</h3>
        <span className="formula-price">{price.toFixed(2)} €</span>
      </div>
      <ul>{children}</ul>
    </div>
  );
};

export default FormulaCard;
