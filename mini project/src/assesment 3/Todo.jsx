import { useEffect, useState } from "react"

function Todo() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchTodos() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos",
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch todos (${response.status})`)
        }

        const todos = await response.json()
        if (!Array.isArray(todos)) {
          throw new Error("The todo response was not a list.")
        }

        setData(todos)
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load todos.")
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchTodos()

    return () => controller.abort()
  }, [])

  return (
    <main>
      <h1>Todos</h1>
      {loading ? (
        <p role="status">Loading todos...</p>
      ) : error ? (
        <p role="alert">Error: {error}</p>
      ) : (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              {todo.title} — {todo.completed ? "Completed" : "Not completed"}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Todo
