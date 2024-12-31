import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  MenuItem,
  Avatar,
  ListItemText,
  createTheme,
  useMediaQuery,
  ListItem,
  List,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import { createAxios } from "../../../createAxios";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { logout } from "../../../redux/apiRequest";

const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isNotiOpen = Boolean(anchorElNoti);
  const location = useLocation();
  const currentUser = useSelector((state) => state?.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const toggleSearch = (open) => (event) => {
    setSearchOpen(open);
  };

  const handleLogout = () => {
    logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotiOpen = (event) => {
    setAnchorElNoti(event.currentTarget);
  };

  const handleNotiClose = () => {
    setAnchorElNoti(null);
  };

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "var(--yellow)" : "inherit",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const [bgColor, setBgColor] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setBgColor("black");
      } else {
        setBgColor("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <AppBar
      sx={{
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "100%",
        boxShadow: "none",
      }}
      position="fixed"
    >
      <Toolbar sx={{ width: "var(--default-header-width)", maxWidth: "100%" }}>
        {/* Logo + Search bar */}
        {isMobile && (
          <IconButton
            sx={{ color: "var(--white)", paddingLeft: "20px" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          display="flex"
          flexGrow={1}
          alignItems="center"
          sx={{ justifyContent: isMobile ? "center" : "unset" }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ marginRight: "14px", fontFamily: "var(--font-family)" }}
          >
            <Link
              to="/"
              style={{
                color: "var(--yellow)",
                textDecoration: "none",
                fontWeight: "bold",
                paddingLeft: isMobile ? "20px" : isTablet ? "25px" : "0px",
              }}
            >
              FUTURE ESTATE
            </Link>
          </Typography>
        </Box>

        {/* Navigation links */}
        <Box sx={{ display: isMobile ? "none" : "flex", mr: 3 }}>
          <SearchIcon sx={{ mr: 1 }} />
          <Typography
            variant="body1"
            sx={{
              mx: 2,
              fontFamily: "var(--font-family)",
            }}
          >
            <Link to="/properties" style={linkStyle("/properties")}>
              Properties
            </Link>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, fontFamily: "var(--font-family)" }}
          >
            <Link to="/agents" style={linkStyle("/agents")}>
              Agents
            </Link>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, fontFamily: "var(--font-family)" }}
          >
            <Link to="/stories" style={linkStyle("/stories")}>
              Stories
            </Link>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, fontFamily: "var(--font-family)" }}
          >
            <Link to="/appraisal" style={linkStyle("/appraisal")}>
              Appraisal
            </Link>
          </Typography>
          {currentUser?.metadata.user.isAdmin && (
            <Typography
              variant="body1"
              sx={{ mx: 2, fontFamily: "var(--font-family)" }}
            >
              <Link to="/dashboard" style={linkStyle("/dashboard")}>
                Dashboard
              </Link>
            </Typography>
          )}
        </Box>

        <Box
          display="flex"
          alignItems="center"
          sx={{ paddingRight: isTablet ? "10px" : "0" }}
        >
          {isMobile && (
            <IconButton
              sx={{ color: "var(--white)" }}
              onClick={toggleSearch(true)}
            >
              <SearchIcon />
            </IconButton>
          )}

          <HeadlessTippy
            interactive
            visible={isMenuOpen}
            placement="bottom-end"
            render={(attrs) => (
              <div tabIndex={-1} {...attrs}>
                <PopperWrapper className={cx("actions-container")}>
                  {accessToken ? (
                    <>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={`/profile/${userID}`}>Profile</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={`/account/${userID}`}>Account</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={"/history"}>History</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={"/favourite"}>Favourite</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={() => {
                          handleMenuClose();
                          handleLogout();
                        }}
                      >
                        Signout
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={"/signup"}>Signup</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={"/signin"}>Signin</Link>
                      </MenuItem>
                    </>
                  )}
                </PopperWrapper>
              </div>
            )}
            onClickOutside={handleMenuClose}
          >
            <div className={cx("search")}>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar
                  src={
                    currentUser?.metadata.user.user_avatar ||
                    "/default-avatar.png"
                  }
                />
              </IconButton>
            </div>
          </HeadlessTippy>
          {/* Drawer */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{
                width: 250,
                backgroundColor: "transparent",
                height: "100%",
                color: "var(--white)",
              }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem component={Link} to="/" style={linkStyle("/")}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/genres"
                  style={linkStyle("/genres")}
                >
                  <ListItemText primary="Genres" />
                </ListItem>
                <ListItem component={Link} to="/new" style={linkStyle("/new")}>
                  <ListItemText primary="New" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/popular"
                  style={linkStyle("/popular")}
                >
                  <ListItemText primary="Popular" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
