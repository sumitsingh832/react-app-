import { useQuery } from "@tanstack/react-query";
import "./App.css";

async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error(`Products request failed (${response.status})`);
  }

  const result = await response.json();

  if (!Array.isArray(result.products)) {
    throw new Error("The products response is not in the expected format.");
  }

  return result.products;
}

function App() {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <main className="catalog-state">Loading products...</main>;
  }

  if (isError) {
    return (
      <main className="catalog-state catalog-error" role="alert">
        Could not load products: {error.message}
      </main>
    );
  }

  return (
    <main className="catalog">
      <header className="catalog-header">
        <p className="catalog-eyebrow">Discover something new</p>
        <h1>Products</h1>
        <p>Browse our latest picks, all in one place.</p>
      </header>

      {products.length === 0 ? (
        <p className="catalog-state">No products are available right now.</p>
      ) : (
        <>
          <p className="product-count">{products.length} products</p>
          <section className="product-grid" aria-label="Products">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <img
                  className="product-image"
                  src={product.images?.[0] || product.thumbnail}
                  alt={product.title}
                  onError={(event) => {
                    if (event.currentTarget.src !== product.thumbnail) {
                      event.currentTarget.src = product.thumbnail;
                    }
                  }}
                />
                <div className="product-details">
                  <p className="product-category">{product.category}</p>
                  <h2>{product.title}</h2>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <span className="product-price">${product.price}</span>
                    <span
                      className="product-rating"
                      aria-label={`Rating ${product.rating} out of 5`}
                    >
                      ★ {product.rating}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
}

export default App;