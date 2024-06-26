import styles from "../style/header.module.css";
import logo from "../assets/LOGO.png";
import { SignIn, Bell } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Contexto } from "../Hooks/UserContext.jsx";
//ui materials
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
export function Header() {
  const data = React.useContext(Contexto);
  console.log();
  const local = useLocation();
  const listaHeader = React.useRef();
  const listaHeaderMobile = React.useRef();
  const headerNotificacao = React.useRef();
  const listaHeaderMobilePonto = React.useRef();

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 300); // 300ms de debounce
    };

    window.addEventListener("resize", handleResize);
    listaHeader.current.style.display = "none";
    listaHeaderMobile.current.style.display = "none";
    listaHeaderMobilePonto.current.style.display = "none";
    headerNotificacao.current.style.display = "none";

    if (local.pathname === "/dashboard" && windowWidth >= 1259) {
      headerNotificacao.current.style.display = "initial";
    } else if (local.pathname === "/dashboard" && windowWidth < 1259) {
      listaHeaderMobile.current.style.display = "initial";
    } else if (local.pathname === "/" && windowWidth < 1259) {
      listaHeaderMobilePonto.current.style.display = "initial";
    } else if (local.pathname === "/" && windowWidth >= 1259) {
      listaHeader.current.style.display = "initial";
    }
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [local.pathname, windowWidth]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ancoraElemento, setAncoraElemento] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(ancoraElemento);
  const handleClick = event => {
    if (event.currentTarget.id === "demo-positioned-button") {
      setAnchorEl(event.currentTarget);
    } else if (event.currentTarget.id === "account-menu1") {
      setAncoraElemento(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAncoraElemento(null);
  };

  return (
    <div className={`${styles.Header} div`}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Logo AgroTech" />
        </Link>
      </div>
      <div ref={listaHeaderMobile} className={styles.responsive}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Tooltip title="Seu perfil">
            <IconButton
              onClick={handleClick}
              id="account-menu1"
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                // src="https://avatars.githubusercontent.com/u/56611686?v=4"
                sx={{ width: 32, height: 32 }}
              >
                {data.user?.nome[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={ancoraElemento}
          id="account-menu"
          open={open2}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>Meu perfil</MenuItem>
          <MenuItem onClick={handleClose}>Estaística</MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Configurações
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </div>
      <div ref={listaHeader}>
        <ul className={styles.option}>
          <li>Nossos produtos</li>
          <li>Sobre</li>
          <li>Fale conosco</li>

          <li className={styles.login}>
            <Link to="/login">Login</Link>
            <SignIn size={18} color="#1f7354" weight="bold" />
          </li>
        </ul>
      </div>
      <div ref={listaHeaderMobilePonto}>
        <IconButton
          aria-label="more"
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Link to="/login">
            <MenuItem onClick={handleClose}>Fale Conosco</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem onClick={handleClose}>Sobre</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem onClick={handleClose}>Nossos Produtos</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem onClick={handleClose}>
              Login
              <SignIn size={18} color="#1f7354" weight="bold" />
            </MenuItem>
          </Link>
        </Menu>
      </div>
      <Bell size={20} color="#11402f" weight="bold" ref={headerNotificacao} />
    </div>
  );
}
