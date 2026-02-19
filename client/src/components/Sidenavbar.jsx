
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  FilePlus2,
  ClipboardList,
  ChartSpline,
  UsersRound,
  Calendar,
  Megaphone,
  LogOut,
} from "lucide-react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

import useAppStore from "../appStore";

const drawerWidth = 280;

// Drawer animation + theme
const openedMixin = (theme) => ({
  width: drawerWidth,
  background: "#ffffff",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: "250ms",
  }),
  boxShadow: "2px 0 10px rgba(0,0,0,0.08)",
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  width: 75,
  background: "#ffffff",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: "250ms",
  }),
  boxShadow: "2px 0 10px rgba(0,0,0,0.06)",
  overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(1.5),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenavbar() {
  const theme = useTheme();
  const navigate = useNavigate();

  // ⭐ Zustand state — FIXED
  const open = useAppStore((state) => state.dopen);
  const updateOpen = useAppStore((state) => state.updateOpen);

  const [nestedOpen, setNestedOpen] = React.useState(false);
  const handleNestedClick = () => setNestedOpen((prev) => !prev);

  const userRole = JSON.parse(localStorage.getItem("user"))?.user?.role;

  return (
    <Box >
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        {/* Drawer Header */}
        <DrawerHeader>
          <IconButton onClick={() => updateOpen(!open)}>
            {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/* MENU ITEMS */}
        <List>
          {/* Dashboard */}
          <Tooltip title={open ? "" : "Dashboard"} placement="right">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate("/admin")}
                sx={{
                  px: 2.5,
                  borderRadius: 2,
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "rgba(25,118,210,0.1)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1976d2", minWidth: 40 }}>
                  <Home size={22} />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {/* Create Course (Admin / Teacher) */}
          {(userRole === "Teacher" || userRole === "Admin") && (
            <Tooltip title={open ? "" : "Create Course"} placement="right">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => navigate("/createCourse")}
                  sx={{
                    px: 2.5,
                    borderRadius: 2,
                    transition: "0.25s",
                    "&:hover": {
                      backgroundColor: "rgba(25,118,210,0.1)",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#1976d2", minWidth: 40 }}>
                    <FilePlus2 size={22} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Create Course"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          )}

          {/* Courses */}
          <Tooltip title={open ? "" : "Courses"} placement="right">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate("/course")}
                sx={{
                  px: 2.5,
                  borderRadius: 2,
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "rgba(25,118,210,0.1)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1976d2", minWidth: 40 }}>
                  <BookOpen size={22} />
                </ListItemIcon>
                <ListItemText primary="Courses" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {/* Create Quiz */}
          {(userRole === "Teacher" || userRole === "Admin") && (
            <Tooltip title={open ? "" : "Create Quiz"} placement="right">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => navigate("/createExam")}
                  sx={{
                    px: 2.5,
                    borderRadius: 2,
                    transition: "0.25s",
                    "&:hover": {
                      backgroundColor: "rgba(25,118,210,0.1)",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#1976d2", minWidth: 40 }}>
                    <ClipboardList size={22} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Create Quiz"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          )}

          {/* Challenges */}
          <Tooltip title={open ? "" : "Challenges"} placement="right">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate("/challenges")}
                sx={{
                  px: 2.5,
                  borderRadius: 2,
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "rgba(25,118,210,0.1)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1976d2", minWidth: 40 }}>
                  <ChartSpline size={22} />
                </ListItemIcon>
                <ListItemText
                  primary="Challenges"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {/* Add Class Schedule*/}
           <Tooltip title={open ? "" : "Add Class Schedule"} placement="right">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate("/addSchedule")}
                sx={{
                  px: 2.5,
                  borderRadius: 2,
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "rgba(25,118,210,0.1)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1976d2", minWidth: 40 }}>
                  <Calendar size={22} />
                </ListItemIcon>
                <ListItemText
                  primary="Add Class Schedule"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {/* Add Announcement*/}
           <Tooltip title={open ? "" : "Add Event"} placement="right">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate("/addAnnouncement")}
                sx={{
                  px: 2.5,
                  borderRadius: 2,
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "rgba(25,118,210,0.1)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#1976d2", minWidth: 40 }}>
                  <Megaphone size={22} />
                </ListItemIcon>
                <ListItemText
                  primary="Add Announcement"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {/* Parent Portal */}
          {(userRole === "Parent" || userRole === "Admin") && (
            <>
              <Tooltip title={open ? "" : "Parent Portal"} placement="right">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={handleNestedClick}
                    sx={{
                      px: 2.5,
                      borderRadius: 2,
                      transition: "0.25s",
                      "&:hover": {
                        backgroundColor: "rgba(25,118,210,0.1)",
                        transform: "scale(1.03)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#1976d2", minWidth: 40 }}>
                      <UsersRound size={22} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Parent Portal"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {open && (nestedOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>
              </Tooltip>

              <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: open ? 7 : 4 }}
                    onClick={() => navigate("/performanceOverview")}
                  >
                    <ListItemIcon sx={{ color: "#1976d2" }}>
                      <ChartSpline size={18} />
                    </ListItemIcon>
                    <ListItemText primary="Performance Overview" />
                  </ListItemButton>

                  <ListItemButton
                    sx={{ pl: open ? 7 : 4 }}
                    onClick={() => navigate("/attendanceGrade")}
                  >
                    <ListItemIcon sx={{ color: "#1976d2" }}>
                      <ChartSpline size={18} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance & Grade" />
                  </ListItemButton>

                  <ListItemButton
                    sx={{ pl: open ? 7 : 4 }}
                    onClick={() => navigate("/communication")}
                  >
                    <ListItemIcon sx={{ color: "#1976d2" }}>
                      <ChartSpline size={18} />
                    </ListItemIcon>
                    <ListItemText primary="Communication" />
                  </ListItemButton>

                  <ListItemButton
                    sx={{ pl: open ? 7 : 4 }}
                    onClick={() => navigate("/classEvents")}
                  >
                    <ListItemIcon sx={{ color: "#1976d2" }}>
                      <ChartSpline size={18} />
                    </ListItemIcon>
                    <ListItemText primary="Classes & Events" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          )}

          {/* Sign Out */}
          <Tooltip title={open ? "" : "Sign out"} placement="right">
            <ListItem disablePadding sx={{ display: "block", mt: 1 }}>
              <ListItemButton
                onClick={() => navigate("/signout")}
                sx={{
                  px: 2.5,
                  borderRadius: 2,
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "rgba(255,0,0,0.08)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "red", minWidth: 40 }}>
                  <LogOut size={22} />
                </ListItemIcon>
                <ListItemText primary="Sign out" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
    </Box>
  );
}
