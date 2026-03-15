import React from "react";

const TopNav = () => {
  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        <h1 style={styles.title}>Vendor Dashboard</h1>
      </div>

      <div style={styles.rightSection}>
        {/* Placeholder for user profile or notifications */}
        <div style={styles.profileCircle}>A</div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: 60,
    backgroundColor: "#0F3D2E",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    left: 220, // sidebar width, so topnav aligns right of sidebar
    right: 0,
    zIndex: 1000
  },
  leftSection: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: "600"
  },
  rightSection: {
    display: "flex",
    alignItems: "center"
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "white",
    color: "#0F3D2E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    cursor: "pointer",
    userSelect: "none"
  }
};

export default TopNav;