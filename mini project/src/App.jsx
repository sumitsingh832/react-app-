import { useEffect, useRef } from "react";

function App() {
  const inputRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleScrollToTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main style={{ minHeight: "2000px", padding: "20px" }}>
      <h1 ref={topRef}>Page Top</h1>
      <p>This is a tall page. Scroll down to see the button.</p>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter something..."
        aria-label="Enter something"
      />
      <div style={{ marginTop: "1800px" }}>
        <button type="button" onClick={handleScrollToTop}>
          Scroll to Top
        </button>
      </div>
    </main>
  );
}

export default App;
