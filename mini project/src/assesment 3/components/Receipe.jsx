import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecipe() {
      try {
        const response = await fetch(
          `https://dummyjson.com/recipes/${encodeURIComponent(id)}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Recipe not found."
              : `Recipe request failed (${response.status})`,
          );
        }

        setRecipe(await response.json());
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load this recipe.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRecipe();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p role="status">Loading recipe {id}...</p>;
  }
  if (error) {
    return (
      <section>
        <p role="alert">{error}</p>
        <Link to="/">Back to recipes</Link>
      </section>
    );
  }

  return (
    <article>
      <Link to="/">← Back to recipes</Link>
      <h1>{recipe.name}</h1>
      <p>Recipe ID: {id}</p>
      <img
        src={recipe.image}
        alt={recipe.name}
        style={{
          display: "block",
          width: "100%",
          maxWidth: 640,
          maxHeight: 360,
          objectFit: "cover",
          borderRadius: 12,
          margin: "1rem 0",
        }}
      />
      <p>
        {recipe.cuisine} · {recipe.difficulty} · {recipe.prepTimeMinutes} min prep
      </p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={`${index}-${instruction}`}>{instruction}</li>
        ))}
      </ol>
    </article>
  );
}

export default RecipeDetails;
