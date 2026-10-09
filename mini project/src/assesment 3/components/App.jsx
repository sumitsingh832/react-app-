import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Layout from "./Layout.jsx";
import RecipeDetails from "./Receipe.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes/:id" element={<RecipeDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
