import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ minHeight: "100vh", background: "#fffaf3", color: "#29251f" }}>
      <header
        style={{
          padding: "1rem 2rem",
          background: "#fff",
          borderBottom: "1px solid #eee5d9",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#a84319",
            fontSize: "1.25rem",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Recipe Book
        </Link>
      </header>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
