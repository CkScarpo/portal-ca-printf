import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  AccountCircle,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ThemeToogle";
import { logout } from "../../services/authService";
import { useUserStore } from "../../store/userStore";

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { user } = useUserStore();
  const isLoggedIn = !!user;
  const setUser = useUserStore((s) => s.setUser);
  const setAdmin = useUserStore((s) => s.setAdmin);

  const handleMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAdmin(false);
    handleClose();
    navigate("/");
  };

  const toggleMobile = () => setMobileOpen((o) => !o);

  const rotas = [
    { label: "Início", icon: <HomeIcon />, path: "/" },
    { label: "Carreiras", icon: <WorkIcon />, path: "/carreiras" },
    { label: "Documentos", icon: <DescriptionIcon />, path: "/documentos" },
    {
      label: "Requerimentos",
      icon: <AssignmentIcon />,
      path: "/requerimentos",
    },
  ];

  const drawer = (
    <Box role="presentation" onClick={toggleMobile} sx={{ width: 250 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        CA PRINTF
      </Typography>
      <Divider />
      <List>
        {rotas.map((r) => (
          <ListItemButton key={r.path} onClick={() => navigate(r.path)}>
            <ListItemIcon>{r.icon}</ListItemIcon>
            <ListItemText primary={r.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="primary" enableColorOnDark>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleMobile}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ cursor: "pointer", flexGrow: { xs: 1, md: 0 } }}
            onClick={() => navigate("/")}
          >
            CA PRINTF
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {rotas.map((r) => (
              <Button
                key={r.path}
                color="inherit"
                onClick={() => navigate(r.path)}
              >
                {r.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ThemeToggle />

            {isLoggedIn ? (
              <>
                <IconButton onClick={handleMenu} color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleLogout}>Sair</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Entrar
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleMobile}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

      <Toolbar />
    </>
  );
}
