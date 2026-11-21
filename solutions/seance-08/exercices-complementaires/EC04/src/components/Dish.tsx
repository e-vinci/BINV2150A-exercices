import type { ReactNode } from "react";

interface DishProps {
  name: string;
  price: number;
  oldPrice?: number;
  description?: string;
  note?: string;
  children?: ReactNode;
}

const Dish = ({ name, price, oldPrice, description, note, children }: DishProps) => {
  return (
    <article className="dish">
      <div className="dish-header">
        <h3 className="dish-name">{name}</h3>
        <span className="dish-prices">
          {oldPrice && <span className="dish-old-price">{oldPrice.toFixed(2)} €</span>}
          <span className="dish-price">{price.toFixed(2)} €</span>
        </span>
      </div>
      {description && <p className="dish-description">{description}</p>}
      {note && <p className="dish-note">{note}</p>}
      {children && <div className="badges">{children}</div>}
    </article>
  );
};

export default Dish;
