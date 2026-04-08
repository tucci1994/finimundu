import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChiSiamoModal from "./modals/ChiSiamoModal";

const NAV_ITEMS = [
  { label: "Chi Siamo",  key: "chi-siamo"  },
  { label: "Progetti",   key: "progetti"   },
  { label: "Vision",     key: "vision"     },
  { label: "Contattaci", key: "contattaci" },
  { label: "News",       key: "news"       },
];

const navBtnSx = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#fff",
  fontFamily: '"NectoMono", monospace',
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  padding: 0,
  opacity: 0.75,
  transition: "opacity 0.2s",
  "&:hover": { opacity: 1 },
};

export default function Navbar() {
  const [chiSiamoOpen, setChiSiamoOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleClick = (key) => {
    if (key === "chi-siamo") setChiSiamoOpen(true);
    setDrawerOpen(false);
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          px: 4,
          py: 3,
          pointerEvents: "none",
        }}
      >
        {isMobile ? (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              pointerEvents: "auto",
              color: "#fff",
              p: 0,
            }}
          >
            <MenuIcon sx={{ fontSize: "1.6rem" }} />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", gap: 5, pointerEvents: "auto" }}>
            {NAV_ITEMS.map(({ label, key }) => (
              <Box
                key={key}
                component="button"
                onClick={() => handleClick(key)}
                sx={{ ...navBtnSx, fontSize: "0.68rem" }}
              >
                {label}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Sidebar mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 240,
            backgroundColor: "#000",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            pt: 3,
            px: 3,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "#fff", p: 0 }}
          >
            <CloseIcon sx={{ fontSize: "1.4rem" }} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_ITEMS.map(({ label, key }) => (
            <Box
              key={key}
              component="button"
              onClick={() => handleClick(key)}
              sx={{ ...navBtnSx, fontSize: "0.72rem", textAlign: "left" }}
            >
              {label}
            </Box>
          ))}
        </Box>
      </Drawer>

      <ChiSiamoModal
        open={chiSiamoOpen}
        onClose={() => setChiSiamoOpen(false)}
      />
    </>
  );
}
