import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  Category as CategoryIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Brands", icon: <StoreIcon />, path: "/brands" },
  { text: "Accessories", icon: <CategoryIcon />, path: "/accessories" },
  { text: "Vendors", icon: <PeopleIcon />, path: "/vendors" },
  { text: "Unpaid Vendors", icon: <PaymentIcon />, path: "/unpaid-vendors" },
];

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#4A7C59",
          color: "#fff",
        },
      }}
    >
      <div style={{ padding: 20, fontSize: 24, fontWeight: "bold" }}>
        Azania Admin
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default AdminSidebar;