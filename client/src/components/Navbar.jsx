import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

// ⭐ Lucide Icons (Modern + Clean)
import { Menu as MenuIconLucide,
         Search as SearchLucide,
         Mail as MailLucide,
         Bell as BellLucide,
         User as UserLucide,
         MoreVertical } from "lucide-react";

import useAppStore from "../appStore";
import { useNavigate } from "react-router-dom";

/* -------------------- AppBar Styling -------------------- */
const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "linear-gradient(90deg, #1d8acb, #45b4e7)",   // Modern Blue Gradient
  boxShadow: "0px 4px 10px rgba(0,0,0,0.10)",              // Softer Shadow
}));

/* -------------------- Search Box Styling -------------------- */
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 12,
  padding: "2px 4px",
  backgroundColor: alpha("#FFFFFF", 0.2),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: alpha("#FFFFFF", 0.32),
    transform: "scale(1.03)",
  },
  marginLeft: theme.spacing(3),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "20ch",
    "&:focus": {
      width: "25ch",
    },
  },
}));

/* ========================================================= */

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };
  const handleMobileMenuOpen = (e) => setMobileMoreAnchorEl(e.currentTarget);

  const handleDashboard = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const role = userData.user.role;

    if (role == "Teacher") navigate("/teacher");
    else if (role == "Student") navigate("/student");
    else if (role == "Parent") navigate("/parentForm");
    else navigate("/admin");
  };

  /* ---------------- Menu components ---------------- */
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 0.5,
          mt: 1,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        },
      }}
    >
      <MenuItem
        onClick={() => navigate("/profile")}
        sx={{
          px: 2,
          py: 1.2,
          borderRadius: 2,
          "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
        }}
      >
        Profile
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          mt: 1,
          boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
        },
      }}
    >
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <MailLucide size={20} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={17} color="error">
            <BellLucide size={20} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <UserLucide size={22} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  /* ========================================================= */

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ py: 1 }}>

          {/* Sidebar toggle */}
          <IconButton
            size="large"
            color="inherit"
            onClick={() => updateOpen(!dopen)}
            sx={{
              mr: 2,
              transition: "0.2s",
              "&:hover": { transform: "scale(1.1)", backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <MenuIconLucide size={26} />
          </IconButton>

          {/* Brand Name */}
          <Typography
            variant="h6"
            noWrap
            onClick={handleDashboard}
            sx={{
              cursor: "pointer",
              fontWeight: 600,
              letterSpacing: 1,
              ml: 1,
              "&:hover": { opacity: 0.8, transition: "0.2s" },
            }}
          >
            COURSE MANAGEMENT SYSTEM
          </Typography>

          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <SearchLucide size={20} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>

          {/* Icons */}
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <IconButton color="inherit" sx={{ "&:hover": { transform: "scale(1.1)" } }}>
              <Badge badgeContent={4} color="error">
                <MailLucide size={20} />
              </Badge>
            </IconButton>

            <IconButton color="inherit" sx={{ "&:hover": { transform: "scale(1.1)" } }}>
              <Badge badgeContent={17} color="error">
                <BellLucide size={20} />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{ "&:hover": { transform: "scale(1.1)" } }}
            >
              <UserLucide size={22} />
            </IconButton>
          </Box>

          {/* Mobile menu button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={handleMobileMenuOpen}>
              <MoreVertical size={22} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}





