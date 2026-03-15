import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Box
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: "100%",
  maxWidth: 300
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  }
}));

function Navbar({ onMenuClick }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#0f5132",
        zIndex: 1201
      }}
    >
      <Toolbar>

        {/* Sidebar toggle */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo / Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Azania Admin
        </Typography>

        {/* Search */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Right side icons */}
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>

          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User menu */}
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              Profile
            </MenuItem>

            <MenuItem onClick={handleClose}>
              Settings
            </MenuItem>

            <MenuItem onClick={handleClose}>
              Logout
            </MenuItem>

          </Menu>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;