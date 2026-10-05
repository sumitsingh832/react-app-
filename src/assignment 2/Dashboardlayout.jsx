import { Link, Outlet } from "react-router";

function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <div style={{ width: "200px", padding: "20px" }}>
        <h2>Dashboard</h2>

        <nav>
          <Link to="/dashboard">Home</Link>
          <br />

          <Link to="/dashboard/settings">Settings</Link>
          <br />

          <Link to="/dashboard/analytics">Analytics</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout;