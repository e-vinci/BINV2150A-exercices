import type { Product } from "../data/products";

interface CartLine {
  productId: number;
  quantity: number;
}

interface CartProps {
  lines: CartLine[];
  products: Product[];
  onChangeQuantity: (productId: number, amount: number) => void;
  onRemove: (productId: number) => void;
}

const Cart = ({ lines, products, onChangeQuantity, onRemove }: CartProps) => {
  const cartTotal = lines.reduce((total, line) => {
    const product = products.find((item) => item.id === line.productId);
    return total + (product ? product.price * line.quantity : 0);
  }, 0);

  return (
    <section className="panel cart">
      <div className="section-title">
        <h2>Mon panier</h2>
        <span>{lines.length} article(s)</span>
      </div>

      {lines.length === 0 ? (
        <p className="empty-cart">Votre panier est vide.</p>
      ) : (
        <div className="cart-list">
          {lines.map((line) => {
            const product = products.find((item) => item.id === line.productId);

            if (!product) {
              return null;
            }

            return (
              <div className="cart-line" key={line.productId}>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price.toFixed(2)} € l'unité</span>
                </div>
                <div className="line-actions">
                  <button
                    type="button"
                    aria-label={`Diminuer la quantité de ${product.name}`}
                    onClick={() => onChangeQuantity(product.id, -1)}
                  >
                    −
                  </button>
                  <span className="quantity">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Augmenter la quantité de ${product.name}`}
                    onClick={() => onChangeQuantity(product.id, 1)}
                  >
                    +
                  </button>
                  <span className="line-total">
                    {(product.price * line.quantity).toFixed(2)} €
                  </span>
                  <button
                    type="button"
                    className="remove"
                    onClick={() => onRemove(product.id)}
                  >
                    Retirer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="total">
        <span>Total</span>
        <strong>{cartTotal.toFixed(2)} €</strong>
      </div>
    </section>
  );
};

export type { CartLine };
export default Cart;
