import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const searchRef = useRef(null);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecipes() {
      try {
        const response = await fetch("https://dummyjson.com/recipes", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Recipes request failed (${response.status})`);
        }

        const result = await response.json();
        if (!Array.isArray(result.recipes)) {
          throw new Error("The recipes response was invalid.");
        }

        setRecipes(result.recipes.slice(0, 3));
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load recipes.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRecipes();
    return () => controller.abort();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <section>
      <h1 style={{ marginBottom: "0.5rem" }}>Find your next favorite recipe</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        Search these recipes and open one to see its ingredients and instructions.
      </p>
      <div
        style={{
          maxWidth: 560,
          margin: "0 0 1.75rem",
          padding: "1rem 1.25rem",
          border: "1px solid #f0dfca",
          borderRadius: 16,
          background: "linear-gradient(135deg, #fff 0%, #fff4e5 100%)",
          boxShadow: "0 8px 24px rgba(113, 69, 28, 0.08)",
        }}
      >
        <label
          htmlFor="recipe-search"
          style={{
            display: "block",
            marginBottom: "0.65rem",
            color: "#6d381f",
            fontSize: "0.95rem",
            fontWeight: 700,
          }}
        >
          Search recipes
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            padding: "0 0.9rem",
            border: "1px solid #e4cdb3",
            borderRadius: 12,
            background: "#fff",
            boxShadow: "inset 0 1px 3px rgba(65, 40, 20, 0.06)",
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="21"
            height="21"
            fill="none"
            stroke="#a84319"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            id="recipe-search"
            ref={searchRef}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try pizza, stir-fry, or cookies"
            style={{
              flex: 1,
              minWidth: 0,
              padding: "0.85rem 0",
              border: 0,
              outline: "none",
              background: "transparent",
              color: "#29251f",
              font: "inherit",
            }}
          />
        </div>
      </div>

      {loading && <p role="status">Loading recipes...</p>}
      {error && <p role="alert">Could not load recipes: {error}</p>}
      {!loading && !error && filteredRecipes.length === 0 && (
        <p>No recipes match your search.</p>
      )}

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          listStyle: "none",
          padding: 0,
        }}
      >
        {filteredRecipes.map((recipe) => (
          <li
            key={recipe.id}
            style={{
              overflow: "hidden",
              border: "1px solid #eee5d9",
              borderRadius: 12,
              background: "#fff",
            }}
          >
            <Link
              to={`/recipes/${recipe.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <img
                src={recipe.image}
                alt=""
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                }}
              />
              <h2
                style={{
                  margin: 0,
                  padding: "1rem",
                  background: "#fff0dc",
                  color: "#a84319",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                {recipe.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;
