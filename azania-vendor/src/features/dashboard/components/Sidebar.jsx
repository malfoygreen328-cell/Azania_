import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/dashboard/products" },
    { name: "Orders", path: "/dashboard/orders" },
    { name: "Settings", path: "/dashboard/settings" }
  ];

  return (
    <nav style={styles.sidebar}>

      <div style={styles.logo}>
        <h2 style={{ color: "white", margin: 0 }}>Azania</h2>
      </div>

      <ul style={styles.menuList}>
        {menuItems.map(({ name, path }) => (
          <li key={path} style={styles.menuItem}>
            <NavLink
              to={path}
              style={({ isActive }) => ({
                color: isActive ? "#0F3D2E" : "white",
                backgroundColor: isActive ? "white" : "transparent",
                padding: "10px 15px",
                borderRadius: 5,
                textDecoration: "none",
                display: "block"
              })}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  sidebar: {
    width: 220,
    height: "100vh",
    backgroundColor: "#0F3D2E",
    paddingTop: 20,
    paddingLeft: 10,
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    left: 0
  },
  logo: {
    marginBottom: 40,
    paddingLeft: 20
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  menuItem: {
    marginBottom: 10
  }
};

export default Sidebar;