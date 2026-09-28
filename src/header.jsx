import { useState } from "react";
import { useCart } from "./useCart";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, removeFromCart, clearCart } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <header className="site-header" id="top">
      <a className="brand" href="#top" aria-label="Good Measure home">
        <span className="brand-mark" aria-hidden="true">g.</span>
        <span>good measure</span>
      </a>
      <nav className="header-nav" aria-label="Main navigation">
        <a href="#collection">Shop</a>
        <a href="#footer">Our approach</a>
      </nav>
      <div className="cart-area">
        <button
          className="cart-toggle"
          type="button"
          aria-expanded={cartOpen}
          aria-controls="cart-panel"
          onClick={() => setCartOpen((isOpen) => !isOpen)}
        >
          <span className="bag-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 8.5h14l1 12H4l1-12Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
          </span>
          <span>Bag</span>
          <span className="cart-count">{itemCount}</span>
        </button>
        {cartOpen && (
          <section className="cart-panel" id="cart-panel" aria-label="Your shopping bag">
            <div className="cart-panel-heading">
              <div>
                <p className="eyebrow">Your selection</p>
                <h2>Your bag <span>({itemCount})</span></h2>
              </div>
              <button
                className="close-cart"
                type="button"
                aria-label="Close shopping bag"
                onClick={() => setCartOpen(false)}
              >
                &#215;
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p className="empty-cart">Your bag is waiting for something good.</p>
            ) : (
              <>
                <ul className="cart-items">
                  {cartItems.map((item) => (
                    <li className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-copy">
                        <h3>{item.title}</h3>
                        <p>Qty {item.quantity} <span aria-hidden="true">·</span> {currency.format(item.price * item.quantity)}</p>
                      </div>
                      <button
                        className="remove-item"
                        type="button"
                        aria-label={`Remove ${item.title} from cart`}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="cart-total">
                  <span>Subtotal</span>
                  <strong>{currency.format(cartTotal)}</strong>
                </div>
                <button className="clear-cart" type="button" onClick={clearCart}>
                  Clear bag
                </button>
              </>
            )}
          </section>
        )}
      </div>
    </header>
  );
}

export default Header;