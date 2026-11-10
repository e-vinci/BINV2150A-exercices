import type { Product } from "../data/products";

interface CatalogProps {
  products: Product[];
  onAdd: (productId: number) => void;
}

const Catalog = ({ products, onAdd }: CatalogProps) => {
  return (
    <section className="panel">
      <h2>Produits disponibles</h2>
      <div className="product-list">
        {products.map((product) => (
          <article className="product" key={product.id}>
            <div>
              <span className="product-id">Produit #{product.id}</span>
              <h3>{product.name}</h3>
              <p>{product.price.toFixed(2)} €</p>
            </div>
            <button type="button" onClick={() => onAdd(product.id)}>
              Ajouter au panier
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Catalog;
