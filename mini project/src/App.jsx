import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="router-app">
      <nav className="navigation" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <main className="page-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Home Page</h1>
                <p>Welcome to the Home page.</p>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <h1>About Page</h1>
                <p>This is the About page.</p>
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <h1>Contact Page</h1>
                <p>This is the Contact page.</p>
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <h1>Page Not Found</h1>
                <p>The page you requested does not exist.</p>
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
