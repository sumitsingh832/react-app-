import { useEffect, useState } from "react";
import { useCart } from "./useCart";

const PRODUCTS_URL = "https://fakestoreapi.com/products";
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("We couldn't load the collection right now.");
        }

        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return undefined;

    const timeoutId = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timeoutId);
  }, [toast]);

  const categories = ["All", ...new Set(products.map((product) => product.category))];
  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main>
      {toast && (
        <div className="cart-toast" role="status" aria-live="polite">
          <span className="toast-check" aria-hidden="true">&#10003;</span>
          <span><strong>Added to your bag</strong><small>{toast.title}</small></span>
        </div>
      )}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">A little more considered</p>
          <h1 id="hero-title">Good things,<br />chosen well.</h1>
          <p className="hero-description">
            Useful finds and everyday favorites, gathered in one thoughtful place.
          </p>
          <a className="hero-link" href="#collection">
            Explore the collection <span aria-hidden="true">&#8595;</span>
          </a>
        </div>
        <div className="hero-note" aria-hidden="true">
          <span>THE EDIT</span>
          <strong>01</strong>
          <span>EVERYDAY OBJECTS</span>
        </div>
      </section>

      <section className="collection" id="collection" aria-labelledby="collection-title">
        <div className="collection-heading">
          <div>
            <p className="eyebrow">Made for the everyday</p>
            <h2 id="collection-title">The collection</h2>
          </div>
          <label className="search-field">
            <span className="visually-hidden">Search products</span>
            <span className="search-icon" aria-hidden="true">&#9906;</span>
            <input
              type="search"
              placeholder="Find something..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        {!loading && !error && (
          <div className="category-list" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                className={`category-button${activeCategory === category ? " is-active" : ""}`}
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category === "All" ? "All pieces" : category}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="status-message" role="status">
            <span className="loading-mark" aria-hidden="true" />
            Gathering the collection...
          </div>
        )}

        {error && (
          <div className="status-message error-message" role="alert">
            <strong>Something went wrong.</strong>
            <span>{error} Check your connection and refresh to try again.</span>
          </div>
        )}

        {!loading && !error && visibleProducts.length === 0 && (
          <p className="status-message">No pieces match that search.</p>
        )}

        {!loading && !error && visibleProducts.length > 0 && (
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
                  <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
                </div>
                <div className="product-details">
                  <p className="product-category">{product.category}</p>
                  <h3>{product.title}</h3>
                  <div className="product-bottom">
                    <span className="product-price">{currency.format(product.price)}</span>
                    <button
                      className="add-button"
                      type="button"
                      onClick={() => {
                        addToCart(product);
                        setToast((currentToast) => ({
                          id: (currentToast?.id ?? 0) + 1,
                          title: product.title,
                        }));
                      }}
                      aria-label={`Add ${product.title} to cart`}
                    >
                      <span aria-hidden="true">+</span> Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProductList;