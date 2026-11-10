import { useState } from "react";
import Cart, { type CartLine } from "./components/Cart";
import Catalog from "./components/Catalog";
import { products } from "./data/products";
import "./App.css";

function App() {
  const [cart, setCart] = useState<CartLine[]>([]);

  const addToCart = (productId: number) => {
    setCart((currentCart) => {
      const alreadyInCart = currentCart.find((item) => item.productId === productId);

      if (alreadyInCart) {
        return currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.productId !== productId)
    );
  };

  return (
    <main className="page">
      <header className="header">
        <p className="eyebrow">EC07 · exercice complémentaire</p>
        <h1>Petite boutique</h1>
        <p>Choisissez vos produits et composez votre panier.</p>
      </header>

      <Catalog products={products} onAdd={addToCart} />
      <Cart
        lines={cart}
        products={products}
        onChangeQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </main>
  );
}

export default App;
