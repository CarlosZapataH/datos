import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ConfipetrolLogo from "@src/assets/confipetrol-logo.png";
import ConfipetrolMobileLogo from "@src/assets/confipetrol-logo-mobile.png";
import { Link } from "react-router-dom";
import { esES } from "@mui/material/locale";
//import CompanySelect from '@src/components/global/CompanySelect/CompanySelect.jsx';
import AvatarMenu from "@src/components/global/AvatarMenu/AvatarMenu.jsx";
import { useMediaQuery } from "@mui/material";

const defaultTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#0039a6",
      },
      secondary: {
        main: "#edf2ff",
      },
      white: {
        main: "#ffffff",
      },
      orange: {
        main: "#ff7900",
      },
      customColor: {
        main: "#0000ff", // Nuevo color personalizado
        light: "rgb(51, 96, 183)",
        dark: "rgb(0, 39, 116)",
        contrastText: "#fff",
      },
    },
  },
  esES
);
// const drawerWidth = 240;
const drawerWidth = 0;

const PrivateLayout = (props) => {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="hello">
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/search/personal">
            <ListItemIcon>
              <PersonSearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Búsqueda de Personal"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const isMobile = useMediaQuery(defaultTheme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{ display: "flex", backgroundColor: "#ebf1f4", minHeight: "100%" }}
      >
        <CssBaseline />
        <AppBar
          color="white"
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                className="box-left"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 1, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Link to="/dashboard" style={{ display: "block" }}>
                  <img
                    style={{ height: isMobile ? "44px" : "50px" }}
                    className="confi-logo"
                    src={isMobile ? ConfipetrolMobileLogo : ConfipetrolLogo}
                    alt="confipetrol-logo"
                  />
                </Link>
              </div>
              <Box className="box-right" display={"flex"} alignItems={"center"}>
                {/* <CompanySelect /> */}
                <AvatarMenu />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 240,
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer> */}
        </Box>
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            overflow: "auto",
            // flexGrow: 1,
            //p: 3,
            //width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

PrivateLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default PrivateLayout;
