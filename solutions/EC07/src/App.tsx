import { products } from "./data/products";
import { useState } from "react";
import './App.css'

interface CartItem {
  productId: number;
  quantity: number;
}
function App() {

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productId: number) =>
    setCart((prev) =>
      prev.some((item) => item.productId === productId)
        ? prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        : [...prev, { productId, quantity: 1 }]
    );

  const changeQuantity = (productId: number, delta: number) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  const removeFromCart = (productId: number) =>
    setCart((prev) => prev.filter((item) => item.productId !== productId));

  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div>
      <h2>Catalogue</h2>
      {products.map((product) => (
        <div key={product.id}>
          #{product.id} {product.name} : {product.price.toFixed(2)} €
          <button type="button" onClick={() => addToCart(product.id)}>Ajouter au panier</button>
        </div>
      ))}

      <h2>Panier</h2>
      {cart.length === 0 && <p>Le panier est vide</p>}
      {cart.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;

        return (
          <div key={item.productId}>
            {product.name} | quantité : {item.quantity} |{" "}
            {(product.price * item.quantity).toFixed(2)} €{" "}
            <button type="button" onClick={() => changeQuantity(item.productId, -1)}>−</button>
            <button type="button" onClick={() => changeQuantity(item.productId, 1)}>+</button>
            <button type="button" onClick={() => removeFromCart(item.productId)}>Retirer</button>
          </div>
        );
      })}

      <p>
        <strong>Total : {total.toFixed(2)} €</strong>
      </p>
    </div>
  );
}

export default App;
