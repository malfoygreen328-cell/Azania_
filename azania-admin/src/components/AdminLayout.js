import React from "react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <main style={{ flexGrow: 1, padding: 20 }}>{children}</main>
    </div>
  );
}

export default AdminLayout;