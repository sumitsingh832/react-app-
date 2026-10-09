import { useQuery } from "@tanstack/react-query";

function ModernDashboard() {
  const fetchDashboard = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    return response.json();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchDashboard,
    staleTime:2000
  });
  console.log(data)

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data?.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}

export default ModernDashboard;